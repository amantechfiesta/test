'use client';

import { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ScanLine, MapPin, AlertTriangle, CheckCircle, Send } from 'lucide-react';

export default function FinMateDashboard() {
  const [balance, setBalance] = useState(1250.00);
  const [bills, setBills] = useState(400.00);
  const [showDiscount, setShowDiscount] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const daysRemaining = 30 - new Date().getDate();
  const safeToSpend = (balance - bills) / (daysRemaining || 1);
  const isDanger = safeToSpend < 20;

  const simulateLocationChange = () => {
    setShowDiscount(true);
    setTimeout(() => setShowDiscount(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans pb-20">
      <header className="bg-blue-600 text-white p-6 rounded-b-3xl shadow-lg sticky top-0 z-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Wallet className="w-6 h-6" /> FinMate
          </h1>
          <div className="bg-blue-500 px-3 py-1 rounded-full text-xs font-mono">
            FD001 Prototype
          </div>
        </div>

        <div className="text-center">
          <p className="text-blue-100 text-sm uppercase tracking-wider">Safe to Spend / Day</p>
          <div className={`text-5xl font-extrabold mt-2 ${isDanger ? 'text-red-300' : 'text-white'}`}>
            ${safeToSpend.toFixed(2)}
          </div>
          {isDanger && (
            <div className="mt-2 bg-red-500/20 inline-block px-3 py-1 rounded-lg text-xs flex items-center justify-center gap-2">
              <AlertTriangle className="w-3 h-3" /> Budget Critical! Hustle Finder Active.
            </div>
          )}
        </div>
      </header>

      <main className="p-5 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setScannerOpen(true)}
            className="p-4 bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <ScanLine className="w-8 h-8 text-blue-600" />
            <span className="font-semibold text-sm">Scan Receipt</span>
          </button>

          <button 
            onClick={simulateLocationChange}
            className="p-4 bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <MapPin className="w-8 h-8 text-green-600" />
            <span className="font-semibold text-sm">Check Location</span>
          </button>
        </div>

        <AnimatePresence>
          {showDiscount && (
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="fixed top-24 right-4 left-4 bg-green-600 text-white p-4 rounded-xl shadow-2xl z-50 flex items-start gap-3"
            >
              <CheckCircle className="w-6 h-6 flex-shrink-0" />
              <div>
                <h4 className="font-bold">Student Discount Found!</h4>
                <p className="text-sm opacity-90">You are at <b>University Cafe</b>. Show ID for 15% off.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white rounded-2xl shadow-sm p-4 h-96 flex flex-col">
          <div className="border-b pb-2 mb-2 flex justify-between items-center">
            <h3 className="font-bold text-gray-700">Financial Coach</h3>
            <span className="text-xs text-gray-400">Powered by Vercel AI SDK</span>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 mb-4 text-sm">
            {messages.length === 0 && (
              <p className="text-gray-400 text-center mt-10 italic">
                "Can I afford pizza tonight?"<br/>"How do I save $100?"
              </p>
            )}
            {messages.map(m => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-3 rounded-xl max-w-[85%] ${
                  m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask FinMate..."
            />
            <button type="submit" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>

      <AnimatePresence>
        {scannerOpen && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9 }} 
              animate={{ scale: 1 }}
              className="bg-white w-full max-w-sm rounded-3xl p-6 text-center"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <ScanLine className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Processing Receipt...</h3>
              <p className="text-gray-500 text-sm mb-6">Simulating OCR analysis for split bill...</p>
              
              <div className="space-y-3">
                 <div className="flex justify-between text-sm border-b pb-2">
                    <span>Pizza</span>
                    <span className="font-mono">$20.00</span>
                 </div>
                 <div className="flex justify-between text-sm border-b pb-2">
                    <span>Coke</span>
                    <span className="font-mono">$5.00</span>
                 </div>
              </div>

              <button 
                onClick={() => setScannerOpen(false)}
                className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-bold"
              >
                Add to Expenses
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

