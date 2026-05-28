"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { track } from "@/lib/gtag";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "¿Qué tratamientos ofrecen?",
  "¿Dónde están ubicados?",
  "¿Tienen financiación?",
  "Quiero pedir una cita",
];

function renderMd(text: string) {
  if (!text) return "";
  return text
    .split("\n")
    .map((line) => {
      const bullet = line.match(/^[\*\-]\s+(.*)/);
      if (bullet) return `<li>${inlineMd(bullet[1] ?? "")}</li>`;
      if (line.trim() === "") return "<br>";
      return `<p>${inlineMd(line)}</p>`;
    })
    .join("")
    .replace(/(<li>.*<\/li>)+/g, (m) => `<ul>${m}</ul>`);
}

function inlineMd(str: string) {
  return str.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "¡Hola! Soy el asistente virtual de Dental Estudio. ¿En qué puedo ayudarte?",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingAutoSend = useRef<string | null>(null);
  const messagesRef = useRef(messages);

  useEffect(() => { messagesRef.current = messages; }, [messages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const msg = (e as CustomEvent<{ message: string }>).detail?.message;
      if (msg) {
        pendingAutoSend.current = msg;
        setOpen(true);
      }
    };
    window.addEventListener("open-chat", handler);
    return () => window.removeEventListener("open-chat", handler);
  }, []);

  useEffect(() => {
    if (open && pendingAutoSend.current) {
      const msg = pendingAutoSend.current;
      pendingAutoSend.current = null;
      setTimeout(() => sendMsg(msg), 350);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const sendMsg = useCallback(async (text: string) => {
    const content = text.trim();
    if (!content) return;
    setInput("");
    const next: Message[] = [...messagesRef.current, { role: "user", content }];
    setMessages(next);
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const reply: string = data.text || "Algo salió mal. Inténtalo de nuevo.";
      track.chatMessage();
    setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Algo salió mal. Inténtalo de nuevo." }]);
    } finally {
      setLoading(false);
    }
  }, []);

  function send(text: string) {
    if (loading) return;
    sendMsg(text);
  }

  const showSuggestions = messages.length === 1 && !loading;

  return (
    <>
      {/* FAB */}
      <motion.button
        onClick={() => { setOpen((v) => { if (!v) track.chatOpen(); return !v; }); }}
        aria-label={open ? "Cerrar chat" : "Abrir chat"}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 2.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-[100px] right-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-lg border-0 cursor-pointer"
        style={{ backgroundColor: "#C9956A" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="16" height="16" viewBox="0 0 18 18" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round"
            >
              <line x1="3" y1="3" x2="15" y2="15" />
              <line x1="15" y1="3" x2="3" y2="15" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[164px] right-6 z-40 w-[340px] max-h-[500px] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
            style={{ maxWidth: "calc(100vw - 32px)" }}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 shrink-0"
              style={{ backgroundColor: "#C9956A" }}
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0"
                style={{ backgroundColor: "rgba(255,255,255,0.25)", color: "#fff" }}
              >
                D
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-white font-bold text-sm leading-none">
                  Dental Estudio
                </span>
                <span className="text-white/80 text-[11px] font-normal">
                  Asistente virtual · Responde al instante
                </span>
              </div>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto flex flex-col gap-2.5 p-4"
              style={{ backgroundColor: "#F4F0E8", overscrollBehavior: "contain" }}
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[84%] px-3.5 py-2.5 text-[13px] leading-[1.55] break-words ${
                    m.role === "user"
                      ? "self-end rounded-[18px_18px_4px_18px] text-white font-semibold"
                      : "self-start rounded-[18px_18px_18px_4px] bg-white shadow-sm"
                  }`}
                  style={
                    m.role === "user"
                      ? { backgroundColor: "#C9956A", color: "#fff" }
                      : { color: "#111111" }
                  }
                >
                  {m.role === "assistant" ? (
                    <span
                      className="prose-sm [&_p]:m-0 [&_p]:mb-1 [&_ul]:pl-4 [&_ul]:list-disc [&_li]:mb-0.5 [&_strong]:font-bold [&_br]:hidden"
                      dangerouslySetInnerHTML={{ __html: renderMd(m.content) }}
                    />
                  ) : (
                    m.content
                  )}
                </div>
              ))}

              {loading && (
                <div
                  className="self-start flex items-center gap-1.5 px-3.5 py-3 rounded-[18px_18px_18px_4px] bg-white shadow-sm"
                >
                  {[0, 150, 300].map((delay, i) => (
                    <span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full animate-bounce"
                      style={{
                        backgroundColor: "#C9956A",
                        animationDelay: `${delay}ms`,
                        animationDuration: "0.9s",
                      }}
                    />
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Suggestions */}
            {showSuggestions && (
              <div
                className="flex flex-wrap gap-1.5 px-4 pb-3 pt-1 shrink-0"
                style={{ backgroundColor: "#F4F0E8" }}
              >
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="px-3 py-1.5 text-[11px] font-semibold rounded-full border cursor-pointer transition-colors duration-150"
                    style={{
                      background: "#fff",
                      borderColor: "rgba(201,149,106,0.35)",
                      color: "#111111",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#C9956A";
                      (e.currentTarget as HTMLButtonElement).style.color = "#fff";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "#C9956A";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#fff";
                      (e.currentTarget as HTMLButtonElement).style.color = "#111111";
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,149,106,0.35)";
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={(e) => { e.preventDefault(); send(input); }}
              className="flex items-center gap-2 px-3 py-3 shrink-0"
              style={{ backgroundColor: "#fff", borderTop: "1px solid rgba(17,17,17,0.07)" }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                placeholder="Escribe tu pregunta..."
                className="flex-1 px-3.5 py-2 text-[13px] rounded-full outline-none"
                style={{
                  backgroundColor: "#F4F0E8",
                  border: "1.5px solid rgba(201,149,106,0.3)",
                  color: "#111111",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#C9956A"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(201,149,106,0.3)"; }}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-0 cursor-pointer transition-transform duration-100 disabled:opacity-30 disabled:cursor-default"
                style={{ backgroundColor: "#C9956A", color: "#fff" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
