"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { FALLBACK_ANSWER, findAnswer, GREETING, QUICK_SUGGESTIONS } from "./faqData";

interface ChatMessage {
  id: string;
  role: "bot" | "user";
  text: string;
}

let idCounter = 0;
function nextId(): string {
  idCounter += 1;
  return `msg-${idCounter}`;
}

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: nextId(), role: "bot", text: GREETING }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  function respond(question: string) {
    const userMsg: ChatMessage = { id: nextId(), role: "user", text: question };
    setMessages((prev) => [...prev, userMsg]);
    setTyping(true);

    const delay = 500 + Math.min(900, question.length * 12);
    window.setTimeout(() => {
      const answer = question.trim() ? findAnswer(question) : FALLBACK_ANSWER;
      setMessages((prev) => [...prev, { id: nextId(), role: "bot", text: answer }]);
      setTyping(false);
    }, delay);
  }

  function handleSend(e?: FormEvent) {
    e?.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput("");
    respond(trimmed);
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {open && (
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="false"
          aria-label="Chatbot bantuan Desa Wisata Ngargoyoso"
          className="flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl glass-strong shadow-glass outline-none animate-slideUp sm:h-[30rem]"
        >
          <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-forest-600 to-forest-500 px-5 py-4 text-white">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path
                    d="M21 15a4 4 0 0 1-4 4H8l-5 3V6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v9Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div>
                <p className="text-sm font-semibold">Asisten Ngargoyoso</p>
                <p className="text-[11px] text-white/75">Biasanya membalas seketika</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Tutup chatbot"
              className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-white/15"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            aria-live="polite"
          >
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <p
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "rounded-br-sm bg-forest-600 text-white"
                      : "rounded-bl-sm bg-white/70 text-ink dark:bg-white/10 dark:text-nightforest-text"
                  }`}
                >
                  {m.text}
                </p>
              </div>
            ))}

            {typing && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white/70 px-4 py-3 dark:bg-white/10">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-soft/60 dark:bg-nightforest-text/60 [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-soft/60 dark:bg-nightforest-text/60 [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink-soft/60 dark:bg-nightforest-text/60" />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-black/5 px-4 py-3 dark:border-white/10">
            {!messages.some((m) => m.role === "user") && (
              <div className="mb-2.5 flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {QUICK_SUGGESTIONS.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => respond(topic)}
                    className="shrink-0 whitespace-nowrap rounded-full border border-forest-200 bg-forest-50 px-3 py-1.5 text-[11px] font-medium text-forest-700 transition-colors duration-200 hover:bg-forest-100 dark:border-white/10 dark:bg-white/5 dark:text-turmeric-light dark:hover:bg-white/10"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <label htmlFor="chatbot-input" className="sr-only">
                Tulis pertanyaan Anda
              </label>
              <input
                id="chatbot-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tulis pertanyaan Anda..."
                className="flex-1 rounded-full border border-black/10 bg-white/70 px-4 py-2.5 text-sm outline-none transition-colors duration-200 focus:border-forest-400 dark:border-white/15 dark:bg-white/5"
              />
              <button
                type="submit"
                aria-label="Kirim pertanyaan"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest-600 text-white transition-transform duration-200 hover:scale-105"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m3 20 18-8L3 4v6l12 2-12 2v6Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Tutup chatbot" : "Buka chatbot bantuan"}
        aria-expanded={open}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-forest-600 to-turmeric text-white shadow-soft-lg transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path
              d="M21 15a4 4 0 0 1-4 4H8l-5 3V6a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v9Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
