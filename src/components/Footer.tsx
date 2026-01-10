import image_8320e13332163660193ffca7e227562749e71202 from '../assets/8320e13332163660193ffca7e227562749e71202.png';
import React from 'react';
import { Linkedin, Twitter, Github, ArrowRight, Facebook, Instagram, Youtube, Newspaper, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TechTicker } from './ui/TechTicker';

export const Footer = () => {
  return (
    <footer className="bg-[#0A0A0F] pt-0 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Tech Ticker */}
        <div className="mb-12 border-b border-white/5 pb-12 pt-12">
           <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-6 text-center">Powered by Leading Intelligence</p>
           <TechTicker />
        </div>

        {/* Voice AI Callout */}
        <div className="text-center py-8 border-b border-white/5 mb-12">
          <p className="text-zinc-400 text-sm mb-2">Prefer to talk it through?</p>
          <a 
            href="tel:+14244843844" 
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call our AI assistant—available 24/7—to see if a conversation makes sense →
          </a>
        </div>

        {/* Big CTA Card */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-black p-12 md:p-24 text-center mb-24">
           {/* Background Effects */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
           
           <div className="relative z-10 max-w-3xl mx-auto space-y-8">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                Ready to get started?
             </div>
             
             <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
               Ready to Discuss Your <br /> AI Risk & Opportunity?
             </h2>
             
             <p className="text-zinc-400 text-lg max-w-xl mx-auto">
               Let's explore whether now is the right time for a strategic AI conversation—no obligations, just clarity.
             </p>
             
             <div className="flex flex-col lg:flex-row items-center justify-center gap-6 pt-4">
               <Link to="/contact" className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2">
                 Request an AI Readiness Conversation
                 <ArrowRight className="w-4 h-4" />
               </Link>
               
               <div className="flex items-center gap-3">
                 <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all group" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                 </a>
                 <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all group" aria-label="Substack">
                    <Newspaper className="w-5 h-5 group-hover:scale-110 transition-transform" />
                 </a>
                 <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all group" aria-label="Instagram">
                    <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                 </a>
               </div>
             </div>

             <div className="pt-8 flex justify-center gap-6 text-xs text-zinc-500">


             </div>
           </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pt-8 border-t border-white/5">
          <div className="md:col-span-2">
             <div className="flex items-center mb-6">
               <img src={image_8320e13332163660193ffca7e227562749e71202} alt="Elevated AI" className="h-32 w-auto object-contain" />
             </div>
             <p className="text-zinc-500 text-sm max-w-xs mb-6">
               Transforming Business Through Intelligent Automation. N3RD Labs LLC. All rights reserved.
             </p>
             <a href="mailto:Korra@elevatedai.co" className="text-indigo-400 text-sm hover:underline">Korra@elevatedai.co</a>
             
             <div className="flex gap-4 mt-6">
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all" aria-label="Substack">
                  <Newspaper className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all" aria-label="YouTube">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all" aria-label="Facebook">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
             </div>
          </div>

          <div>
             <h3 className="text-white font-bold mb-6 text-sm">Quick Links</h3>
             <ul className="space-y-3 text-sm text-zinc-500">
                <li><Link to="/solutions" className="hover:text-white transition-colors">Solutions</Link></li>
                <li><Link to="/ai-governance" className="hover:text-white transition-colors">AI Governance</Link></li>
                <li><Link to="/ai-transformation" className="hover:text-white transition-colors">AI Transformation</Link></li>
               <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
               <li><Link to="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
               <li><Link to="/resources" className="hover:text-white transition-colors">Resources</Link></li>
             </ul>
          </div>

          <div>
             <h3 className="text-white font-bold mb-6 text-sm">Legal</h3>
             <ul className="space-y-3 text-sm text-zinc-500">
               <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
               <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
               <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
               <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
             </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600">
           <p>© 2025 N3RD Labs LLC d/b/a Elevated AI. All Rights Reserved.</p>
           <p onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="cursor-pointer hover:text-zinc-400 transition-colors">Back to Top ↑</p>
        </div>

      </div>
    </footer>
  );
};
