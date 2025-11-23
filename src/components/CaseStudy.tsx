
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, Clock, ShieldCheck, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export const CaseStudy = () => {
  return (
    <section className="py-24 px-6 bg-[#0A0A0F] relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[128px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Success Stories</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light">Real results from organizations that transformed with AI</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-[#0F0F16] overflow-hidden shadow-2xl relative group"
        >
          {/* Dynamic Background Gradient that shifts on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/10 via-transparent to-purple-900/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Side - Text Content */}
            <div className="p-8 md:p-12 flex flex-col justify-between relative z-10">
              {/* Animated Top Border */}
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80" />
              
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-300 mb-8 uppercase tracking-widest">
                  Manufacturing
                </div>
                <div className="flex items-center gap-4 mb-8">
                     {/* Placeholder for Logo - Using text for now, but styled */}
                     <div className="text-4xl font-bold text-white tracking-tighter flex items-center gap-2">
                         CDW <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                     </div>
                </div>

                <div className="space-y-10">
                  <div className="relative pl-6 border-l border-white/10 hover:border-indigo-500 transition-colors duration-300">
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Challenge</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed font-light tracking-wide">
                      CDW faced increasing customer support demands, inconsistent response times, and growing repetitive Tier 1 calls that were overwhelming their support staff.
                    </p>
                  </div>

                  <div className="relative pl-6 border-l border-white/10 hover:border-emerald-500 transition-colors duration-300">
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Solution</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed font-light tracking-wide">
                      Elevated AI implemented an enterprise-grade voice automation system using Western AI's Workflows, n8n, and ElevenLabs.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/5 flex flex-wrap items-center gap-8 justify-between">
                 <div className="flex gap-8">
                     <div>
                       <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Monthly Value</div>
                       <div className="text-2xl font-bold text-amber-400 font-mono">$4,550</div>
                     </div>
                     <div>
                       <div className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Total ROI</div>
                       <div className="text-2xl font-bold text-emerald-400 font-mono">$16,408</div>
                     </div>
                 </div>
                 <button className="group px-6 py-3 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]">
                   Start Transformation
                   <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                 </button>
              </div>
            </div>

            {/* Right Side - Metrics Grid with Image Background */}
            <div className="relative p-8 md:p-12 flex flex-col justify-center overflow-hidden min-h-[400px] lg:min-h-full">
               {/* Background Image with Overlay */}
               <div className="absolute inset-0 z-0">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1498230870289-7561110a6e69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxsJTIwY2VudGVyJTIwaGVhZHNldCUyMG1vZGVybiUyMGRhcmt8ZW58MXx8fHwxNzYzNzY2NzM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                    alt="Voice AI visualization background" 
                    className="w-full h-full object-cover opacity-30 blur-sm scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/60" />
               </div>

               <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {[
                   { icon: TrendingUp, val: "45%", label: "Tier 1 Support Reduction", color: "text-emerald-400" },
                   { icon: Clock, val: "62%", label: "Faster Resolution Time", color: "text-blue-400" },
                   { icon: ShieldCheck, val: "100%", label: "24/7 Support Coverage", color: "text-purple-400" },
                   { icon: Users, val: "22%", label: "Customer Satisfaction Increase", color: "text-amber-400" }
                 ].map((metric, i) => (
                   <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                      className="bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-xl p-6 backdrop-blur-md transition-all duration-300 group/card"
                   >
                      <metric.icon className={`w-5 h-5 ${metric.color} mb-4`} />
                      <div className="text-4xl font-bold text-white mb-1 tracking-tight">{metric.val}</div>
                      <div className="text-xs text-zinc-400 font-medium leading-tight">{metric.label}</div>
                   </motion.div>
                 ))}
               </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
