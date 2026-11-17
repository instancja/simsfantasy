"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
function read(form: FormData, key: string): string | null {
  const item = form.get(key);
  return typeof item === "string" && item.trim() ? item.trim() : null;
}
function data(form: FormData) {
  const name = read(form, "name");
  if (!name) throw new Error("Character name is required.");
  return {
    name, surname: read(form,"surname"), age: read(form,"age"),
    status: read(form,"status"), affiliation: read(form,"affiliation"),
    isPlayerCharacter: form.get("isPlayerCharacter") === "on",
    appearance: read(form,"appearance"), personality: read(form,"personality"),
    psychology: read(form,"psychology"), history: read(form,"history"),
    motivations: read(form,"motivations"), strengths: read(form,"strengths"),
    secrets: read(form,"secrets"), communication: read(form,"communication"),
    notes: read(form,"notes"),
  };
}
export async function createCharacter(form: FormData) {
  const values = data(form);
  await prisma.$transaction(async tx => {
    if (values.isPlayerCharacter) await tx.character.updateMany({where:{isPlayerCharacter:true},data:{isPlayerCharacter:false}});
    await tx.character.create({data:values});
  });
  revalidatePath("/characters");
  redirect("/characters");
}
export async function updateCharacter(id: string, form: FormData) {
  const values = data(form);
  await prisma.$transaction(async tx => {
    if (values.isPlayerCharacter) await tx.character.updateMany({where:{isPlayerCharacter:true,NOT:{id}},data:{isPlayerCharacter:false}});
    await tx.character.update({where:{id},data:values});
  });
  revalidatePath("/characters");
  revalidatePath(`/characters/${id}`);
  redirect(`/characters/${id}`);
}
export async function deleteCharacter(id: string) {
  await prisma.character.delete({where:{id}});
  revalidatePath("/characters");
  redirect("/characters");
}