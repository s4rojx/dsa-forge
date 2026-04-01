"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight, Loader2, Lock, Mail, Zap } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [callbackUrl, setCallbackUrl] = useState("/dashboard");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const nextCallbackUrl =
        new URLSearchParams(window.location.search).get("callbackUrl") || "/dashboard";
      setCallbackUrl(nextCallbackUrl);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (!result || result.error) {
        setError("Invalid email or password.");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Unable to sign in right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-root p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-10 flex items-center justify-center gap-2.5">
          <Zap className="h-7 w-7 text-primary" />
          <span className="font-rubik text-2xl font-bold text-text-1">
            DSA <span className="text-primary">Forge</span>
          </span>
        </Link>

        <div className="rounded-xl border border-border bg-bg-card p-8">
          <h1 className="mb-1 text-center font-rubik text-xl font-bold text-text-1">
            Welcome back.
          </h1>
          <p className="mb-6 text-center text-sm text-text-2">
            Sign in to continue your pattern practice.
          </p>

          {error && (
            <div className="mb-4 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-mono text-text-3">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-lg border border-border bg-bg-elevated py-3 pl-10 pr-4 text-sm text-text-1 outline-none transition-colors placeholder:text-text-3/50 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-mono text-text-3">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Minimum 6 characters"
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-border bg-bg-elevated py-3 pl-10 pr-4 text-sm text-text-1 outline-none transition-colors placeholder:text-text-3/50 focus:border-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-jakarta font-bold text-white transition-all hover:bg-primary-dim disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-text-2">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
