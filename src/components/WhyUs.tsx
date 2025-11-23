
import React from 'react';
import { motion } from 'motion/react';
import { BriefcaseBusiness, Shield, Database, AudioLines, Boxes, Globe } from 'lucide-react';

const REASONS = [
  {
    icon: BriefcaseBusiness,
    title: "20+ Years",
    subtitle: "Enterprise IT Experience",
    description: "Future-proof IT leadership across media, entertainment, and tech giants. We bring deep strategic insight to modern execution."
  },
  {
    icon: Shield,
    title: "Certified",
    subtitle: "Apple Certified Trainer",
    description: "Official Apple certification in training and leadership. Deep understanding of enterprise technology ecosystems and user experience."
  },
  {
    icon: Database,
    title: "$750M+",
    subtitle: "Managed Infrastructure",
    description: "Managed critical broadcast security regarding global olympic events. Proven ability to handle mission-critical, high-volume data systems."
  },
  {
    icon: AudioLines,
    title: "Expert",
    subtitle: "Voice AI Mastery",
    description: "Dedicated to human-like and advanced fluid AI voice interaction expertise. Specialized in ElevenLabs, Retell AI, and custom LLM integrations."
  },
  {
    icon: Boxes,
    title: "Multi-Platform",
    subtitle: "Cutting-Edge AI Stack",
    description: "Expertise in OpenAI, Anthropic, Midjourney, n8n, Make, and LangChain. We select the best models and tools for your specific use case."
  },
  {
    icon: Globe,
    title: "Multi-Industry",
    subtitle: "Diverse Industry Experience",
    description: "Entertainment, Manufacturing, SMB, and Logistics expertise. We understand different business contexts and adapt solutions accordingly."
  }
];

export const WhyUs = () => {
  return (
    <section className="py-24 px-6 bg-[#0A0A0F] relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Why Elevated AI?
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light">
            In a business world crowded with newly minted experts, trust an established specialist with real-world enterprise track record.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-colors group"
            >
              <div className="mb-6">
                <reason.icon className="w-10 h-10 text-indigo-400 stroke-1" />
              </div>
              
              <div className="mb-2">
                <span className="text-indigo-400 font-medium tracking-wider uppercase text-xs block mb-2">{reason.title}</span>
                <h3 className="text-xl font-semibold text-white tracking-wide">{reason.subtitle}</h3>
              </div>
              
              <p className="text-zinc-400 text-sm leading-relaxed mt-4 font-light tracking-wide">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
