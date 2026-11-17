import {notFound} from "next/navigation";
import {AppShell} from "@/components/AppShell";
import {CharacterForm} from "@/components/CharacterForm";
import {prisma} from "@/lib/prisma";
import {updateCharacter} from "../../actions";
export default async function EditCharacter({params}:{params:Promise<{id:string}>}){const {id}=await params;const c=await prisma.character.findUnique({where:{id}});if(!c)notFound();const action=updateCharacter.bind(null,id);return <AppShell active="characters"><div className="pageHeader compactHeader"><div><p className="eyebrow">CHARACTER EDITOR</p><h1>Edit {c.name}</h1><p className="muted">Update the profile. Existing information is preserved unless changed.</p></div></div><CharacterForm action={action} character={c} submitLabel="Save Changes"/></AppShell>;}