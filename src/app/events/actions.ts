"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {prisma} from "@/lib/prisma";
import {generateOllamaSegments} from "@/lib/ollama";
function read(form:FormData,key:string):string|null{const v=form.get(key);return typeof v==="string"&&v.trim()?v.trim():null;}

function mergeSceneState(previous:string|null,next:{summary:string;establishedFacts:string[];openThreads:string[];npcKnowledge:Record<string,string[]>}){
 let old:{summary?:string;establishedFacts?:string[];openThreads?:string[];npcKnowledge?:Record<string,string[]>}={};
 if(previous){try{old=JSON.parse(previous);}catch{old={};}}
 const merge=(a:string[]|undefined,b:string[],limit:number)=>[...new Set([...(a??[]),...b])].slice(-limit);
 const knowledge:Record<string,string[]>={};
 for(const id of new Set([...Object.keys(old.npcKnowledge??{}),...Object.keys(next.npcKnowledge)])){
  knowledge[id]=merge(old.npcKnowledge?.[id],next.npcKnowledge[id]??[],12);
 }
 return {summary:next.summary||old.summary||"",establishedFacts:merge(old.establishedFacts,next.establishedFacts,16),openThreads:merge(old.openThreads,next.openThreads,10),npcKnowledge:knowledge};
}


export async function createEvent(form:FormData){
 const title=read(form,"title");if(!title)throw new Error("An event title is required.");
 const player=await prisma.character.findFirst({where:{isPlayerCharacter:true}});
 if(!player)throw new Error("Select a Player Character in Characters before starting a story.");
 const selected=[...new Set(form.getAll("participants").filter((v):v is string=>typeof v==="string"&&v.length>0))].filter(id=>id!==player.id);
 const valid=selected.length?await prisma.character.findMany({where:{id:{in:selected},isPlayerCharacter:false},select:{id:true}}):[];
 const event=await prisma.storyEvent.create({data:{title,premise:read(form,"premise"),location:read(form,"location"),timeLabel:read(form,"timeLabel"),participants:{create:[{characterId:player.id,role:"PLAYER"},...valid.map(c=>({characterId:c.id,role:"NPC"}))]}}});
 revalidatePath("/events");redirect("/events/"+event.id);
}

async function generateAiContinuation(eventId:string){
 const lock=await prisma.storyEvent.updateMany({where:{id:eventId,status:"ACTIVE",aiStatus:{not:"GENERATING"}},data:{aiStatus:"GENERATING",aiError:null,aiLastAttemptAt:new Date()}});
 if(!lock.count)return;
 try{
  const event=await prisma.storyEvent.findUnique({where:{id:eventId},include:{participants:{include:{character:true}},turns:{orderBy:{sequence:"desc"},take:10}}});
  if(!event||event.status!=="ACTIVE")throw new Error("This event is no longer active.");
  const latest=event.turns[0];
  if(!latest||latest.speakerType!=="PLAYER"){await prisma.storyEvent.update({where:{id:eventId},data:{aiStatus:"IDLE",aiError:null}});return;}
  const player=event.participants.find(p=>p.role==="PLAYER");
  if(!player)throw new Error("The Player Character is missing from this event.");
  const generation=await generateOllamaSegments({
   title:event.title,premise:event.premise,location:event.location,timeLabel:event.timeLabel,
   playerName:[player.character.name,player.character.surname].filter(Boolean).join(" "),playerCharacterId:player.characterId,
   participants:event.participants.map(p=>({id:p.character.id,name:p.character.name,surname:p.character.surname,appearance:p.character.appearance,personality:p.character.personality,psychology:p.character.psychology,history:p.character.history,motivations:p.character.motivations,strengths:p.character.strengths,communication:p.character.communication})),
   turns:[...event.turns].reverse().map(t=>({speakerType:t.speakerType,speakerName:t.speakerName,content:t.content})),sceneState:event.sceneState
  });
  await prisma.$transaction(async tx=>{
   const fresh=await tx.storyEvent.findUnique({where:{id:eventId},include:{turns:{orderBy:{sequence:"desc"},take:1}}});
   if(!fresh||fresh.status!=="ACTIVE"||fresh.turns[0]?.id!==latest.id)throw new Error("The scene changed while AI was generating. Please retry.");
   let sequence=await tx.eventTurn.count({where:{eventId}});
   for(const segment of generation.segments){
    const character=segment.speakerType==="NPC"&&segment.characterId?event.participants.find(p=>p.characterId===segment.characterId)?.character:null;
    if(segment.speakerType==="NPC"&&!character)continue;
    sequence++;
    await tx.eventTurn.create({data:{eventId,sequence,speakerType:segment.speakerType,characterId:character?.id??null,speakerName:character?[character.name,character.surname].filter(Boolean).join(" "):"Narrator",content:segment.content}});
   }
   await tx.storyEvent.update({where:{id:eventId},data:{sceneState:JSON.stringify(mergeSceneState(event.sceneState,generation.sceneState)),aiStatus:"IDLE",aiError:null}});
  });
 }catch(error){
  const message=error instanceof Error?error.message:"Unexpected error while generating the scene.";
  await prisma.storyEvent.update({where:{id:eventId},data:{aiStatus:"ERROR",aiError:message.slice(0,1000)}}).catch(()=>undefined);
 }
}

export async function addPlayerTurn(eventId:string,form:FormData){
 const content=read(form,"content");if(!content)throw new Error("Write your character's turn before saving.");
 const event=await prisma.storyEvent.findUnique({where:{id:eventId},include:{participants:true}});
 if(!event||event.status!=="ACTIVE")throw new Error("This event is not open for new turns.");
 const player=await prisma.character.findFirst({where:{isPlayerCharacter:true}});
 if(!player||!event.participants.some(p=>p.characterId===player.id&&p.role==="PLAYER"))throw new Error("The Player Character is not part of this event.");
 await prisma.$transaction(async tx=>{const count=await tx.eventTurn.count({where:{eventId}});await tx.eventTurn.create({data:{eventId,sequence:count+1,speakerType:"PLAYER",characterId:player.id,speakerName:[player.name,player.surname].filter(Boolean).join(" "),content}});});
 await generateAiContinuation(eventId);
 revalidatePath("/events/"+eventId);
}
export async function retryAiContinuation(eventId:string){await generateAiContinuation(eventId);revalidatePath("/events/"+eventId);}
export async function completeEvent(eventId:string,form:FormData){
 const event=await prisma.storyEvent.findUnique({where:{id:eventId}});
 if(!event||event.status!=="ACTIVE")throw new Error("This event has already been completed or does not exist.");
 if(event.aiStatus==="GENERATING")throw new Error("Wait for the current AI response to finish before completing this event.");
 const summary=read(form,"summary");
 await prisma.$transaction([prisma.storyEvent.update({where:{id:eventId},data:{status:"COMPLETED",completedAt:new Date()}}),prisma.memory.create({data:{eventId,title:event.title,summary}})]);
 revalidatePath("/events");revalidatePath("/events/"+eventId);redirect("/events/"+eventId);
}
