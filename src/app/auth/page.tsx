"use client";
import { useState } from "react";
import { signIn, signUp } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthPage() {
  const [mode, setMode] = useState<"in" | "up">("in");
  const [error, setError] = useState<string | null>(null);

  async function action(fd: FormData) {
    const res = mode === "in" ? await signIn(fd) : await signUp(fd);
    if (res?.error) setError(res.error);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-sm flex-col justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold tracking-tight">FMRXR// admin</h1>
      <form action={action} className="flex flex-col gap-4">
        <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required /></div>
        <div><Label htmlFor="password">Password</Label><Input id="password" name="password" type="password" required minLength={8} /></div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        <Button type="submit">{mode === "in" ? "Sign in" : "Create account"}</Button>
      </form>
      <button className="text-sm text-muted-foreground underline"
        onClick={() => setMode(mode === "in" ? "up" : "in")}>
        {mode === "in" ? "First time? Create the admin account" : "Have an account? Sign in"}
      </button>
    </main>
  );
}
