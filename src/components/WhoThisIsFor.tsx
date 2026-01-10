import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle } from 'lucide-react';

const THIS_IS_FOR = [
  "Are already using (or planning to use) AI in real workflows",
  "Have compliance, legal, or reputational exposure",
  "Are feeling internal friction, tool sprawl, or stalled AI initiatives",
  "Need executive-level clarity, not more tools"
];

const THIS_IS_NOT_FOR = [
  "Want \"AI prompts\" or quick hacks",
  "Are shopping purely on price",
  "Have no internal owner or decision authority",
  "Expect AI to work without operational change"
];

export const WhoThisIsFor = () => {
  return (
    <section className="py-24 px-6 relative z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {/* Left Column - This Is For */}
          <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-emerald-500/5 to-transparent border border-emerald-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">This Is For</h2>
            </div>
            
            <p className="text-zinc-400 mb-6">This is for organizations that:</p>
            
            <ul className="space-y-4">
              {THIS_IS_FOR.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="text-zinc-200">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - This Is Not For */}
          <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-red-500/5 to-transparent border border-red-500/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold text-white">This Is Not For</h2>
            </div>
            
            <p className="text-zinc-400 mb-6">This is not for organizations that:</p>
            
            <ul className="space-y-4">
              {THIS_IS_NOT_FOR.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                  <span className="text-zinc-400">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
