"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // If already logged in, bounce to home
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.push("/");
    });
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const fn =
      mode === "login"
        ? supabase.auth.signInWithPassword
        : supabase.auth.signUp;

    const { error } = await fn({ email, password });
    if (error) return setError(error.message);

    router.push("/");
  }

  return (
    <main className="min-h-screen bg-emerald-950 text-white px-6 py-10">
      <div className="mx-auto max-w-sm space-y-4">
        <h1 className="text-2xl font-extrabold">
          {mode === "login" ? "Log in" : "Create account"}
        </h1>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <input
            className="w-full rounded-xl bg-black/30 border border-white/10 px-3 py-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />

          {error ? (
            <div className="text-red-300 text-sm">{error}</div>
          ) : null}

          <button
            className="w-full rounded-2xl bg-emerald-700 py-2 font-bold"
            type="submit"
          >
            {mode === "login" ? "Log in" : "Sign up"}
          </button>
        </form>

        <button
          className="underline text-white/80"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login"
            ? "Need an account? Sign up"
            : "Already have an account? Log in"}
        </button>
      </div>
    </main>
  );
}
