import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCaseStudy } from '@/hooks/useData';

export const CaseStudyDetail = () => {
  const { id } = useParams();
  const { data: study, isLoading } = useCaseStudy(id);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 bg-[#050508]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-4 w-32 bg-white/10 rounded" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 bg-white/10 rounded" />
              <div className="h-6 w-1/2 bg-white/10 rounded" />
            </div>
            <div className="h-[400px] bg-white/5 rounded-3xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!study) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center text-center px-6 bg-[#050508]">
        <h1 className="text-4xl font-bold text-white mb-4">Case Study Not Found</h1>
        <Link to="/case-studies" className="text-indigo-400 hover:text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Case Studies
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#050508]">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Back Link */}
        <Link to="/case-studies" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Success Stories
        </Link>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
           <div className="flex items-center gap-3 mb-6">
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300">
                {study.category}
              </div>
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-300">
                {study.client}
              </div>
           </div>
           
           <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
             {study.headline}
           </h1>
           
           <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
             {study.results}
           </p>
        </motion.div>

        {/* Hero Image */}
        <div className="rounded-3xl overflow-hidden border border-white/10 h-[400px] md:h-[500px] relative mb-20">
           <ImageWithFallback 
              src={study.image} 
              alt={study.client}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
           
           {/* Main Content */}
           <div className="lg:col-span-2 space-y-12">
              <div>
                 <h2 className="text-2xl font-bold text-white mb-4">The Challenge</h2>
                 <p className="text-zinc-300 text-lg leading-relaxed">
                   {study.challenge}
                 </p>
              </div>
              
              <div>
                 <h2 className="text-2xl font-bold text-white mb-4">The Solution</h2>
                 <p className="text-zinc-300 text-lg leading-relaxed whitespace-pre-line">
                   {study.fullDescription || study.solution}
                 </p>
              </div>
           </div>

           {/* Sidebar Stats */}
           <div className="lg:col-span-1">
              <div className="bg-white/5 rounded-3xl border border-white/10 p-8 sticky top-32">
                 <h3 className="text-lg font-bold text-white mb-6">Key Results</h3>
                 
                 <div className="space-y-8">
                    {study.stats?.map((stat, i) => (
                      <div key={i} className="pb-6 border-b border-white/5 last:border-0 last:pb-0">
                         <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                         <div className="text-sm text-zinc-400">{stat.label}</div>
                      </div>
                    ))}
                 </div>

                  <div className="mt-10 pt-6 border-t border-white/10">
                     <Link 
                       to="/book-consultation" 
                       className="w-full py-4 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
                     >
                       Start Transformation
                       <ArrowRight className="w-4 h-4" />
                     </Link>
                  </div>
              </div>
           </div>

        </div>

      </div>
    </div>
  );
};
