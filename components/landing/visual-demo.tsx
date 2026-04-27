"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Palette, Zap, EyeOff, MonitorSmartphone, Search, 
  Phone, Video, MoreVertical, Smile, Paperclip, Mic, Send 
} from "lucide-react";

type Mode = "default" | "theme" | "quick" | "privacy";

const modes: { id: Mode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "default", label: "Default", icon: MonitorSmartphone },
  { id: "theme", label: "Custom Theme", icon: Palette },
  { id: "quick", label: "Quick Replies", icon: Zap },
  { id: "privacy", label: "Privacy Mode", icon: EyeOff },
];

const initialChatList = [
  { name: "Sarah Mitchell", msg: "Sounds great, see you then!", time: "12:42", unread: 0, color: "bg-pink-500/40" },
  { name: "Design Team", msg: "Alex: shipped the new spec ✨", time: "12:30", unread: 3, color: "bg-violet-500/40" },
  { name: "Marcus", msg: "Did you get the file?", time: "11:58", unread: 1, color: "bg-amber-500/40" },
  { name: "Family", msg: "Mom: don't forget Sunday!", time: "11:21", unread: 0, color: "bg-emerald-500/40" },
  { name: "Lukas Brandt", msg: "Let's catch up tomorrow", time: "10:09", unread: 0, color: "bg-sky-500/40" },
];

const initialMessages = [
  { from: "them", text: "Hey! Are you free this afternoon?" },
  { from: "me", text: "Probably yes — what's up?" },
  { from: "them", text: "Wanted to grab a coffee and walk through the new mockups." },
  { from: "me", text: "Perfect. 3pm at the usual place?" },
  { from: "them", text: "Sounds great, see you then!" },
];

const quickReplies = [
  "Sounds good 👍",
  "I'll get back to you",
  "On it!",
  "Talk later",
];

const themeStyles: Record<Mode, { bg: string; accent: string; bubbleMe: string; bubbleThem: string; sidebar: string; header: string }> = {
  default: {
    bg: "bg-[#0b141a]",
    accent: "text-emerald-400",
    bubbleMe: "bg-emerald-700/80 text-white",
    bubbleThem: "bg-zinc-700/80 text-white",
    sidebar: "bg-[#111b21]",
    header: "bg-[#202c33]",
  },
  theme: {
    bg: "bg-[#1a1030]",
    accent: "text-fuchsia-300",
    bubbleMe: "bg-gradient-to-br from-fuchsia-600 to-violet-600 text-white",
    bubbleThem: "bg-violet-950/80 text-violet-100",
    sidebar: "bg-[#150b28]",
    header: "bg-gradient-to-r from-fuchsia-700/50 to-violet-700/50",
  },
  quick: {
    bg: "bg-[#0b141a]",
    accent: "text-emerald-400",
    bubbleMe: "bg-emerald-700/80 text-white",
    bubbleThem: "bg-zinc-700/80 text-white",
    sidebar: "bg-[#111b21]",
    header: "bg-[#202c33]",
  },
  privacy: {
    bg: "bg-[#0b141a]",
    accent: "text-emerald-400",
    bubbleMe: "bg-emerald-700/80 text-white",
    bubbleThem: "bg-zinc-700/80 text-white",
    sidebar: "bg-[#111b21]",
    header: "bg-[#202c33]",
  },
};

