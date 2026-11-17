import Link from "next/link";
import {notFound} from "next/navigation";
import {AppShell} from "@/components/AppShell";
import {prisma} from "@/lib/prisma";
import {addPlayerTurn,completeEvent,retryAiContinuation} from "../actions";

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
   if(t.speakerType==="NARRATOR")return <article className="narrationBlock" key={t.id}><div className="narrationLabel"><span>✧</span> NARRATOR</div><p>{t.content}</p><time>{t.createdAt.toLocaleString("en-US")}</time></article>;
   const character=t.character??event.participants.find(p=>p.characterId===t.characterId)?.character;
   const isPlayer=t.speakerType==="PLAYER";
   const displayName=character?[character.name,character.surname].filter(Boolean).join(" "):t.speakerName;
   return <article className={"dialogueTurn "+(isPlayer?"playerDialogue":"")} key={t.id}>
    <div className="dialogueAvatar">{character?.avatarUrl?<img src={character.avatarUrl} alt={displayName}/>:<span>{displayName?.[0]?.toUpperCase()??"?"}</span>}</div>
    <div className="dialogueContent"><div className="dialogueMeta"><strong>{displayName}</strong><span>{isPlayer?"YOUR CHARACTER":"CHARACTER"}</span></div><div className="dialogueBubble"><p>{t.content}</p></div><time>{t.createdAt.toLocaleString("en-US")}</time></div>
   </article>;
  }):<div className="emptyState compactEmpty"><h2>The scene is ready.</h2><p>Your first turn will appear here after you write and save it.</p></div>}</div>
  {event.status==="ACTIVE"?<>
   <section className="formSection turnComposer">
    <div className="formSectionHeading"><span>✎</span><div><h2>Your Turn</h2><p>Write only what your Player Character says, does, thinks or feels. The app will not write their actions for you.</p></div></div>
    {event.aiStatus==="GENERATING"&&<div className="infoNotice"><strong>The scene is unfolding…</strong><p>The narrator and relevant characters are continuing the scene. This may take a little while.</p></div>}
    {event.aiStatus==="ERROR"&&<div className="infoNotice"><strong>AI continuation could not be generated.</strong><p>{event.aiError||"The local model returned an error."} Your turn is safe. You can retry without submitting it again.</p><form action={retryAiContinuation.bind(null,event.id)}><div className="formActions"><button className="primaryButton" type="submit">Retry AI Response ↻</button></div></form></div>}
    {event.aiStatus==="IDLE"&&event.turns.length>0&&event.turns[event.turns.length-1].speakerType==="PLAYER"&&<div className="infoNotice"><strong>Waiting for the next continuation.</strong><p>If no response appears, refresh the page and retry the AI response.</p><form action={retryAiContinuation.bind(null,event.id)}><div className="formActions"><button className="secondaryButton" type="submit">Generate AI Response ↻</button></div></form></div>}
    {player?<form action={addPlayerTurn.bind(null,event.id)}><label className="field"><span>{[player.name,player.surname].filter(Boolean).join(" ")}'s action</span><textarea name="content" rows={6} required placeholder="What does your character do or say?"/></label><div className="formActions"><button className="primaryButton" type="submit" disabled={event.aiStatus==="GENERATING"}>Save Turn <span>→</span></button></div></form>:<p className="muted">No Player Character is currently selected. Select one in Characters to continue.</p>}
   </section>
   <section className="formSection completeEvent"><div className="formSectionHeading"><span>✧</span><div><h2>End Event & Save Memory</h2><p>Completing this event preserves its full turn history as a memory. You can add an optional note for future reference.</p></div></div><form action={completeEvent.bind(null,event.id)}><label className="field"><span>Memory Note (optional)</span><textarea name="summary" rows={3} placeholder="Add a note about what this event means or what should be remembered..."/></label><div className="formActions"><button className="dangerButton" type="submit" disabled={event.aiStatus==="GENERATING"}>Complete Event & Save Memory</button></div></form></section>
  </>:<section className="memoryNote"><p className="eyebrow">PRESERVED MEMORY</p><h2>{event.memory?.title??event.title}</h2><p>{event.memory?.summary||"The event has been preserved with its complete turn history."}</p><small>Completed {event.completedAt?.toLocaleString("en-US")}</small></section>}
 </AppShell>;
}
