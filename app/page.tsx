'use client';

import { useState, useEffect, useRef } from "react";
import { tables, reducers } from "../src/module_bindings";
import { useTable, useReducer } from "spacetimedb/react";

export default function Home() {
  const [text, setText] = useState('');
  const [username, setUsername] = useState('');
  const [usernameSet, setUsernameSet] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const [messages] = useTable(tables.message);
  const sendMessage = useReducer(reducers.sendMessage);
  const setUsernameReducer = useReducer(reducers.setUsername);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSetUsername = () => {
    if (!username.trim()) return;
    setUsernameReducer({ username });
    setUsernameSet(true);
  };

  const handleSend = () => {
    if (!text.trim()) return;
    sendMessage({ text, sender: username });
    setText('');
  };

  if (!usernameSet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-black text-white tracking-tight mb-2">ChatX</h1>
            <p className="text-white/80">Connect instantly with anyone, anywhere.</p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Pick a username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSetUsername()}
                className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-hidden focus:ring-2 focus:ring-white/50 transition-all"
              />
            </div>
            <button
              onClick={handleSetUsername}
              className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transform hover:scale-105 transition-all active:scale-95 shadow-lg"
            >
              Enter Chat
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-6 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-tr from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">X</div>
          <h1 className="text-xl font-bold text-zinc-900 dark:text-white">ChatX</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{username}</span>
            <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
            </span>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages?.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-400 opacity-50">
            <div className="w-16 h-16 mb-4 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-2xl">💬</div>
            <p className="text-lg">No messages yet...</p>
            <p className="text-sm">Be the first to say something!</p>
          </div>
        ) : (
          messages.map((msg, i) => {
            const isMe = msg.sender === username;
            return (
              <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] ${isMe ? 'order-1' : 'order-2'}`}>
                  {!isMe && (
                    <span className="text-xs text-zinc-500 ml-1 mb-1 block font-medium">
                      {msg.sender}
                    </span>
                  )}
                  <div className={`px-4 py-2 rounded-2xl shadow-sm ${
                    isMe 
                      ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-tr-none' 
                      : 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700 rounded-tl-none'
                  }`}>
                    <p className="text-[15px] leading-relaxed break-words">{msg.text}</p>
                    <div className={`text-[10px] mt-1 text-right ${isMe ? 'text-indigo-100' : 'text-zinc-400'}`}>
                      {new Date(Number(msg.sentAt)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={bottomRef} />
      </main>

      {/* Input */}
      <footer className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto flex gap-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-zinc-100 dark:bg-zinc-800 border-none rounded-xl px-4 py-3 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-hidden"
          />
          <button
            onClick={handleSend}
            disabled={!text.trim()}
            className="bg-indigo-600 text-white p-3 rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md transform active:scale-95"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </footer>
    </div>
  );
}