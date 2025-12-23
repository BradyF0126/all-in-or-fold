"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [msg, setMsg] = useState("");

  async function signUp() {
    setMsg("");
    const { error } = await supabase.auth.signUp({ email, password: pw });
    if (error) return setMsg(error.message);
    setMsg("Check your email to confirm (if confirmations are on).");
  }

  async function signIn() {
    setMsg("");
    const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
    if (error) return setMsg(error.message);
    router.push("/");
  }

  return (
    <main className="min-h-screen bg-emerald-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-3 bg-white/5 p-6 rounded-2xl border border-white/10">
        <h1 className="text-2xl font-extrabold">Log in</h1>

        <input
          className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <input
          className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2"
          placeholder="Password"
          type="password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          autoComplete="current-password"
        />

        {msg && <div className="text-white/80 text-sm">{msg}</div>}

        <div className="grid grid-cols-2 gap-3">
          <button onClick={signIn} className="rounded-xl bg-emerald-700 py-2 font-bold">
            Sign In
          </button>
          <button onClick={signUp} className="rounded-xl bg-white/10 py-2 font-bold">
            Sign Up
          </button>
        </div>
      </div>
    </main>
  );
}
