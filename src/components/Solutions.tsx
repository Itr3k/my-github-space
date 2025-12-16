import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, Download, CheckCircle2, Landmark, HeartPulse, 
  ShoppingBag, Factory, FileText
} from 'lucide-react';
import { SuccessStoriesCarousel } from './SuccessStoriesCarousel';
import { SOLUTIONS } from '../data/solutions';
import { ImageWithFallback } from './figma/ImageWithFallback';

const INDUSTRIES = [
  {
    icon: Landmark,
    title: "Financial Services",
    description: "Risk analysis, fraud detection, and automated compliance reporting.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  {
    icon: HeartPulse,
    title: "Healthcare",
    description: "Diagnostic support, care research, and patient data automation.",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20"
  },
  {
    icon: ShoppingBag,
    title: "Retail & E-commerce",
    description: "Personalization, inventory prediction, and customer service.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20"
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "Quality control, predictive maintenance, and supply chain.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  }
];

export const Solutions = () => {
  return (
    <>
      <Helmet>
        <title>AI Solutions | Enterprise AI Transformation & Automation | Elevated AI</title>
        <meta name="description" content="Comprehensive AI solutions for enterprise transformation, voice AI, governance, and automation. Industry-leading AI consulting for financial services, healthcare, retail, and manufacturing." />
        <meta name="keywords" content="AI solutions, enterprise AI, AI transformation services, AI automation services, AI consulting firm, AI for financial services, AI for healthcare, AI for manufacturing" />
        <link rel="canonical" href="https://elevatedai.co/solutions" />
        
        <meta property="og:title" content="AI Solutions | Elevated AI" />
        <meta property="og:description" content="Comprehensive AI solutions for enterprise transformation, voice AI, governance, and automation." />
        <meta property="og:url" content="https://elevatedai.co/solutions" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Solutions | Elevated AI" />
        <meta name="twitter:description" content="Comprehensive AI solutions for enterprise transformation and automation." />
      </Helmet>
    <div className="pt-32 pb-24">
      
      {/* Hero Section */}
      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8">
               <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
               Our Solutions
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
              Transforming Business <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300">
                Through Intelligent Automation
              </span>
            </h1>
            
            <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 font-light leading-relaxed">
              Enterprise-grade AI solutions that reduce costs by 70%, automate workflows, and unlock predictive insights tailored to your specific business needs.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
               <Link to="/start" className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-all shadow-[0_0_30px_-5px_rgba(255,255,255,0.3)] flex items-center gap-2">
                 Start Your AI Journey
                 <ArrowRight className="w-4 h-4" />
               </Link>
               <button className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2">
                 Explore Solutions
               </button>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto border-t border-white/10 pt-10">
             {[
               { val: "20+", label: "Years Enterprise Experience" },
               { val: "70%", label: "Avg Cost Reduction" },
               { val: "Fortune 500", label: "Class Clients" },
               { val: "24/7", label: "AI Operations" }
             ].map((stat, i) => (
               <div key={i} className="text-center">
                 <div className="text-3xl font-bold text-white mb-1">{stat.val}</div>
                 <div className="text-xs text-zinc-500 uppercase tracking-wider">{stat.label}</div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SOLUTIONS.map((sol, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-3xl bg-[#0A0A0F] border border-white/10 overflow-hidden hover:border-indigo-500/50 transition-all duration-500 flex flex-col h-full hover:shadow-2xl hover:shadow-indigo-900/20"
              >
                {/* Image Card Header */}
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-indigo-900/20 mix-blend-multiply z-10 transition-opacity group-hover:opacity-0" />
                  <ImageWithFallback 
                    src={sol.image} 
                    alt={sol.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent z-20" />
                  
                  <div className="absolute bottom-4 left-6 z-30 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <sol.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{sol.title}</h3>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow">
                    {sol.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {sol.features.slice(0, 3).map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span className="text-zinc-300 text-xs font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/5 mt-auto">
                    <Link 
                      to={`/solutions/${sol.id}`}
                      className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white text-sm font-medium transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden px-8 py-16 md:px-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-90" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to See It in Action?</h2>
              <p className="text-indigo-100 max-w-2xl mx-auto mb-8">
                Book a 15-minute live demo tailored to your specific use case—no obligations, just actionable insights.
              </p>
              <Link to="/contact" className="px-8 py-3 bg-white text-indigo-900 rounded-full font-bold hover:bg-indigo-50 transition-colors flex items-center gap-2 mx-auto w-fit">
                Schedule Demo
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="px-6 mb-24 text-center">
         <h3 className="text-lg font-medium text-zinc-500 mb-2">Built on Proven Infrastructure</h3>
         <p className="text-sm text-zinc-600 mb-12">Our tech stack is trusted and rated 5-stars by engineering teams worldwide</p>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { name: "n8n", type: "Workflow Automation", review: "The most powerful workflow automation tool for technical teams." },
              { name: "OpenAI", type: "LLM Engine", review: "Setting the standard for enterprise AI capabilities." },
              { name: "ElevenLabs", type: "Voice Synthesis", review: "Indistinguishable from human speech. Best in class." },
              { name: "Pinecone", type: "Vector Database", review: "High-performance vector search for scalable AI apps." }
            ].map((tool, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-left hover:bg-white/10 transition-all hover:scale-105 duration-300 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                   <h4 className="text-white font-bold text-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">{tool.name}</h4>
                   <div className="flex gap-0.5 text-amber-400 text-xs drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]">
                      {[1,2,3,4,5].map(s => <span key={s}>★</span>)}
                   </div>
                </div>
                <div className="text-xs text-indigo-300 font-mono mb-2 uppercase tracking-wider drop-shadow-[0_0_5px_rgba(165,180,252,0.5)]">{tool.type}</div>
                <p className="text-sm text-zinc-300 italic leading-relaxed">"{tool.review}"</p>
              </div>
            ))}
         </div>
      </section>

      {/* Case Study Section */}
      <div className="mb-24 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8">Success Stories</h2>
        <SuccessStoriesCarousel />
      </div>

      {/* Assessment & Industries */}
      <section className="px-6 mb-32">
        <div className="max-w-7xl mx-auto">
          
          {/* Assessment Card */}
          <div className="mb-24 p-12 rounded-3xl bg-gradient-to-b from-[#0F0F16] to-black border border-white/10 text-center relative overflow-hidden">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-900/20 rounded-full blur-[100px] pointer-events-none" />
             
             <div className="relative z-10">
               <div className="w-16 h-16 mx-auto bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30">
                 <FileText className="w-8 h-8 text-indigo-400" />
               </div>
               <h2 className="text-3xl font-bold text-white mb-4">Free AI Readiness Assessment</h2>
               <p className="text-zinc-400 max-w-xl mx-auto mb-8">
                 Get our comprehensive 50-step checklist to assess your organization for successful AI adoption. No credit card required.
               </p>
               <Link to="/checklist" className="px-6 py-2 bg-white text-black text-sm rounded-full font-bold hover:bg-zinc-200 transition-colors flex w-fit items-center gap-2 mx-auto">
                 <Download className="w-4 h-4" />
                 Download Free Checklist
               </Link>
               <p className="mt-6 text-xs text-zinc-600">pdf report generated instantly • no obligations</p>
             </div>
          </div>

          {/* Industries */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Industries We Serve</h2>
            <p className="text-zinc-400">Tailored experience needs cutting-edge infrastructure</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRIES.map((ind, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-[#0A0A0F] border border-white/10 hover:border-white/20 transition-all text-left group"
              >
                <div className={`w-10 h-10 rounded-lg ${ind.bg} ${ind.border} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <ind.icon className={`w-5 h-5 ${ind.color}`} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{ind.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{ind.description}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 mb-12">
         <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden bg-gradient-to-b from-[#1A1A24] to-[#050508] border border-white/10 p-12 md:p-20 text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
            
            <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                 Ready to Transform Your Operations?
               </h2>
               <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-10">
                 Let's discuss how our infrastructure can solve your unique challenges and drive measurable results.
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link to="/contact" className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-colors flex items-center gap-2">
                    Schedule a Consultation
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to="/case-studies" className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-all flex items-center gap-2">
                    View Case Studies
                    <ArrowRight className="w-4 h-4" />
                  </Link>
               </div>
            </div>
         </div>
      </section>

    </div>
    </>
  );
};