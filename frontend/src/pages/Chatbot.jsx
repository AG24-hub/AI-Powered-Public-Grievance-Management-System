import React, { useState, useContext } from 'react';
import SideBar from '../components/SideBar';
import { MessageSquare, Send } from 'lucide-react';
import axios from "axios";
import ChatbotContext from '../context/chatbotProvider';

const Chatbot = () => {
  const [activeTab, setActiveTab] = useState("chatbotAI");
  const [input, setInput] = useState("");
  const{messages, sendMessage, loading, setLoading} = useContext(ChatbotContext)

  const handleSend = async(e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setInput("");
    
    await sendMessage(input);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans antialiased">
      {/* Sidebar stays fully visible and interactive on the left side */}
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container that acts as the Chat window instead of a closed modal */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 h-full overflow-hidden">
        {/* Responsive Width & Height: Full screen on mobile, max-width on desktop */}
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[600px] h-full sm:h-[580px] flex flex-col overflow-hidden border border-gray-100 transition-all duration-300">
          
          {/* Header (shrink-0 prevents mobile layout distortion) */}
          <header className="bg-blue-600 text-white px-5 py-4 flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-lg">
                <MessageSquare size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-base leading-tight">Civic-AI Support</h3>
                <span className="text-xs text-blue-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block"></span>Online
                </span>
              </div>
            </div>
          </header>

          {/* Chat Messages Area (Responsive padding) */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-3.5 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm ${
                  msg.isBot ? 'bg-white text-gray-800 rounded-tl-none border border-gray-100' : 'bg-blue-600 text-white rounded-tr-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Footer (shrink-0 and min-w-0 prevent layout squishing) */}
          <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-gray-100 bg-white flex gap-2 items-center shrink-0">
            <input 
              type="text" 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Type your message..." 
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition min-w-0" 
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition shadow-md shadow-blue-200 shrink-0">
              <Send size={18} />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Chatbot;