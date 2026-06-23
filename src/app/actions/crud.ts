"use server";
import { createRow, updateRow, deleteRow, reorderRows } from "@/lib/crud";

export async function createEntity(entityKey: string, input: unknown) {
  await createRow(entityKey, input);
}
export async function updateEntity(entityKey: string, id: string, input: unknown) {
  await updateRow(entityKey, id, input);
}
export async function deleteEntity(entityKey: string, id: string) {
  await deleteRow(entityKey, id);
}
export async function reorderEntity(entityKey: string, ids: string[]) {
  await reorderRows(entityKey, ids);
}
