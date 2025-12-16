
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, PlayCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 overflow-hidden contain-layout">
      
      {/* Background Image & Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
         {/* Main Image - priority loading for LCP with explicit dimensions */}
         <ImageWithFallback 
            src="https://images.unsplash.com/photo-1694852860772-ec8598c72c15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjAzZCUyMGdlb21ldHJpYyUyMHRlY2hub2xvZ3klMjBtaW5pbWFsJTIwYmxhY2slMjBzb3BoaXN0aWNhdGVkfGVufDF8fHx8MTc2MzY2MDQxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Abstract Dark Background"
            className="w-full h-full object-cover opacity-40"
            width={1920}
            height={1080}
            priority
         />
         
         {/* Dark Overlay for Text Readability */}
         <div className="absolute inset-0 bg-[#0A0A0F]/80 mix-blend-overlay" />
         <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-transparent to-[#0A0A0F]" />

         {/* Aurora Glows - use transform for GPU acceleration, reduced blur on mobile */}
         <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-600/10 rounded-full blur-[60px] md:blur-[120px] transform-gpu" />
         <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-purple-600/10 rounded-full blur-[60px] md:blur-[120px] transform-gpu" />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto px-6 w-full text-center">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)] hover:border-white/20 transition-colors cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-zinc-300 tracking-wide">Accepting New Enterprise Clients for Q1</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-[0.95]">
            Intelligent Systems <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300">
              Built for Scale
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto font-light">
            We design and deploy enterprise-grade AI infrastructure. 
            From strategic roadmaps to autonomous voice agents, we help you automate the complex.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link to="/contact" className="group px-8 py-4 bg-white text-black rounded-full font-semibold hover:bg-zinc-200 transition-all shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] flex items-center gap-2">
              Book a Consultation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button 
              onClick={() => document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' })}
              className="group px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-sm"
            >
              <PlayCircle className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
              See Methodology
            </button>
          </div>
          
          {/* Tech Stack Strip */}
          <div className="pt-16 opacity-60">
             <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest mb-6">Powering Next-Gen Enterprises With</p>
             <div 
                className="w-full overflow-hidden max-w-5xl mx-auto"
                style={{ 
                  maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' 
                }}
             >
                <motion.div 
                  className="flex items-center whitespace-nowrap w-max"
                  animate={{ x: "-50%" }}
                  transition={{ 
                    repeat: Infinity, 
                    ease: "linear", 
                    duration: 30 
                  }}
                >
                  {[...Array(2)].map((_, i) => (
                    <React.Fragment key={i}>
                      {["OpenAI", "Gemini", "Lovable", "ElevenLabs", "n8n", "Zapier", "Make", "Notion", "Wix", "Anthropic", "Cursor", "Antigravity"].map((tech) => (
                        <span key={`${i}-${tech}`} className="text-xl md:text-2xl font-bold text-white/40 hover:text-white transition-colors cursor-default mx-8 md:mx-12">
                          {tech}
                        </span>
                      ))}
                    </React.Fragment>
                  ))}
                </motion.div>
             </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
