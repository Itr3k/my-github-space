import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrainCircuit, AudioWaveform, Network, ArrowRight, ChevronRight, Shield, AlertTriangle, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';

const SERVICES = [
  {
    icon: BrainCircuit,
    title: "Strategy & Consulting",
    failureMode: "AI pilots stall or fail to scale because there's no roadmap, no ownership, and no connection to business outcomes.",
    whyTeamsStall: "Internal teams are stretched thin. AI strategy requires dedicated focus, cross-functional alignment, and external perspective that internal politics often block.",
    intervention: "We build your AI operating model from the ground up—with clear ownership, prioritized use cases, and a 12-18 month implementation roadmap.",
    outcomes: "Within 90 days: Clear AI strategy document, prioritized pilot projects, executive alignment, and measurable ROI targets.",
    gradient: "from-blue-500/20 to-indigo-500/20",
    image: "https://images.unsplash.com/photo-1664526937033-fe2c11f1be25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGJsdWVwcmludCUyMG5ldHdvcmslMjB0ZWNobm9sb2d5JTIwZGFya3xlbnwxfHx8fDE3NjM2NjA3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "/ai-transformation"
  },
  {
    icon: AudioWaveform,
    title: "Voice AI Systems",
    failureMode: "Customer calls go unanswered or get stuck in IVR hell. Manual scheduling creates bottlenecks. Support teams are overwhelmed with routine inquiries.",
    whyTeamsStall: "Building voice AI requires specialized expertise in speech synthesis, NLP, and telephony integrations that most teams don't have—and can't hire fast enough.",
    intervention: "We deploy enterprise-grade voice agents that handle calls 24/7, book appointments, qualify leads, and integrate with your CRM and scheduling systems.",
    outcomes: "Within 30 days: Live voice agents handling inbound calls, 90% reduction in hold times, and seamless CRM integration.",
    gradient: "from-purple-500/20 to-pink-500/20",
    image: "https://images.unsplash.com/photo-1759771963975-8a4885446f1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHNvdW5kJTIwd2F2ZSUyMHZpc3VhbGl6YXRpb24lMjBkYXJrJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjM2NjA3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "/voice-ai"
  },
  {
    icon: Network,
    title: "Workflow Automation",
    failureMode: "Manual data entry creates errors. Handoffs between systems break down. Teams spend hours on tasks that should take minutes.",
    whyTeamsStall: "Tool sprawl creates silos. IT backlog is months long. Off-the-shelf automation tools require more customization than advertised.",
    intervention: "We connect your systems with intelligent automation that eliminates manual handoffs, processes documents, and orchestrates workflows across your entire tech stack.",
    outcomes: "Within 60 days: 40+ hours saved weekly, 80% reduction in manual errors, and automated workflows handling routine processes.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    image: "https://images.unsplash.com/photo-1760274479255-b8bf81991ef2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRpZ2l0YWwlMjBmbG93JTIwY29ubmVjdGlvbiUyMGxpbmVzJTIwZGFyayUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYzNjYwNzU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "/ai-automation"
  },
  {
    icon: Shield,
    title: "AI Governance",
    failureMode: "AI deployments create compliance gaps. Audit requests trigger panic. Leadership can't answer basic questions about AI risk exposure.",
    whyTeamsStall: "Governance feels like bureaucracy. Compliance teams lack AI expertise. No one owns the problem until regulators come knocking.",
    intervention: "We create governance frameworks that prepare you for TrustArc certification—with policies, training, monitoring, and audit-ready documentation.",
    outcomes: "Within 90 days: Complete governance framework, TrustArc certification readiness, and board-ready risk documentation.",
    gradient: "from-amber-500/20 to-orange-500/20",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbXBsaWFuY2UlMjBkb2N1bWVudHN8ZW58MXx8fHwxNzYzNzY2MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    link: "/ai-governance"
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
              How We Help
            </h2>
            <p className="text-zinc-400 text-lg font-light max-w-xl">
              We don't just advise—we diagnose the failure mode, explain why it persists, and fix it with measurable outcomes in 30-90 days.
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

          {/* Main Display Area - Failure Mode Pattern */}
          <div className="lg:col-span-8 min-h-[700px] relative rounded-3xl border border-white/10 bg-[#0F0F13] overflow-hidden shadow-2xl">
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
                    className="w-full h-full object-cover opacity-15 scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F13] via-[#0F0F13]/95 to-[#0F0F13]/80" />
                </div>

                {/* Content - Failure Mode Pattern */}
                <div className="absolute inset-0 overflow-y-auto custom-scrollbar">
                  <div className="min-h-full p-8 md:p-10">
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="relative z-10 space-y-8"
                    >
                      <h3 className="text-3xl font-bold text-white">{SERVICES[activeService].title}</h3>
                      
                      {/* The Failure Mode */}
                      <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                        <div className="flex items-center gap-3 mb-3">
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                          <h4 className="text-sm font-bold text-red-400 uppercase tracking-wider">What Usually Goes Wrong</h4>
                        </div>
                        <p className="text-zinc-300 leading-relaxed">{SERVICES[activeService].failureMode}</p>
                      </div>

                      {/* Why Internal Teams Stall */}
                      <div className="p-6 rounded-2xl bg-amber-500/5 border border-amber-500/20">
                        <div className="flex items-center gap-3 mb-3">
                          <Users className="w-5 h-5 text-amber-400" />
                          <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider">Why This Doesn't Get Fixed Internally</h4>
                        </div>
                        <p className="text-zinc-300 leading-relaxed">{SERVICES[activeService].whyTeamsStall}</p>
                      </div>

                      {/* Our Intervention */}
                      <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20">
                        <div className="flex items-center gap-3 mb-3">
                          {React.createElement(SERVICES[activeService].icon, { className: "w-5 h-5 text-indigo-400" })}
                          <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider">How We Intervene</h4>
                        </div>
                        <p className="text-zinc-300 leading-relaxed">{SERVICES[activeService].intervention}</p>
                      </div>

                      {/* 30-90 Day Outcome */}
                      <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                        <div className="flex items-center gap-3 mb-3">
                          <Clock className="w-5 h-5 text-emerald-400" />
                          <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider">What Changes in 30-90 Days</h4>
                        </div>
                        <p className="text-zinc-300 leading-relaxed">{SERVICES[activeService].outcomes}</p>
                      </div>

                      {/* CTA */}
                      <Link 
                        to={SERVICES[activeService].link}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors"
                      >
                        See if this is the right entry point
                        <ArrowRight className="w-4 h-4" />
                      </Link>
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
