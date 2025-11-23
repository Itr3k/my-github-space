import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, ChevronLeft, Calendar } from 'lucide-react';
import { SOLUTIONS } from '../data/solutions';

export const SolutionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const solution = SOLUTIONS.find(s => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!solution) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold text-white mb-4">Solution Not Found</h1>
        <p className="text-zinc-400 mb-8">The solution you are looking for does not exist.</p>
        <Link to="/solutions" className="px-6 py-3 bg-white text-black rounded-full font-bold">
          Back to Solutions
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] pb-24">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={solution.image} 
            alt={solution.title} 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050508] via-[#050508]/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-20">
          <Link to="/solutions" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Solutions
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mb-6 backdrop-blur-md">
              <solution.icon className="w-8 h-8 text-indigo-400" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              {solution.title}
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-3xl font-light leading-relaxed">
              {solution.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12 mt-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0F] border border-white/10 rounded-3xl p-8 md:p-12"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
              <p className="text-zinc-400 leading-relaxed text-lg mb-8">
                {solution.longDescription}
              </p>

              <div className="h-px bg-white/10 my-8" />

              <h3 className="text-xl font-bold text-white mb-6">Key Capabilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {solution.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                    <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                    <span className="text-zinc-300 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0A0A0F] border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <h2 className="text-2xl font-bold text-white mb-8">Why Choose This Solution?</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {solution.benefits?.map((benefit, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    <p className="text-white font-medium">{benefit}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar CTA */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-6">
              <div className="bg-[#0A0A0F] border border-white/10 rounded-3xl p-8 text-center">
                <h3 className="text-xl font-bold text-white mb-4">Ready to implement?</h3>
                <p className="text-zinc-400 text-sm mb-8">
                  Book a consultation with our engineering team to discuss how {solution.title} can transform your business.
                </p>
                <Link to="/book-consultation" className="w-full block py-3 px-6 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-colors mb-4">
                  Book Consultation
                </Link>
                <Link to="/contact" className="w-full block py-3 px-6 bg-white/5 text-white border border-white/10 rounded-full font-bold hover:bg-white/10 transition-colors">
                  Contact Sales
                </Link>
              </div>

              <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border border-indigo-500/20 rounded-3xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  <span className="font-medium text-indigo-200">Quick Implementation</span>
                </div>
                <p className="text-sm text-zinc-400">
                  Most {solution.title} projects can be deployed in 4-8 weeks with our accelerated framework.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};