"use client";

import { useMemo, useState } from "react";
import hljs from "highlight.js/lib/core";
import java from "highlight.js/lib/languages/java";
import cpp from "highlight.js/lib/languages/cpp";
import { Copy, Check, Terminal } from "lucide-react";

hljs.registerLanguage("java", java);
hljs.registerLanguage("cpp", cpp);

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = "java" }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const highlighted = useMemo(() => {
    try {
      const result = hljs.highlight(code.trim(), { language });
      return result.value;
    } catch {
      return code
        .trim()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    }
  }, [code, language]);

  const lines = highlighted.split("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-border bg-code-bg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/60 bg-bg-card">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-mono font-semibold uppercase text-text-2 tracking-wider">
            {language}
          </span>
          <span className="text-[10px] font-mono text-text-3/40 ml-2">
            {lines.length} lines
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[11px] font-mono transition-all ${
            copied
              ? "text-success bg-success/10"
              : "text-text-2 hover:text-text-1 hover:bg-bg-elevated"
          }`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code body with line numbers */}
      <div className="overflow-x-auto py-3">
        <table className="w-full border-collapse font-mono text-[13px] leading-[1.75]">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02]">
                <td className="select-none px-4 text-right align-top text-[11px] text-text-3/25 w-[3ch] leading-[1.75]">
                  {idx + 1}
                </td>
                <td
                  className="px-4 align-top whitespace-pre text-[#d4d0c8] leading-[1.75]"
                  dangerouslySetInnerHTML={{ __html: line || " " }}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
