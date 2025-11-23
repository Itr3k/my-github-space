import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrainCircuit, AudioWaveform, Network, ArrowRight, Check, ChevronRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

const SERVICES = [
  {
    icon: BrainCircuit,
    title: "Strategy & Consulting",
    description: "Transform your business with strategic AI implementation roadmaps tailored to your enterprise needs.",
    features: [
      "Readiness assessments",
      "Implementation roadmap",
      "ROI modeling",
      "Tech stack selection"
    ],
    gradient: "from-blue-500/20 to-indigo-500/20",
    image: "https://images.unsplash.com/photo-1664526937033-fe2c11f1be25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGJsdWVwcmludCUyMG5ldHdvcmslMjB0ZWNobm9sb2d5JTIwZGFya3xlbnwxfHx8fDE3NjM2NjA3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: AudioWaveform,
    title: "Voice AI Systems",
    description: "Deploy intelligent voice interfaces that handle customer interactions 24/7 with enterprise-grade reliability.",
    features: [
      "Appointment scheduling",
      "CRM updates & management",
      "Tier 1 support automation",
      "Multi-channel integration"
    ],
    gradient: "from-purple-500/20 to-pink-500/20",
    image: "https://images.unsplash.com/photo-1759771963975-8a4885446f1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHNvdW5kJTIwd2F2ZSUyMHZpc3VhbGl6YXRpb24lMjBkYXJrJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjM2NjA3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    icon: Network,
    title: "Workflow Automation",
    description: "Streamline operations with AI-powered workflows that integrate seamlessly with existing systems.",
    features: [
      "Intelligent email triage",
      "Sales qualification",
      "Data processing pipelines",
      "Slack/Teams notifications"
    ],
    gradient: "from-emerald-500/20 to-teal-500/20",
    image: "https://images.unsplash.com/photo-1760274479255-b8bf81991ef2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBmbG93JTIwY29ubmVjdGlvbiUyMGxpbmVzJTIwZGFyayUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYzNjYwNzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];

export const Services = () => {
  const [activeService, setActiveService] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="py-32 px-6 relative z-10" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Intelligence as a Service
            </h2>
            <p className="text-zinc-400 text-lg font-light max-w-xl">
              Comprehensive solutions for modern enterprises. We don't just advise—we build, deploy, and optimize.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Sidebar List */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {SERVICES.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                onMouseEnter={() => setActiveService(index)}
                onMouseMove={handleMouseMove}
                className={`group relative p-6 rounded-2xl border text-left transition-all duration-300 overflow-hidden
                  ${activeService === index 
                    ? "bg-white/5 border-indigo-500/50 shadow-[0_0_20px_-10px_rgba(99,102,241,0.3)]" 
                    : "bg-[#0F0F13] border-white/5 hover:border-white/10"
                  }`}
              >
                {/* Spotlight Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                     style={{ background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.04), transparent 40%)` }} 
                />
                
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${service.gradient} border border-white/10`}>
                      <service.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className={`font-bold text-lg ${activeService === index ? "text-white" : "text-zinc-400 group-hover:text-white"} transition-colors`}>
                      {service.title}
                    </span>
                  </div>
                  {activeService === index && (
                    <motion.div layoutId="activeArrow">
                      <ChevronRight className="w-5 h-5 text-indigo-400" />
                    </motion.div>
                  )}
                </div>
              </button>
            ))}
            
            <div className="pt-8 hidden lg:block">
              <Link to="/solutions" className="px-6 py-3 rounded-full border border-white/10 hover:border-white/20 bg-white/5 text-white text-sm font-medium transition-colors flex items-center gap-2 w-fit group">
                View Full Capabilities
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Main Display Area */}
          <div className="lg:col-span-8 h-[600px] relative rounded-3xl border border-white/10 bg-[#0F0F13] overflow-hidden shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <ImageWithFallback 
                    src={SERVICES[activeService].image} 
                    alt={SERVICES[activeService].title}
                    className="w-full h-full object-cover opacity-25 scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] via-[#0F0F13]/90 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F13] via-[#0F0F13]/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
                  <div className="min-h-full p-8 md:p-12 flex flex-col justify-end">
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="relative z-10"
                    >
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 text-xs font-medium text-indigo-300`}>
                        <Sparkles className="w-3 h-3" />
                        <span>Intelligence Solution</span>
                      </div>
                      
                      <h3 className="text-4xl font-bold text-white mb-6 leading-tight">{SERVICES[activeService].title}</h3>
                      <p className="text-xl text-zinc-300 font-light leading-relaxed mb-10 max-w-2xl">
                        {SERVICES[activeService].description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {SERVICES[activeService].features.map((feature, idx) => (
                          <motion.div 
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (idx * 0.1) }}
                            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors group/feature"
                          >
                            <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0 group-hover/feature:bg-indigo-500/30 transition-colors">
                              <Check className="w-4 h-4 text-indigo-400" />
                            </div>
                            <span className="text-white/90 text-sm font-medium">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};