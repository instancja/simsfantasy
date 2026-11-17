import "server-only";

type Segment={speakerType:"NARRATOR"|"NPC";characterId?:string;content:string};
type CharacterContext={id:string;name:string;surname:string|null;appearance:string|null;personality:string|null;psychology:string|null;history:string|null;motivations:string|null;strengths:string|null;communication:string|null};
type TurnContext={speakerType:string;speakerName:string;content:string};

function clean(value:string){return value.replace(/<think>[\s\S]*?<\/think>/gi,"").replace(/<\|[^|]+\|>/g,"").trim();}
function parse(raw:string,allowed:Set<string>):Segment[]{
 const text=clean(raw).replace(/^\x60{3}(?:json)?\s*/i,"").replace(/\s*\x60{3}$/i,"");
 let value:unknown;
 try{value=JSON.parse(text);}catch{const a=text.indexOf("{"),b=text.lastIndexOf("}");if(a<0||b<=a)throw new Error("The local model did not return valid structured output. Please retry.");value=JSON.parse(text.slice(a,b+1));}
 if(!value||typeof value!=="object"||!Array.isArray((value as {segments?:unknown}).segments))throw new Error("The local model returned an unexpected response format. Please retry.");
 const result:Segment[]=[];
 for(const item of (value as {segments:unknown[]}).segments){
  if(!item||typeof item!=="object")continue;
  const s=item as {speakerType?:unknown;characterId?:unknown;content?:unknown};
  if(typeof s.content!=="string"||!s.content.trim())continue;
  const content=clean(s.content).slice(0,7000);if(!content)continue;
  if(s.speakerType==="NARRATOR")result.push({speakerType:"NARRATOR",content});
  else if(s.speakerType==="NPC"&&typeof s.characterId==="string"&&allowed.has(s.characterId))result.push({speakerType:"NPC",characterId:s.characterId,content});
 }
 if(!result.length)throw new Error("The local model did not produce any valid narrator or NPC segments. Please retry.");
 return result.slice(0,10);
}