export function VisualDemo() {
  const [mode, setMode] = useState<Mode>("default");
  const [messages, setMessages] = useState(initialMessages);
  const [messageText, setMessageText] = useState("");
  const [chatList] = useState(initialChatList);

  const t = themeStyles[mode];
  const isPrivate = mode === "privacy";
  const showQuick = mode === "quick";

  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage = { from: "me" as const, text: messageText.trim() };
    setMessages((prev) => [...prev, newMessage]);
    setMessageText("");

    // Optional: Scroll to bottom (simple version)
    setTimeout(() => {
      const chatContainer = document.querySelector(".chat-container");
      if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 50);
  };

  const handleQuickReply = (text: string) => {
    setMessageText(text);
    
    // Focus input and place cursor at the end
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.selectionStart = inputRef.current.selectionEnd = text.length;
      }
    }, 10);
  };

  return (
    <section className="py-24 md:py-28 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(ellipse at top, oklch(0.72 0.19 142 / 0.07) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-10 md:mb-14 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest mb-4">
            See it in action
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            One click. A whole new WhatsApp Web.
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            Switch modes below to preview what changes. Try the Quick Replies!
          </p>
        </motion.div>

        {/* Mode tabs */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {modes.map((m) => {
            const active = mode === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setMode(m.id)}
                className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="demo-tab-pill"
                    className="absolute inset-0 rounded-full bg-accent/15 border border-accent/30"
                    transition={{ type: "spring", stiffness: 320, damping: 28 }}
                  />
                )}
                <m.icon className="h-4 w-4 relative z-10" />
                <span className="relative z-10">{m.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Mock window */}
        <motion.div
          className="max-w-5xl mx-auto rounded-2xl border border-border overflow-hidden shadow-2xl shadow-black/40"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900 border-b border-border">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <span className="h-3 w-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex-1 text-center text-xs text-muted-foreground font-mono truncate">
              web.whatsapp.com
            </div>
          </div>

          <motion.div
            className={`grid grid-cols-[160px_1fr] md:grid-cols-[260px_1fr] h-[420px] md:h-[520px] ${t.bg} transition-colors duration-500`}
            animate={{ filter: "blur(0px)" }}
          >
            {/* Sidebar */}
            <div className={`${t.sidebar} border-r border-white/5 flex flex-col`}>
              <div className={`${t.header} px-3 md:px-4 py-3 flex items-center gap-2`}>
                <div className="h-7 w-7 rounded-full bg-zinc-700/80" />
                <div className="flex-1" />
                <Search className="h-4 w-4 text-zinc-400" />
              </div>
              <div className="px-2 md:px-3 py-2">
                <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-black/30">
                  <Search className="h-3.5 w-3.5 text-zinc-500" />
                  <span className="text-[10px] md:text-xs text-zinc-500">
                    Search or start a new chat
                  </span>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                {chatList.map((c, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-2 md:gap-3 px-2 md:px-3 py-2 md:py-3 border-b border-white/5 ${
                      i === 0 ? "bg-white/5" : ""
                    }`}
                  >
                    <div
                      className={`h-8 w-8 md:h-10 md:w-10 rounded-full ${c.color} flex-shrink-0 ${
                        isPrivate ? "blur-md" : ""
                      } transition-all duration-500`}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[11px] md:text-sm font-medium text-white truncate ${
                            isPrivate ? "blur-sm" : ""
                          } transition-all duration-500`}
                        >
                          {c.name}
                        </span>
                        <span className="text-[9px] md:text-[10px] text-zinc-500 flex-shrink-0">
                          {c.time}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <span
                          className={`text-[10px] md:text-xs text-zinc-400 truncate ${
                            isPrivate ? "blur-sm" : ""
                          } transition-all duration-500`}
                        >
                          {c.msg}
                        </span>
                        {c.unread > 0 && (
                          <span
                            className={`text-[9px] md:text-[10px] font-bold rounded-full px-1.5 py-0.5 flex-shrink-0 ${
                              mode === "theme" ? "bg-fuchsia-500 text-white" : "bg-emerald-500 text-zinc-900"
                            }`}
                          >
                            {c.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat area */}
            <div className="flex flex-col relative overflow-hidden">
              {/* Chat header */}
              <div className={`${t.header} px-3 md:px-4 py-2.5 md:py-3 flex items-center gap-3 border-b border-white/5`}>
                <div className={`h-8 w-8 md:h-9 md:w-9 rounded-full ${chatList[0].color} ${isPrivate ? "blur-md" : ""} transition-all duration-500`} />
                <div className="flex-1 min-w-0">
                  <div className={`text-xs md:text-sm font-medium text-white ${isPrivate ? "blur-sm" : ""} transition-all duration-500`}>
                    {chatList[0].name}
                  </div>
                  <div className="text-[10px] md:text-xs text-zinc-400">online</div>
                </div>
                <div className="flex items-center gap-3 text-zinc-400">
                  <Video className="h-4 w-4 hidden md:block" />
                  <Phone className="h-4 w-4 hidden md:block" />
                  <MoreVertical className="h-4 w-4" />
                </div>
              </div>

              {/* Messages Area */}
              <div 
                className="flex-1 overflow-y-auto p-3 md:p-5 space-y-2 md:space-y-3 chat-container"
                style={{
                  backgroundImage: mode === "theme"
                    ? "radial-gradient(circle at 30% 20%, rgba(217, 70, 239, 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)"
                    : "none",
                }}
              >
                <AnimatePresence mode="popLayout">
                  {messages.map((msg, i) => (
                    <motion.div
                      key={`${mode}-${i}`}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3) }}
                      className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] px-3 md:px-4 py-1.5 md:py-2 rounded-2xl text-[11px] md:text-sm leading-relaxed shadow-sm ${
                          msg.from === "me" ? t.bubbleMe : t.bubbleThem
                        } ${msg.from === "me" ? "rounded-br-sm" : "rounded-bl-sm"}`}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Quick Replies */}
              <AnimatePresence>
                {showQuick && (
                  <motion.div
                    className="px-3 md:px-5 pb-3"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                      {quickReplies.map((q, i) => (
                        <motion.button
                          key={q}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.06, y: -1 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ delay: 0.08 + i * 0.05 }}
                          onClick={() => handleQuickReply(q)}
                          className="px-4 py-2 rounded-3xl text-[10px] md:text-xs font-medium 
                                     bg-emerald-500/10 hover:bg-emerald-500/25 
                                     border border-emerald-500/40 hover:border-emerald-400 
                                     text-emerald-200 hover:text-white 
                                     transition-all duration-200 shadow-sm active:shadow-md"
                        >
                          {q}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input Bar */}
              <div className={`${t.header} px-3 md:px-4 py-2.5 md:py-3 flex items-center gap-2 md:gap-3 border-t border-white/5`}>
                <Smile className="h-5 w-5 text-zinc-400 cursor-pointer hover:text-zinc-300 transition-colors" />
                <Paperclip className="h-5 w-5 text-zinc-400 hidden md:block cursor-pointer hover:text-zinc-300 transition-colors" />

                <div className="flex-1">
                  <input
                    ref={inputRef}
                    id="chat-input"
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                    placeholder="Type a message"
                    className="w-full px-4 py-2.5 md:py-3 bg-black/40 text-white text-[11px] md:text-sm 
                               rounded-full border border-white/10 focus:border-emerald-500/60 
                               focus:outline-none placeholder:text-zinc-500 transition-all"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={sendMessage}
                  className="text-emerald-400 hover:text-emerald-300 transition-colors p-1"
                >
                  {messageText.trim() ? (
                    <Send className="h-5 w-5" />
                  ) : (
                    <Mic className="h-5 w-5" />
                  )}
                </motion.button>
              </div>

              {/* Mode badge */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-[10px] md:text-xs font-medium text-white"
                >
                  {modes.find((m) => m.id === mode)?.label}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        <p className="text-center text-xs md:text-sm text-muted-foreground mt-6">
          Live interactive preview — click the Quick Replies in "Quick" mode!
        </p>
      </div>
    </section>
  );
}