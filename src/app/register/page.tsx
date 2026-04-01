"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { ArrowRight, Loader2, Lock, Mail, User, Zap } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [callbackUrl, setCallbackUrl] = useState("/dashboard");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error || "Registration failed.");
        return;
      }

      const signInResult = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      if (!signInResult || signInResult.error) {
        router.push("/login");
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError("Unable to create your account right now.");
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
            Start your forge.
          </h1>
          <p className="mb-6 text-center text-sm text-text-2">
            Create your account and start tracking real progress.
          </p>

          {error && (
            <div className="mb-4 rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-mono text-text-3">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-lg border border-border bg-bg-elevated py-3 pl-10 pr-4 text-sm text-text-1 outline-none transition-colors placeholder:text-text-3/50 focus:border-primary"
                />
              </div>
            </div>

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

            <div>
              <label className="mb-1.5 block text-xs font-mono text-text-3">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-3" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Repeat password"
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
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-text-2">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
