"use client";
import { useState } from "react";
import type { Character } from "@prisma/client";
type Action=(formData:FormData)=>Promise<void>;
function Area({name,label,value,placeholder}:{name:string;label:string;value?:string|null;placeholder:string}){return <label className="field"><span>{label}</span><textarea name={name} defaultValue={value??""} placeholder={placeholder} rows={4}/></label>;}
function Input({name,label,value,required=false,placeholder=""}:{name:string;label:string;value?:string|null;required?:boolean;placeholder?:string}){return <label className="field"><span>{label}{required&&<b className="requiredMark"> *</b>}</span><input name={name} defaultValue={value??""} required={required} placeholder={placeholder}/></label>;}
export function CharacterForm({action,character,submitLabel}:{action:Action;character?:Character;submitLabel:string}){
 const [tab,setTab]=useState<"profile"|"appearance">("profile");const [preview,setPreview]=useState<string|null>(null);
 const sections=[
 ["03","Personality","Temperament, traits and everyday behaviour.","personality","Personality traits, habits, typical reactions and how they treat others..."],
 ["04","Psychology","Fears, needs, values and inner conflicts.","psychology","Fears, desires, insecurities, values, beliefs and inner conflicts..."],
 ["05","Background","Personal history and formative experiences.","history","Origins, upbringing, past experiences and important events..."],
 ["06","Motivations & Goals","What drives the character and what they want to achieve.","motivations","Current goals, ambitions, long-term desires and motivations..."],
 ["07","Strengths & Weaknesses","Abilities, resources, limitations and vulnerabilities.","strengths","Skills, talents, resources, limitations and weaknesses..."],
 ["10","Communication","Voice, speech patterns and writing style.","communication","Speaking style, vocabulary, characteristic phrases and messaging habits..."],
 ["11","Additional Information","Anything that does not fit into other sections.","notes","Optional notes..."]
 ] as const;
 const avatar=preview??character?.avatarUrl??null;
 return <form action={action} className="characterForm">
 <div className="characterTabs" role="tablist" aria-label="Character details">
 <button type="button" role="tab" aria-selected={tab==="profile"} className={tab==="profile"?"characterTab active":"characterTab"} onClick={()=>setTab("profile")}>Profile <span>01–11</span></button>
 <button type="button" role="tab" aria-selected={tab==="appearance"} className={tab==="appearance"?"characterTab active":"characterTab"} onClick={()=>setTab("appearance")}>Appearance <span>Portrait & description</span></button></div>
 <div hidden={tab!=="profile"}>
 <section className="formSection"><div className="formSectionHeading"><span>01</span><div><h2>Basic Information</h2><p>The details that identify this character.</p></div></div><div className="formGrid">
 <Input name="name" label="First name" value={character?.name} required placeholder="Character's first name"/><Input name="surname" label="Last name" value={character?.surname}/><Input name="age" label="Age" value={character?.age} placeholder="e.g. 24, unknown, ageless"/><Input name="status" label="Status / Role" value={character?.status}/><Input name="affiliation" label="Affiliation / Group" value={character?.affiliation} placeholder="Optional — no predefined categories"/>
 </div><label className="playerToggle"><input type="checkbox" name="isPlayerCharacter" defaultChecked={character?.isPlayerCharacter??false}/><span><strong>Player Character</strong><small>Only one character can be controlled by you. All others are NPCs.</small></span></label></section>
 {sections.slice(0,5).map(([n,title,desc,key,placeholder])=><section className="formSection" key={key}><div className="formSectionHeading"><span>{n}</span><div><h2>{title}</h2><p>{desc}</p></div></div><Area name={key} label={title} value={character?.[key]} placeholder={placeholder}/></section>)}
 <section className="formSection"><div className="formSectionHeading"><span>08</span><div><h2>Relationships</h2><p>Connections are managed in a dedicated module.</p></div></div><div className="infoNotice"><strong>Relationship records are managed separately.</strong><p>Character-to-character relationships will be connected to the Relationships module, not stored as unsynchronised profile text.</p></div></section>
 <section className="formSection privateSection"><div className="formSectionHeading"><span>09</span><div><h2>Secrets</h2><p>Private information other characters do not automatically know.</p></div></div><div className="privateNotice">PRIVATE CHARACTER NOTES</div><Area name="secrets" label="Secrets & Private Information" value={character?.secrets} placeholder="Secrets, concealed information and facts not automatically known by others..."/></section>
 {sections.slice(5).map(([n,title,desc,key,placeholder])=><section className="formSection" key={key}><div className="formSectionHeading"><span>{n}</span><div><h2>{title}</h2><p>{desc}</p></div></div><Area name={key} label={title} value={character?.[key]} placeholder={placeholder}/></section>)}
 </div>
 <div hidden={tab!=="appearance"}><section className="formSection appearanceEditor"><div className="formSectionHeading"><span>02</span><div><h2>Appearance</h2><p>Describe the character and choose a portrait for their profile.</p></div></div>
 <div className="avatarEditor"><div className="avatarPreview">{avatar?<img src={avatar} alt="Character avatar preview"/>:<span>{character?.name?.[0]?.toUpperCase()??"?"}</span>}</div><div className="avatarControls"><label className="field"><span>Character Avatar</span><input type="file" name="avatar" accept="image/jpeg,image/png,image/webp,image/gif" onChange={event=>{const file=event.target.files?.[0];if(file){if(file.size>5*1024*1024){event.target.value="";setPreview(null);return;}setPreview(URL.createObjectURL(file));}}}/></label><p className="muted">JPG, PNG, WEBP or GIF · Maximum file size: 5 MB. Stored locally on your computer.</p>{character?.avatarUrl&&<p className="avatarCurrent">An existing avatar will be kept unless you upload a new one.</p>}</div></div>
 <Area name="appearance" label="Physical Appearance & Style" value={character?.appearance} placeholder="Describe their build, face, hair, eyes, distinctive features, posture, clothing and personal style..."/></section></div>
 <div className="formActions"><a className="secondaryButton" href={character?"/characters/"+character.id:"/characters"}>Cancel</a><button className="primaryButton" type="submit">{submitLabel} <span>→</span></button></div><p className="formFootnote">Only the first name is required. All other fields are optional. Remember to save your changes before leaving this form.</p></form>;
}
