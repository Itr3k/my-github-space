import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  CheckCircle2, Download, Shield, Server, Database, 
  Lock, ArrowRight, Terminal, FileText
} from 'lucide-react';

export const ChecklistLandingPage = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Mock API call
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-12 text-center"
        >
          <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Protocol Sent</h2>
          <p className="text-zinc-400 mb-8">
            The Deep Tech Readiness Protocol has been sent to <span className="text-white font-medium">{email}</span>.
            Please check your inbox.
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Return Home <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6">
            <Terminal className="w-3 h-3" />
            EXECUTIVE RESOURCE
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            The Deep Tech <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
              Readiness Protocol
            </span>
          </h1>
          
          <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
            A comprehensive 50-point framework used by CTOs to evaluate enterprise AI infrastructure, 
            ensure data sovereignty, and prepare for scalable LLM deployment.
          </p>

          <div className="space-y-4 mb-10">
            {[
              { icon: Server, text: "Infrastructure Scalability Assessment" },
              { icon: Shield, text: "Data Sovereignty & Compliance Checks" },
              { icon: Database, text: "Vector Database Performance Benchmarks" },
              { icon: Lock, text: "Enterprise Security & Access Control" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-zinc-300">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-indigo-400">
                  <item.icon className="w-4 h-4" />
                </div>
                <span>{item.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" /> PDF Format
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Updated Q4 2025
            </div>
          </div>
        </motion.div>

        {/* Right Column: Form & Preview */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          {/* Decorative Elements */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-2xl blur-lg" />
          
          <div className="relative bg-[#0A0A0F] border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="mb-8 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Get the Protocol</h3>
              <p className="text-sm text-zinc-400">
                Join 2,000+ engineering leaders who use this framework.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-zinc-400 mb-1.5 ml-1">
                  Work Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
                />
              </div>
              
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-white text-black font-bold rounded-xl py-3.5 hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-zinc-400 border-t-black rounded-full"
                  />
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    Download Free Checklist
                  </>
                )}
              </button>
            </form>

            <p className="mt-6 text-xs text-center text-zinc-600">
              By downloading, you agree to our Terms of Service. 
              <br />Unsubscribe at any time.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
