"use server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {prisma} from "@/lib/prisma";
function read(form:FormData,key:string):string|null{const v=form.get(key);return typeof v==="string"&&v.trim()?v.trim():null;}
export async function createEvent(form:FormData){
 const title=read(form,"title");if(!title)throw new Error("An event title is required.");
 const player=await prisma.character.findFirst({where:{isPlayerCharacter:true}});
 if(!player)throw new Error("Select a Player Character in Characters before starting a story.");
 const selected=[...new Set(form.getAll("participants").filter((v):v is string=>typeof v==="string"&&v.length>0))].filter(id=>id!==player.id);
 const valid=selected.length?await prisma.character.findMany({where:{id:{in:selected},isPlayerCharacter:false},select:{id:true}}):[];
 const event=await prisma.storyEvent.create({data:{title,premise:read(form,"premise"),location:read(form,"location"),timeLabel:read(form,"timeLabel"),participants:{create:[{characterId:player.id,role:"PLAYER"},...valid.map(c=>({characterId:c.id,role:"NPC"}))]}}});
 revalidatePath("/events");redirect("/events/"+event.id);
}
export async function addPlayerTurn(eventId:string,form:FormData){
 const content=read(form,"content");if(!content)throw new Error("Write your character's turn before saving.");
 const event=await prisma.storyEvent.findUnique({where:{id:eventId},include:{participants:true}});
 if(!event||event.status!=="ACTIVE")throw new Error("This event is not open for new turns.");
 const player=await prisma.character.findFirst({where:{isPlayerCharacter:true}});
 if(!player||!event.participants.some(p=>p.characterId===player.id&&p.role==="PLAYER"))throw new Error("The Player Character is not part of this event.");
 const count=await prisma.eventTurn.count({where:{eventId}});
 await prisma.eventTurn.create({data:{eventId,sequence:count+1,speakerType:"PLAYER",characterId:player.id,speakerName:[player.name,player.surname].filter(Boolean).join(" "),content}});
 revalidatePath("/events/"+eventId);
}
export async function completeEvent(eventId:string,form:FormData){
 const event=await prisma.storyEvent.findUnique({where:{id:eventId}});
 if(!event||event.status!=="ACTIVE")throw new Error("This event has already been completed or does not exist.");
 const summary=read(form,"summary");
 await prisma.$transaction([prisma.storyEvent.update({where:{id:eventId},data:{status:"COMPLETED",completedAt:new Date()}}),prisma.memory.create({data:{eventId,title:event.title,summary}})]);
 revalidatePath("/events");revalidatePath("/events/"+eventId);redirect("/events/"+eventId);
}