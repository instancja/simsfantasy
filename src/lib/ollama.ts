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
 const scene={title:input.title,openingContext:input.premise,location:input.location,time:input.timeLabel,
  playerCharacter:input.playerName,
  participants:input.participants.map(p=>({id:p.id,name:[p.name,p.surname].filter(Boolean).join(" "),appearance:p.appearance,personality:p.personality,psychology:p.psychology,history:p.history,motivations:p.motivations,strengths:p.strengths,communication:p.communication})),
  recentTurns:input.turns.map(t=>({speaker:t.speakerName,speakerType:t.speakerType,content:t.content}))};
 const system=`You are the narrative engine for LIFEVERSE. Continue the existing scene in immersive, polished prose and match the language of the latest player turn.
You control the narrator and all NPCs, but NEVER control the Player Character (${input.playerName}). Do not write, paraphrase, invent or imply any new dialogue, action, decision, thought, feeling, intention or reaction for the Player Character. You may describe the environment and NPC responses to what the player explicitly wrote.
STRICT PRESENTATION RULES:
- NPC segments (speakerType NPC) contain that character's complete contribution to the scene: their spoken dialogue AND their own actions, gestures, facial expressions, posture, movement and visible reactions. Keep all of that character's content together in their avatar dialogue bubble. Use natural prose around dialogue when appropriate.
- NARRATOR segments are ONLY for the environment and impersonal scene atmosphere: setting, weather, lighting, ambient sounds, objects, and environmental changes. Do NOT use narrator segments for NPC actions, gestures, expressions, reactions, thoughts or dialogue. Do not use narrator segments to describe the Player Character.
- Never put NPC dialogue in NARRATOR segments. Keep each NPC's speech and actions in that NPC's own segment, with the correct characterId.
- The player's input uses a simple convention: text enclosed in asterisks (*like this*) is an action explicitly authored by the player; text outside asterisks is the Player Character's spoken dialogue. In the UI, both are displayed together in the Player Character's own avatar bubble; action text is italicized and the asterisks are hidden. Never invent additions to either. Do not narrate, extend, reinterpret or repeat the Player Character's actions or dialogue.

Preserve distinct character voices and continuity. Do not invent established world lore, facts, relationships, backstory or abilities absent from the context. Do not reveal secrets or private profile information as facts known by NPCs. NPCs may interact with each other; include multiple relevant NPCs when appropriate, but do not force every participant to react.
Move the scene forward naturally and leave room for the player's next turn. Do not explain your process, provide analysis, outline a plan or reveal chain-of-thought. Output ONLY valid JSON:
{"segments":[{"speakerType":"NARRATOR","content":"..."},{"speakerType":"NPC","characterId":"exact NPC id from participants","content":"..."}]}
Use only NARRATOR or NPC. Never output PLAYER. NPC ids must exactly match supplied NPC ids. Return 2-6 logically ordered segments; narrator segments are optional. Keep each NPC's actions and dialogue together in their own segment. Use NARRATOR segments only when environmental description adds value.`;
 let response:Response;
 try{response=await fetch(base+"/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model,stream:false,format:"json",think:false,messages:[{role:"system",content:system},{role:"user",content:"Continue this scene from the latest player turn. Context and recent history:\n"+JSON.stringify(scene)}],options:{temperature:0.8,num_ctx:8192}}),signal:AbortSignal.timeout(180000)});}
 catch(error){if(error instanceof Error&&error.name==="TimeoutError")throw new Error("Ollama took too long to respond. Check that the model is running, then retry.");throw new Error("Cannot reach Ollama at "+base+". Make sure Ollama is running, then retry.");}
 if(!response.ok)throw new Error("Ollama request failed ("+response.status+"). "+(await response.text()).slice(0,300));
 const payload=await response.json() as {message?:{content?:string};error?:string};
 if(payload.error)throw new Error(payload.error);
 if(typeof payload.message?.content!=="string")throw new Error("Ollama returned an empty response. Please retry.");
 return parse(payload.message.content,allowed);
}
