"use client";

import { SessionProvider } from "next-auth/react";
import ProgressProvider from "@/components/ProgressProvider";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ProgressProvider>{children}</ProgressProvider>
    </SessionProvider>
  );
}
