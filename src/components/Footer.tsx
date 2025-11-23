import image_8320e13332163660193ffca7e227562749e71202 from '../assets/8320e13332163660193ffca7e227562749e71202.png';
import React from 'react';
import { Linkedin, Twitter, Github, ArrowRight, Facebook, Instagram, Youtube, Newspaper } from 'lucide-react';
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
               Ready to Elevate Your <br /> Business?
             </h2>
             
             <p className="text-zinc-400 text-lg max-w-xl mx-auto">
               Let's design your next intelligent system together and unlock measurable growth with Elevated AI.
             </p>
             
             <div className="flex flex-col lg:flex-row items-center justify-center gap-6 pt-4">
               <Link to="/book-consultation" className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2">
                 Schedule Consultation
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
               <li><a href="#" className="hover:text-white transition-colors">Solutions</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
               <li><a href="#" className="hover:text-white transition-colors">Resources</a></li>
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
