"use server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
function read(form: FormData, key: string): string | null {
 const item=form.get(key); return typeof item==="string"&&item.trim()?item.trim():null;
}
async function saveAvatar(value: FormDataEntryValue|null): Promise<string|null> {
 if(!(value instanceof File)||value.size===0)return null;
 if(value.size>5*1024*1024)throw new Error("Avatar image must be 5 MB or smaller.");
 const extensions:Record<string,string>={"image/jpeg":".jpg","image/png":".png","image/webp":".webp","image/gif":".gif"};
 const extension=extensions[value.type]; if(!extension)throw new Error("Please upload a JPG, PNG, WEBP or GIF image.");
 const directory=path.join(process.cwd(),"public","uploads","avatars");
 await mkdir(directory,{recursive:true});
 const filename=randomUUID()+extension;
 await writeFile(path.join(directory,filename),Buffer.from(await value.arrayBuffer()));
 return "/uploads/avatars/"+filename;
}
function data(form:FormData) {
 const name=read(form,"name"); if(!name)throw new Error("Character name is required.");
 return {name,surname:read(form,"surname"),age:read(form,"age"),status:read(form,"status"),affiliation:read(form,"affiliation"),
 isPlayerCharacter:form.get("isPlayerCharacter")==="on",appearance:read(form,"appearance"),personality:read(form,"personality"),
 psychology:read(form,"psychology"),history:read(form,"history"),motivations:read(form,"motivations"),strengths:read(form,"strengths"),
 secrets:read(form,"secrets"),communication:read(form,"communication"),notes:read(form,"notes")};
}
export async function createCharacter(form:FormData) {
 const values=data(form); const avatarUrl=await saveAvatar(form.get("avatar"));
 await prisma.$transaction(async tx=>{if(values.isPlayerCharacter)await tx.character.updateMany({where:{isPlayerCharacter:true},data:{isPlayerCharacter:false}});await tx.character.create({data:{...values,avatarUrl}});});
 revalidatePath("/characters"); redirect("/characters");
}
export async function updateCharacter(id:string,form:FormData) {
 const values=data(form); const existing=await prisma.character.findUniqueOrThrow({where:{id}});
 const uploadedAvatar=await saveAvatar(form.get("avatar"));
 await prisma.$transaction(async tx=>{if(values.isPlayerCharacter)await tx.character.updateMany({where:{isPlayerCharacter:true,NOT:{id}},data:{isPlayerCharacter:false}});await tx.character.update({where:{id},data:{...values,avatarUrl:uploadedAvatar??existing.avatarUrl}});});
 revalidatePath("/characters");revalidatePath("/characters/"+id);redirect("/characters/"+id);
}
export async function deleteCharacter(id:string) {
 await prisma.character.delete({where:{id}});revalidatePath("/characters");redirect("/characters");
}
