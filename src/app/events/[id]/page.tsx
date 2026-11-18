import Link from "next/link";
import {notFound} from "next/navigation";
import {AppShell} from "@/components/AppShell";
import {prisma} from "@/lib/prisma";
import {addPlayerTurn,completeEvent,retryAiContinuation} from "../actions";
import {PendingSubmitButton,PendingStatus} from "@/components/PendingSubmitButton";

function splitPlayerTurn(content:string){
 const parts:{kind:"action"|"dialogue";text:string}[]=[];
 const pattern=/\\*([^*]+)\\*/g;
 let cursor=0,match:RegExpExecArray|null;
 while((match=pattern.exec(content))!==null){
  const before=content.slice(cursor,match.index);
  if(before)parts.push({kind:"dialogue",text:before});
  if(match[1])parts.push({kind:"action",text:match[1]});
  cursor=pattern.lastIndex;
 }
 const rest=content.slice(cursor);
 if(rest)parts.push({kind:"dialogue",text:rest});
 return parts.length?parts:[{kind:"dialogue" as const,text:content}];
}

function decodeHtmlEntities(value:string){const named:Record<string,string>={amp:"&",lt:"<",gt:">",quot:'"',apos:"'",nbsp:" ","#39":"'"};let decoded=value;for(let pass=0;pass<4;pass++){const next=decoded.replace(/&(?:#(\d+)|#x([0-9a-f]+)|([a-z]+|#39));/gi,(match,decimal,hex,name)=>{if(decimal||hex){const code=Number.parseInt(decimal??hex,decimal?10:16);return Number.isFinite(code)&&code>=0&&code<=0x10ffff?String.fromCodePoint(code):match;}return named[String(name).toLowerCase()]??match;});if(next===decoded)break;decoded=next;}return decoded;}
function renderQuotedDialogue(content:string,speakerName?:string){
 content=decodeHtmlEntities(content).replaceAll("**","").replaceAll("__","");
 if(speakerName){const name=speakerName.trim();if(name&&content.slice(0,name.length).toLocaleLowerCase()===name.toLocaleLowerCase()){const rest=content.slice(name.length);if(/^\s*:\s*/.test(rest)){content=rest.replace(/^\s*:\s*/,"");}else if(/^\s+(?:sets|set|stands|stood|begins|began|starts|started|continues|continued|says|said|replies|replied|asks|asked|whispers|whispered|murmurs|murmured|states|stated|turns|turned|looks|looked|picks|picked|places|placed|writes|wrote|shifts|shifted|leans|leaned|nods|nodded|smiles|smiled|laughs|laughed|pauses|paused)\b/i.test(rest)){content=rest.trimStart();}}}
 const parts:React.ReactNode[]=[];
 const pattern=/(“[^”]*”|\u0022[^\u0022]*\u0022)/g;
 let cursor=0,match:RegExpExecArray|null,index=0;
 while((match=pattern.exec(content))!==null){
  if(match.index>cursor)parts.push(content.slice(cursor,match.index));
  parts.push(<span className="aiSpokenDialogue" key={index++}>{match[0]}</span>);
  cursor=pattern.lastIndex;
 }
 if(cursor<content.length)parts.push(content.slice(cursor));
 return parts.length?parts:content;
}

function readAiSegments(content:string):{speakerType:"NARRATOR"|"NPC";speakerName:string;content:string}[]{
 try{const value=JSON.parse(content) as {segments?:unknown};if(!Array.isArray(value.segments))return [{speakerType:"NARRATOR",speakerName:"Aethelgard Academy",content}];return value.segments.filter((item):item is {speakerType:"NARRATOR"|"NPC";speakerName:string;content:string}=>!!item&&typeof item==="object"&&((item as {speakerType?:unknown}).speakerType==="NARRATOR"||(item as {speakerType?:unknown}).speakerType==="NPC")&&typeof (item as {content?:unknown}).content==="string").map(item=>({speakerType:item.speakerType,speakerName:typeof item.speakerName==="string"?decodeHtmlEntities(item.speakerName):item.speakerType==="NARRATOR"?"":"NPC",content:item.content}));}catch{return [{speakerType:"NARRATOR",speakerName:"Aethelgard Academy",content}];}
}

export default async function EventDetail({params}:{params:Promise<{id:string}>}){
 const {id}=await params;
 const event=await prisma.storyEvent.findUnique({where:{id},include:{participants:{include:{character:true}},turns:{include:{character:true},orderBy:{sequence:"asc"}},memory:true}});
 if(!event)notFound();
 const player=await prisma.character.findFirst({where:{isPlayerCharacter:true}});
 return <AppShell active="events">
  <div className="profileBack"><Link href="/events">← Events & Memories</Link></div>
  <header className="storyHeader"><div><p className="eyebrow">{event.status==="ACTIVE"?"ACTIVE EVENT":"SAVED MEMORY"}</p><h1>{event.title}</h1><p className="muted">{[event.location,event.timeLabel].filter(Boolean).join(" · ")||"No location or time specified"}</p></div><span className={"eventStatus "+(event.status==="ACTIVE"?"activeStatus":"memoryStatus")}>{event.status==="ACTIVE"?"IN PROGRESS":"MEMORY"}</span></header>
  {event.premise&&<section className="storyContext"><p className="eyebrow">OPENING CONTEXT</p><p>{event.premise}</p></section>}
  <section className="formSection storyParticipants"><div className="formSectionHeading"><span>✧</span><div><h2>Participants</h2><p>Characters present in this event.</p></div></div><div className="participantRow">{event.participants.map(p=><div className="participantPill" key={p.id}>{p.character.avatarUrl?<img src={p.character.avatarUrl} alt=""/>:<i>{p.character.name[0]?.toUpperCase()}</i>}<span>{p.character.name} {p.character.surname??""}{p.role==="PLAYER"&&<small>PLAYER CHARACTER</small>}</span></div>)}</div></section>
  <div className="sectionHeading"><div><p className="eyebrow">EVENT RECORD</p><h2>Story</h2></div><span className="muted small">{event.turns.length} SAVED {event.turns.length===1?"TURN":"TURNS"}</span></div>
  <div className="turnTimeline">{event.turns.length?event.turns.map(t=>{
   if(t.speakerType==="AI"){
    const segments=readAiSegments(t.content);
    return <article className="dialogueTurn aiDialogue" key={t.id}>
     <div className="dialogueAvatar aiDialogueAvatar">✧</div>
     <div className="dialogueContent"><div className="dialogueMeta"><strong>Narrator</strong><span>AI</span></div><div className="dialogueBubble aiDialogueBubble">{segments.map((segment,index)=>segment.speakerType==="NARRATOR"?<p className="aiNarration" key={index}>{renderQuotedDialogue(segment.content)}</p>:<p className="aiCharacterSegment" key={index}><strong>{segment.speakerName}: </strong><span>{renderQuotedDialogue(segment.content,segment.speakerName)}</span></p>)}</div><time>{t.createdAt.toLocaleString("en-US")}</time></div>
    </article>;
   }
   if(t.speakerType==="NARRATOR")return <article className="narrationBlock" key={t.id}><div className="narrationLabel"><span>✧</span> NARRATOR</div><p>{t.content}</p><time>{t.createdAt.toLocaleString("en-US")}</time></article>;
   const character=t.character??event.participants.find(p=>p.characterId===t.characterId)?.character;
   const isPlayer=t.speakerType==="PLAYER";
   const displayName=character?[character.name,character.surname].filter(Boolean).join(" "):t.speakerName;
   if(isPlayer){
    const parts=splitPlayerTurn(t.content);
    return <article className="dialogueTurn playerDialogue" key={t.id}>
     <div className="dialogueAvatar">{character?.avatarUrl?<img src={character.avatarUrl} alt={displayName}/>:<span>{displayName?.[0]?.toUpperCase()??"?"}</span>}</div>
     <div className="dialogueContent"><div className="dialogueMeta"><strong>{displayName}</strong><span>YOUR CHARACTER</span></div><div className="dialogueBubble"><p>{parts.map((part,index)=>part.kind==="action"?<em className="inlineCharacterAction" key={index}>{part.text}</em>:<span key={index}>{part.text}</span>)}</p></div><time>{t.createdAt.toLocaleString("en-US")}</time></div>
    </article>;
   }
   return <article className="dialogueTurn" key={t.id}>
    <div className="dialogueAvatar">{character?.avatarUrl?<img src={character.avatarUrl} alt={displayName}/>:<span>{displayName?.[0]?.toUpperCase()??"?"}</span>}</div>
    <div className="dialogueContent"><div className="dialogueMeta"><strong>{displayName}</strong><span>CHARACTER</span></div><div className="dialogueBubble"><p>{t.content}</p></div><time>{t.createdAt.toLocaleString("en-US")}</time></div>
   </article>;
  }):<div className="emptyState compactEmpty"><h2>The scene is ready.</h2><p>Your first turn will appear here after you write and save it.</p></div>}</div>
  {event.status==="ACTIVE"?<>
   <section className="formSection turnComposer">
    <div className="formSectionHeading"><span>✎</span><div><h2>Your Turn</h2><p>You control your Player Character completely. Write only their actions and words; AI controls the world and NPCs, never your character.</p></div></div>
    {event.aiStatus==="GENERATING"&&<div className="infoNotice"><strong>The scene is unfolding…</strong><p>The narrator and relevant characters are continuing the scene. This may take a little while.</p></div>}
    {event.aiStatus==="ERROR"&&<div className="infoNotice"><strong>AI continuation could not be generated.</strong><p>{event.aiError||"The local model returned an error."} Your turn is safe. You can retry without submitting it again.</p><form action={retryAiContinuation.bind(null,event.id)}><PendingStatus message="Retrying the narrator and NPC continuation. This can take 30 seconds or longer."/><div className="formActions"><PendingSubmitButton label="Retry AI Response ↻" pendingLabel="Generating response…" /></div></form></div>}
    {event.aiStatus==="IDLE"&&event.turns.length>0&&event.turns[event.turns.length-1].speakerType==="PLAYER"&&<div className="infoNotice"><strong>Waiting for the next continuation.</strong><p>If no response appears, refresh the page and retry the AI response.</p><form action={retryAiContinuation.bind(null,event.id)}><PendingStatus message="Generating the narrator and NPC continuation. Please keep this page open."/><div className="formActions"><PendingSubmitButton className="secondaryButton" label="Generate AI Response ↻" pendingLabel="Generating response…" /></div></form></div>}
    {player?<form action={addPlayerTurn.bind(null,event.id)}><PendingStatus message="Your turn is saved first. The local model is now generating the scene continuation; this may take 30 seconds or longer."/><label className="field"><span>{[player.name,player.surname].filter(Boolean).join(" ")}'s action</span><textarea name="content" rows={6} required placeholder="What does your character do or say?"/></label><div className="formActions"><PendingSubmitButton label="Save Turn →" pendingLabel="Saving & generating…" /></div></form>:<p className="muted">No Player Character is currently selected. Select one in Characters to continue.</p>}
   </section>
   <section className="formSection completeEvent"><div className="formSectionHeading"><span>✧</span><div><h2>End Event & Save Memory</h2><p>Completing this event preserves its full turn history as a memory. You can add an optional note for future reference.</p></div></div><form action={completeEvent.bind(null,event.id)}><label className="field"><span>Memory Note (optional)</span><textarea name="summary" rows={3} placeholder="Add a note about what this event means or what should be remembered..."/></label><div className="formActions"><button className="dangerButton" type="submit" disabled={event.aiStatus==="GENERATING"}>Complete Event & Save Memory</button></div></form></section>
  </>:<section className="memoryNote"><p className="eyebrow">PRESERVED MEMORY</p><h2>{event.memory?.title??event.title}</h2><p>{event.memory?.summary||"The event has been preserved with its complete turn history."}</p><small>Completed {event.completedAt?.toLocaleString("en-US")}</small></section>}
 </AppShell>;
}
