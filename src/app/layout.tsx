import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Rubik } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-rubik",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DSA Forge - Master DSA by Mastering the Patterns",
  description:
    "500+ problems. 50+ patterns. 15 topics. One framework - Java. Master data structures and algorithms through pattern-based learning.",
  keywords: [
    "DSA",
    "Data Structures",
    "Algorithms",
    "Interview Preparation",
    "LeetCode",
    "Coding Interview",
    "Java",
    "Dynamic Programming",
    "Graphs",
    "Trees",
  ],
  openGraph: {
    title: "DSA Forge - Master DSA by Mastering the Patterns",
    description:
      "500+ problems. 50+ patterns. 15 topics. Master DSA through pattern-based learning.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg-root font-jakarta text-text-1 antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