export async function generateOllamaSegments(input:{
 title:string;premise:string|null;location:string|null;timeLabel:string|null;playerName:string;playerCharacterId:string;
 participants:CharacterContext[];turns:TurnContext[];
}):Promise<Segment[]>{
 const base=(process.env.OLLAMA_BASE_URL||"http://127.0.0.1:11434").replace(/\/$/,"");
 const model=process.env.OLLAMA_MODEL||"qwen3.5:4b";
 const npcs=input.participants.filter(p=>p.id!==input.playerCharacterId);
 const allowed=new Set(npcs.map(p=>p.id));
 const latestPlayerTurn=input.turns[input.turns.length-1];
 const previousTurns=input.turns.slice(0,-1);
 const scene={title:input.title,openingContext:input.premise,location:input.location,time:input.timeLabel,
  playerCharacter:{name:input.playerName,role:"PLAYER — controlled exclusively by the user; not an NPC and not an AI role"},
  npcParticipants:npcs.map(p=>({id:p.id,name:[p.name,p.surname].filter(Boolean).join(" "),appearance:p.appearance,personality:p.personality,psychology:p.psychology,history:p.history,motivations:p.motivations,strengths:p.strengths,communication:p.communication})),
  previousTurns:previousTurns.map(t=>({speaker:t.speakerName,speakerType:t.speakerType,content:t.content})),
  latestPlayerTurn:latestPlayerTurn?{content:latestPlayerTurn.content,note:"IMMUTABLE USER-WRITTEN INPUT. React to it, but do not repeat, extend, interpret, or write any continuation for the Player Character."}:null};
 const system=`You are the WORLD AND NPC SIMULATION ENGINE for LIFEVERSE. You are NOT a co-writer of the Player Character. Continue the scene in immersive, polished prose and match the language of the latest player turn.

ABSOLUTE PLAYER-CONTROL BOUNDARY:
The Player Character (${input.playerName}) is controlled EXCLUSIVELY by the human user. You have ZERO authority to write this character.
- NEVER generate dialogue spoken by the Player Character. Never answer a question on their behalf, complete their sentence, invent a reply, or write what they say next.
- NEVER generate actions, movements, gestures, facial expressions, reactions, thoughts, emotions, intentions, decisions, sensations, perceptions, or choices for the Player Character.
- NEVER narrate that the Player Character does, says, thinks, feels, notices, looks, moves, follows, agrees, refuses, smiles, nods, or reacts — unless the exact action was already explicitly written by the user, and even then do not repeat it.
- NEVER assume the Player Character's response to an NPC, question, event, touch, threat, invitation, or environmental change.
- NPCs may speak TO the Player Character, ask questions, address them by name, approach them, or wait for an answer. STOP there. The user's next turn decides the Player Character's response.
- You may describe what an NPC does and what happens in the environment. You may describe an observable consequence caused by an NPC or the environment, but never assign a response or reaction to the Player Character.
- Treat every previous PLAYER turn and especially latestPlayerTurn as immutable historical input, NOT as an invitation to continue writing that character. The player's actions and dialogue are already complete. Do not paraphrase or repeat them.

Your only authorable content is:
1. NARRATOR: environment and atmosphere only — location, weather, lighting, ambient sounds, objects, and environmental changes. No character actions, thoughts, reactions, or dialogue.
2. NPC: actions, movements, gestures, expressions, thoughts when appropriate to the character's perspective, and spoken dialogue of that NPC only. Keep each NPC's complete contribution together in their own avatar bubble. NPCs may interact with each other.

STRICT OUTPUT RULES:
- Output only NARRATOR and NPC segments. Never output PLAYER.
- Never use the Player Character as a speaker or subject of newly invented action/dialogue.
- Do not write second-person narration that dictates what the player does or feels (e.g. "you turn", "you feel", "you answer").
- NPC dialogue may address or question the Player Character, but must not contain an answer or response on their behalf.
- NARRATOR segments describe ONLY the environment. NPC segments contain that NPC's own actions and dialogue; never put NPC dialogue or actions in narrator segments.
- Use only NPC character IDs supplied in npcParticipants. Never use the Player Character ID.
- If the scene reaches a point where the Player Character must respond, end the AI continuation there. It is correct to leave a question, invitation, conflict, or pause unanswered.
- Do not invent established world lore, facts, relationships, backstory or abilities absent from context. Do not reveal secrets or private profile information as facts known by NPCs.
- Do not explain your process, provide analysis, outline a plan or reveal chain-of-thought.

Output ONLY valid JSON:
{"segments":[{"speakerType":"NARRATOR","content":"..."},{"speakerType":"NPC","characterId":"exact NPC id from npcParticipants","content":"..."}]}
Return 2-6 logically ordered segments; narrator segments are optional. Move the world and NPCs forward, then leave the Player Character entirely to the user.`;
 let response:Response;
 try{response=await fetch(base+"/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model,stream:false,format:"json",think:false,messages:[{role:"system",content:system},{role:"user",content:"Continue this scene from the latest player turn. Context and recent history:\n"+JSON.stringify(scene)}],options:{temperature:0.8,num_ctx:8192}}),signal:AbortSignal.timeout(180000)});}
 catch(error){if(error instanceof Error&&error.name==="TimeoutError")throw new Error("Ollama took too long to respond. Check that the model is running, then retry.");throw new Error("Cannot reach Ollama at "+base+". Make sure Ollama is running, then retry.");}
 if(!response.ok)throw new Error("Ollama request failed ("+response.status+"). "+(await response.text()).slice(0,300));
 const payload=await response.json() as {message?:{content?:string};error?:string};
 if(payload.error)throw new Error(payload.error);
 if(typeof payload.message?.content!=="string")throw new Error("Ollama returned an empty response. Please retry.");
 return parse(payload.message.content,allowed);
}
