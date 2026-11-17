"use client";
import {deleteCharacter} from "@/app/characters/actions";
export function DeleteCharacterButton({id,name}:{id:string;name:string}) {
 const action=deleteCharacter.bind(null,id);
 return <form action={action} onSubmit={e=>{if(!window.confirm(`Delete ${name}? This action cannot be undone.`))e.preventDefault();}}><button className="dangerButton" type="submit">Delete Character</button></form>;
}