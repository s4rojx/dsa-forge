"use client";

import { useEffect } from "react";

export function useKeyboard(onOpen: () => void) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onOpen();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onOpen]);
}
