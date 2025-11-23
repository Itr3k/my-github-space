import React from 'react';
import { motion } from 'motion/react';

interface TechTickerProps {
  className?: string;
}

const TECH_STACK = [
  "OpenAI", "Gemini", "Lovable", "ElevenLabs", "n8n", 
  "Zapier", "Make", "Notion", "Wix", "Anthropic", 
  "Cursor", "Antigravity"
];

export const TechTicker: React.FC<TechTickerProps> = ({ className = "" }) => {
  return (
    <div className={`w-full overflow-hidden opacity-60 ${className}`}>
      <div 
        className="w-full overflow-hidden mx-auto"
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' 
        }}
      >
        <motion.div 
          className="flex items-center whitespace-nowrap w-max"
          animate={{ x: "-50%" }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 30 
          }}
        >
          {[...Array(2)].map((_, i) => (
            <React.Fragment key={i}>
              {TECH_STACK.map((tech) => (
                <span key={`${i}-${tech}`} className="text-lg md:text-xl font-bold text-white/40 hover:text-white transition-colors cursor-default mx-8 md:mx-12">
                  {tech}
                </span>
              ))}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
