
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const STEPS = [
  {
    number: "01",
    title: "AI Audit & Discovery",
    duration: "1 Week",
    description: "Comprehensive assessment of your current systems, workflows, and data readiness. We identify high-impact automation opportunities and define success metrics."
  },
  {
    number: "02",
    title: "Strategic Roadmap",
    duration: "1 Week",
    description: "Detailed implementation plan with phased approach. We propose technology stack recommendations and risk mitigation strategy."
  },
  {
    number: "03",
    title: "Proof of Concept",
    duration: "2 Weeks",
    description: "Build and validate critical workflows before major investment. Fast iterations to refine approach and demonstrate value with real data."
  },
  {
    number: "04",
    title: "Implementation & Integration",
    duration: "4-8 Weeks",
    description: "Production deployment with comprehensive testing, user training, and documentation. Seamless integration with existing systems and workflows."
  },
  {
    number: "05",
    title: "Optimization & Handoff",
    duration: "Ongoing",
    description: "Ongoing performance tuning and gradual enhancement. We help engage in technical transfer setup to ensuring success rates."
  }
];

export const Methodology = () => {
  return (
    <section id="methodology" className="py-24 px-6 bg-[#0A0A0F] relative z-10 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        
        {/* Left Side - Sticky Content */}
        <div className="lg:sticky lg:top-32 self-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
              Our Methodology
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-md">
              A structured, proven approach that minimizes risk and maximizes value. We don't just build solutions—we partner with you through every phase, from discovery to optimization.
            </p>
            <p className="text-zinc-500 text-sm mb-8 max-w-md">
              This standard follows our agile-based, 5-phase methodology to ensure transparency, predictability, and measurable outcomes at each stage.
            </p>
            
            <Link to="/contact" className="w-fit px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-medium transition-all shadow-[0_0_30px_-10px_rgba(37,99,235,0.5)] flex items-center gap-2 group">
              Schedule a Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Right Side - Timeline */}
        <div className="relative pl-8 border-l border-white/10 space-y-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] top-0 flex items-center justify-center w-5 h-5 rounded-full bg-[#0A0A0F] border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
              </div>

              {/* Number */}
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm mb-4 shadow-lg shadow-blue-900/20">
                {step.number}
              </div>

              {/* Content */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
                    {step.duration}
                  </span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-lg">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
