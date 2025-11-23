
import React from 'react';
import { motion } from 'motion/react';

const STATS = [
  { value: "20+", label: "Years AI Enterprise Experience" },
  { value: "70%", label: "Avg. Cost Reduction" },
  { value: "Fortune 500", label: "Client Caliber" },
  { value: "24/7", label: "AI Operations" },
];

export const TrustBar = () => {
  return (
    <section className="py-12 border-y border-white/5 bg-[#0A0A0F] relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-x-0 md:divide-x divide-white/10">
          {STATS.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center px-4"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-wider">{stat.value}</h3>
              <p className="text-xs md:text-sm text-zinc-500 uppercase tracking-widest font-mono">{stat.label.replace(/AI/g, 'IT')}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
