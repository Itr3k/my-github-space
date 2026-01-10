import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle } from 'lucide-react';

const STALL_REASONS = [
  "AI is introduced without ownership, governance, or accountability",
  "Tools are deployed faster than workflows can absorb them",
  "Leadership lacks visibility into risk, impact, and ROI"
];

export const WhyAIStalls = () => {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-amber-300 font-medium">Our Point of View</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-12 tracking-tight">
            Why Most AI Initiatives Stall
          </h2>

          <div className="space-y-6 mb-12">
            {STALL_REASONS.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 text-left"
              >
                <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                  <span className="text-amber-400 font-bold">{index + 1}</span>
                </div>
                <p className="text-lg text-zinc-200">{reason}</p>
              </motion.div>
            ))}
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
            <p className="text-xl md:text-2xl text-white font-medium">
              We fix this by treating AI as an <span className="text-indigo-300">operating model</span>—not a feature.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
