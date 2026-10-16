"use client";
import { useRouter } from "next/navigation";
import { DeletePortrait as Button } from "@/components/photobooth/DeletePortrait";

export function DeletePortrait({ id }: { id: string }) {
  const router = useRouter();
  return <Button id={id} className="text-red-600 underline disabled:opacity-50" onDeleted={() => router.refresh()} />;
}
