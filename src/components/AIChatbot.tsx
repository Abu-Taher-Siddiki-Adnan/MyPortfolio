import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Bot, Loader } from "lucide-react";
import { Message } from "../types";

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "assistant",
      content: "Hi! I'm here to help you learn more about Adnan's work, tech stack, or availability. Ask me anything!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Proxy chat request to Express API route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Send formatted conversation history
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      if (!response.ok) {
        let errorMessage = "I encountered a minor issue. Please try again.";
        try {
          const errData = await response.json();
          if (errData && errData.error) {
            errorMessage = errData.error;
          }
        } catch (_) {}
        throw new Error(errorMessage);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Streaming is not supported by your browser or the server.");
      }

      const decoder = new TextDecoder("utf-8");
      const assistantMessageId = `ai-${Date.now()}`;

      // Add empty message placeholder
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          timestamp: new Date()
        }
      ]);

      // Turn off loading animation as we are now streaming content
      setLoading(false);

      let accumulatedContent = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId
              ? { ...msg, content: accumulatedContent }
              : msg
          )
        );
      }
    } catch (error: any) {
      console.error("AI Assistant error:", error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: error.message || "I'm having trouble connecting to my cognitive mainframe. Please make sure the GEMINI_API_KEY is configured correctly.",
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chatbot Window */}
      {isOpen && (
        <div 
          id="ai-chat-window"
          className="fixed bottom-24 right-6 z-50 w-80 md:w-96 h-[500px] bg-[#0f172a]/95 backdrop-blur-2xl border border-slate-800 rounded-[24px] overflow-hidden flex flex-col shadow-2xl transition-all duration-300 animate-fade-in"
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-extrabold text-sm leading-tight">Alchemist AI</p>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <p className="text-[10px] font-bold opacity-80 uppercase tracking-wider font-mono">Online</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              id="close-chat-btn"
              className="text-white/80 hover:text-white hover:scale-110 transition-transform cursor-pointer"
              aria-label="Close chat window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message Area */}
          <div 
            id="chat-messages"
            className="flex-grow p-4 overflow-y-auto space-y-4 text-sm bg-[#020617]/50 scrollbar-thin scrollbar-thumb-white/5"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl ${
                    msg.role === "user"
                      ? "bg-indigo-500 text-white rounded-tr-none font-medium shadow-[0_4px_12px_rgba(99,102,241,0.2)]"
                      : "bg-[#0f172a] text-slate-100 border border-slate-800 rounded-tl-none leading-relaxed"
                  }`}
                >
                  <span className="whitespace-pre-wrap block">
                    {msg.content}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Loader */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#0f172a] text-slate-300 border border-slate-800 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin text-indigo-400" />
                  <span className="text-xs font-sans animate-pulse">Typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input Section */}
          <form 
            onSubmit={handleSendMessage}
            className="p-4 border-t border-slate-800/80 bg-[#0f172a]"
          >
            <div className="flex gap-2">
              <input
                type="text"
                required
                id="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Adnan's tech stack or hire him..."
                className="flex-grow bg-[#020617] border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none rounded-full px-4 text-xs h-10 text-white transition-all"
              />
              <button
                type="submit"
                id="send-chat-msg-btn"
                disabled={loading}
                className="w-10 h-10 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_12px_rgba(99,102,241,0.3)]"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* AI Toggle Button with constant pulse */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        id="ai-assistant-toggle"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 border border-slate-700 shadow-[0_0_25px_rgba(99,102,241,0.3)] flex items-center justify-center group hover:scale-110 active:scale-95 transition-transform duration-300 cursor-pointer"
        aria-label="Toggle Alchemist AI Assistant"
      >
        <Bot className="w-7 h-7 text-white group-hover:rotate-12 transition-transform duration-300" />
        <span className="absolute inset-0 rounded-full bg-indigo-500/20 animate-ping pointer-events-none"></span>
      </button>
    </>
  );
}
