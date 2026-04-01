"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function PointerHighlight({ children, rectangleClassName, pointerClassName, containerClassName }:
  { children: React.ReactNode; rectangleClassName?: string; pointerClassName?: string; containerClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => { const r = el.getBoundingClientRect(); setDim({ width: r.width, height: r.height }); };
    update();
    const ro = new ResizeObserver(e => { for (const en of e) setDim({ width: en.contentRect.width, height: en.contentRect.height }); });
    ro.observe(el);
    return () => { ro.unobserve(el); };
  }, []);

  return (
    <div className={cn("relative w-fit", containerClassName)} ref={ref}>
      {children}
      {dim.width > 0 && (
        <motion.div className="pointer-events-none absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <motion.div className={cn("absolute inset-0 border border-[#BB4A1E]", rectangleClassName)}
            initial={{ width: 0, height: 0 }} whileInView={{ width: dim.width, height: dim.height }}
            transition={{ duration: 1, ease: "easeInOut" }} />
          <motion.div className="pointer-events-none absolute"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1, x: dim.width + 4, y: dim.height + 4 }}
            style={{ rotate: -90 }} transition={{ duration: 1, ease: "easeInOut" }}>
            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 16 16" className={cn("h-5 w-5 text-[#BB4A1E]", pointerClassName)} xmlns="http://www.w3.org/2000/svg">
              <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"/>
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
