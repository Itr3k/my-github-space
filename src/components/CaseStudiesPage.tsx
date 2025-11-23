import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

import { getCaseStudies } from '../services/api';
import { CaseStudy } from '../types';

export const CaseStudiesPage = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate async API call
        const data = await getCaseStudies();
        setCaseStudies(data);
      } catch (error) {
        console.error("Error loading case studies", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-[#050508] flex items-center justify-center">
         <div className="text-indigo-500 animate-pulse">Loading Case Studies...</div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#050508]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8">
               <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
               Real Client Success Stories
             </div>
             
             <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
               Transforming Business <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300">
                 Through Intelligent Automation
               </span>
             </h1>
             
             <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed mb-12">
               See how leading organizations like JPMorgan, UPS, and Walmart are saving millions and scaling operations with our AI solutions.
             </p>
          </motion.div>
        </div>

        {/* Case Studies Grid */}
        <section className="mb-32 relative z-10">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {caseStudies.map((story, index) => (
               <motion.div 
                 key={story.id}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5, delay: index * 0.1 }}
               >
                  <Link 
                    to={`/case-studies/${story.id}`}
                    className="group relative block h-[500px] rounded-3xl overflow-hidden border border-white/10 hover:border-indigo-500/50 transition-all"
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <ImageWithFallback 
                        src={story.image} 
                        alt={story.client}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                      />
                    </div>

                    {/* Blur Mask Layer - Fades from clear to blurred */}
                    <div 
                      className="absolute inset-0 z-0 pointer-events-none"
                      style={{
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        maskImage: 'linear-gradient(to bottom, transparent 50%, black 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 50%, black 100%)'
                      }}
                    />
                    
                    {/* Gradient Darkening for Text Readability */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

                    {/* Top Badge */}
                    <div className="absolute top-6 left-6 z-10">
                      <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs font-bold text-white uppercase tracking-wider shadow-xl">
                        {story.category}
                      </div>
                    </div>

                    {/* Content Layer */}
                    <div className="absolute inset-0 z-10 flex flex-col justify-end p-8">
                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-1 h-1 rounded-full bg-indigo-400" />
                            <span className="text-indigo-200 text-xs font-bold uppercase tracking-wider">{story.client}</span>
                          </div>
                          
                          <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                            {story.headline}
                          </h3>
                          
                          <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                            Read Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                    </div>
                  </Link>
               </motion.div>
             ))}
           </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center max-w-4xl mx-auto bg-gradient-to-b from-[#0F0F16] to-black border border-white/10 rounded-3xl p-12 md:p-20 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
           
           <div className="relative z-10">
             <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Write Your Success Story?</h2>
             <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">
               Join the ranks of innovative companies using AI to drive measurable results. Book a consultation to discuss your specific challenges.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
               <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2">
                 Schedule Consultation
                 <ArrowRight className="w-4 h-4" />
               </button>
               <button className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-all">
                 Explore Solutions
               </button>
             </div>
           </div>
        </section>

      </div>
    </div>
  );
};
