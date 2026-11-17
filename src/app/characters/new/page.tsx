import {AppShell} from "@/components/AppShell";
import {CharacterForm} from "@/components/CharacterForm";
import {createCharacter} from "../actions";
export default function NewCharacterPage(){return <AppShell active="characters"><div className="pageHeader compactHeader"><div><p className="eyebrow">CHARACTER CREATION</p><h1>New Character</h1><p className="muted">Build a complete profile. Leave any section blank and return to it later.</p></div></div><CharacterForm action={createCharacter} submitLabel="Create Character"/></AppShell>;}