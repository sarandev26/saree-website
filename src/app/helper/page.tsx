"use client";

import React, { useState, useEffect } from "react";
import { PENDING_SLOTS, PendingSlot } from "@/lib/pending-slots";
import Link from "next/link";

export default function HelperPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [realSet, setRealSet] = useState<Set<string>>(new Set());
  const [allCopied, setAllCopied] = useState(false);

  const fetchStatus = async () => {
    try {
      const res = await fetch("/real-status.json?t=" + Date.now());
      if (res.ok) {
        const list = await res.json();
        setRealSet(new Set(list));
      }
    } catch {}
  };

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (slot: PendingSlot) => {
    navigator.clipboard.writeText(slot.prompt);
    setCopiedId(slot.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopyNext = () => {
    const nextSlot = PENDING_SLOTS.find((s) => !realSet.has(s.file));
    if (nextSlot) {
      handleCopy(nextSlot);
    } else {
      alert("All slots have already been generated!");
    }
  };

  const handleCopyAll = () => {
    const remaining = PENDING_SLOTS.filter((s) => !realSet.has(s.file));
    const text = remaining
      .map(
        (s, i) =>
          `[IMAGE ${i + 1} of ${remaining.length} - ${s.title} (${s.ratio})]\n${s.prompt}\n`
      )
      .join("\n---\n\n");
    navigator.clipboard.writeText(text);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 3000);
  };

  const doneCount = PENDING_SLOTS.filter((s) => realSet.has(s.file)).length;
  const remainingCount = PENDING_SLOTS.length - doneCount;
  const nextPending = PENDING_SLOTS.find((s) => !realSet.has(s.file));

  return (
    <div className="min-h-screen bg-[#0B1E20] text-[#FAF7F2] p-6 sm:p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Top Header */}
        <header className="text-center pb-8 border-b border-[#1C3B3F] mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link
              href="/"
              className="text-xs uppercase tracking-wider text-[#A0B2B4] hover:text-[#E8A317] transition-colors flex items-center gap-1.5"
            >
              ← Back to Main Website
            </Link>
            <div className="inline-block px-3 py-1 rounded bg-[#E8A317]/20 text-[#E8A317] font-semibold text-xs tracking-wider uppercase">
              Mayura Looms Production Helper
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-display uppercase tracking-wider text-[#E8A317] mb-2">
            Image Generator Helper
          </h1>
          <p className="text-[#A0B2B4] text-sm sm:text-base">
            Completed: <strong className="text-white">{doneCount}</strong> / {PENDING_SLOTS.length} slots (
            <span className="text-[#E8A317] font-semibold">{remainingCount} remaining</span>)
          </p>

          {/* Quick Action Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handleCopyNext}
              className="bg-[#E8A317] hover:bg-[#d6930e] text-[#0B1E20] font-bold px-5 py-2.5 rounded-lg text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              ⚡ Copy Next Pending Prompt ({nextPending ? nextPending.id : "Done"})
            </button>
            <button
              onClick={handleCopyAll}
              className="bg-[#163236] hover:bg-[#1f474d] text-white border border-[#1C3B3F] font-bold px-5 py-2.5 rounded-lg text-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              {allCopied ? "✓ All Remaining Copied!" : `📋 Copy All ${remainingCount} Remaining Prompts`}
            </button>
            <a
              href="https://gemini.google.com"
              target="_blank"
              rel="noreferrer"
              className="bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold px-5 py-2.5 rounded-lg text-sm transition-all shadow-md flex items-center gap-1.5"
            >
              Open Gemini Web ↗
            </a>
          </div>
        </header>

        {/* Instructions */}
        <div className="bg-[#E8A317]/10 border border-[#E8A317]/30 rounded-xl p-5 mb-8 text-sm sm:text-base">
          <h2 className="font-semibold text-[#E8A317] mb-2 text-lg">⚡ 3 Easy Steps to Generate:</h2>
          <ol className="list-decimal ml-5 space-y-2 text-[#D3E0E2]">
            <li>
              Click <strong className="text-white">&quot;⚡ Copy Next Pending Prompt&quot;</strong> above (or on any individual card).
            </li>
            <li>
              Go to{" "}
              <a
                href="https://gemini.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#0B1E20] bg-[#E8A317] px-2.5 py-0.5 rounded text-xs hover:opacity-90 transition-opacity"
              >
                Gemini Web ↗
              </a>
              , paste it and press Enter.
            </li>
            <li>
              When Gemini generates the photo, click the <strong className="text-white">Download icon</strong> in Gemini.
            </li>
          </ol>
          <p className="mt-3 text-xs text-[#A0B2B4]">
            ✨ The background auto-importer monitors your Downloads folder automatically. As soon as you download it, the image turns green with ✅ Live on Website here and appears immediately on the site!
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-4">
          {PENDING_SLOTS.map((slot) => {
            const isDone = realSet.has(slot.file);
            const isCopied = copiedId === slot.id;

            return (
              <div
                key={slot.id}
                className={`border rounded-xl p-5 transition-all ${
                  isDone
                    ? "bg-[#22c55e]/10 border-[#22c55e]/50"
                    : "bg-[#11282B] border-[#1C3B3F] hover:border-[#E8A317]/40"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="bg-[#E8A317]/20 text-[#E8A317] font-bold text-xs px-2.5 py-1 rounded">
                      {slot.id}
                    </span>
                    <h3 className="font-semibold text-base sm:text-lg text-white">
                      {slot.title}
                    </h3>
                    <span className="bg-[#1C3B3F] text-[#A0B2B4] text-xs px-2 py-0.5 rounded">
                      {slot.ratio}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      isDone
                        ? "bg-[#22c55e]/20 text-[#22c55e]"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {isDone ? "✅ Live on Website" : "⏳ Waiting for Download"}
                  </span>
                </div>

                <div className="bg-[#081618] border border-[#163236] rounded-lg p-3.5 text-xs sm:text-sm text-[#D3E0E2] leading-relaxed select-all font-mono mb-4">
                  {slot.prompt}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => handleCopy(slot)}
                    className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                      isCopied
                        ? "bg-[#22c55e] text-white"
                        : isDone
                        ? "bg-[#1C3B3F] text-white hover:bg-[#254d52]"
                        : "bg-[#E8A317] text-[#0B1E20] hover:bg-[#d6930e]"
                    }`}
                  >
                    {isCopied ? "✓ Copied to Clipboard!" : isDone ? "📋 Re-copy Prompt" : "📋 Copy Prompt"}
                  </button>

                  {isDone && (
                    <img
                      src={`/media/${slot.file}?t=${Date.now()}`}
                      alt={slot.title}
                      className="w-12 h-12 object-cover rounded border border-[#1C3B3F]"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
