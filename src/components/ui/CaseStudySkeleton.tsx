import { motion } from 'motion/react';

export const CaseStudySkeleton = () => {
  return (
    <div className="relative h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/50">
      {/* Shimmer overlay */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      {/* Top badge skeleton */}
      <div className="absolute top-6 left-6 z-10">
        <div className="h-6 w-24 rounded-full bg-white/10" />
      </div>
      
      {/* Content skeleton */}
      <div className="absolute inset-0 flex flex-col justify-end p-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 rounded-full bg-white/20" />
            <div className="h-3 w-20 rounded bg-white/10" />
          </div>
          <div className="h-8 w-3/4 rounded bg-white/10" />
          <div className="h-8 w-1/2 rounded bg-white/10" />
          <div className="h-4 w-32 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
};

export const CaseStudyGridSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          <CaseStudySkeleton />
        </motion.div>
      ))}
    </div>
  );
};
