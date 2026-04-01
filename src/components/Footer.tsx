import { ExternalLink, Zap } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-root">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-rubik text-lg font-bold text-text-1">
                DSA <span className="text-primary">Forge</span>
              </span>
            </Link>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-text-2">
              Pattern-first DSA practice with curated problem sets, real progress tracking,
              and code templates.
            </p>
          </div>

          <div>
            <h3 className="font-jakarta text-sm font-bold uppercase tracking-wider text-text-1">
              Resources
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="https://leetcode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-text-2 transition-colors hover:text-primary"
                >
                  LeetCode <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.geeksforgeeks.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-text-2 transition-colors hover:text-primary"
                >
                  GeeksForGeeks <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-text-3">
            Copyright {new Date().getFullYear()} DSA Forge. Built for Future engineers.
          </p>
          <p className="text-xs text-text-3/60">
            Not affiliated with LeetCode or GeeksForGeeks.
          </p>
        </div>
      </div>
    </footer>
  );
}
