
import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  noPadding?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className, 
  hoverEffect = true,
  noPadding = false,
  ...props 
}) => {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl",
        "transition-all duration-500 ease-out",
        hoverEffect && "hover:border-white/20 hover:bg-white/10 hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.3)]",
        !noPadding && "p-6",
        className
      )}
      whileHover={hoverEffect ? { scale: 1.02 } : undefined}
      {...props as any}
    >
      {/* Inner glow gradient for subtle depth */}
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
           style={{
             background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)'
           }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
