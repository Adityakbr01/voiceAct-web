"use client";

import { Bookmark, Forward } from "lucide-react";

export default function TestPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#09090b] px-6 py-12">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Button Style Preview
        </h1>
        
        <div className="flex flex-wrap items-center justify-center gap-6 rounded-2xl bg-black p-12 border border-zinc-800/40 shadow-2xl">
          {/* Share Button */}
          <button
            type="button"
            className="group relative flex items-center gap-3.5 rounded-full border border-white/[0.08] bg-gradient-to-b from-[#2d2d30] to-[#1b1b1c] px-9 py-4 font-sans text-[22px] font-medium tracking-tight text-white shadow-[0_12px_24px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-200 hover:from-[#3a3a3d] hover:to-[#222224] active:scale-[0.98] cursor-pointer"
          >
            <Forward 
              className="size-7 stroke-[2.2] text-white" 
              aria-hidden="true"
            />
            <span>Share</span>
          </button>

          {/* Save Button */}
          <button
            type="button"
            className="group relative flex items-center gap-3.5 rounded-full border border-white/[0.08] bg-gradient-to-b from-[#2d2d30] to-[#1b1b1c] px-9 py-4 font-sans text-[22px] font-medium tracking-tight text-white shadow-[0_12px_24px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-200 hover:from-[#3a3a3d] hover:to-[#222224] active:scale-[0.98] cursor-pointer"
          >
            <Bookmark 
              className="size-7 stroke-[2.2] text-white fill-none" 
              aria-hidden="true"
            />
            <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}
