import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, ArrowRight, Send, Clock, CheckCircle2, Twitter, Linkedin, Github, Youtube } from 'lucide-react';

export const BookConsultation = () => {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-medium mb-8">
               <Mail className="w-3 h-3" />
               Get in Touch
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Let's Build Something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">Extraordinary Together</span>
            </h1>
            
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Serving businesses across Los Angeles and Southern California. Whether you're ready to start a project or exploring AI strategy, we're here to help.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-8 md:p-10 rounded-3xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/10 relative overflow-hidden"
            >
               {/* Form Header */}
               <h3 className="text-2xl font-bold text-white mb-8">Send us a message</h3>
               
               <form className="space-y-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">First Name</label>
                      <input 
                        type="text" 
                        placeholder="John"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Last Name</label>
                      <input 
                        type="text" 
                        placeholder="Doe"
                        className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all" 
                      />
                    </div>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Email</label>
                    <input 
                      type="email" 
                      placeholder="john@company.com"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all" 
                    />
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Company</label>
                    <input 
                      type="text" 
                      placeholder="Your Company"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all" 
                    />
                 </div>

                 <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Area of Interest</label>
                    <div className="relative">
                      <select defaultValue="" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all appearance-none">
                        <option value="" disabled>What solution interests you?</option>
                        <option value="strategy" className="bg-[#0A0A0F]">AI Strategy & Consulting</option>
                        <option value="voice" className="bg-[#0A0A0F]">Voice AI Agents</option>
                        <option value="workflow" className="bg-[#0A0A0F]">Workflow Automation</option>
                        <option value="custom" className="bg-[#0A0A0F]">Custom Development</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                 </div>
                 
                 <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Message</label>
                    <textarea 
                      rows={5} 
                      placeholder="Tell us about your project..."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all resize-none" 
                    />
                 </div>
                 
                 <button type="button" className="w-full py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]">
                   Send Message
                   <Send className="w-4 h-4" />
                 </button>

                 <div className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="w-4 h-4 mt-0.5 text-zinc-500">🔒</div>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      Your privacy matters. We will only use your contact information to respond to your inquiry. We never share your data with third parties.
                    </p>
                 </div>
               </form>
            </motion.div>
          </div>

          {/* Right Column: Info Cards */}
          <div className="space-y-6">
            
            {/* Contact Info Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-3xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/10"
            >
               <h3 className="text-lg font-bold text-white mb-6">Contact Information</h3>
               <div className="space-y-6">
                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                       <Mail className="w-4 h-4 text-zinc-300" />
                     </div>
                     <div>
                       <div className="text-xs text-zinc-500 font-medium mb-0.5">Email</div>
                       <a href="mailto:korra@elevatedai.co" className="text-sm text-white hover:text-indigo-400 transition-colors">korra@elevatedai.co</a>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                       <Phone className="w-4 h-4 text-zinc-300" />
                     </div>
                     <div>
                       <div className="text-xs text-zinc-500 font-medium mb-0.5">Phone</div>
                       <a href="tel:1-424-484-3844" className="text-sm text-white hover:text-indigo-400 transition-colors">1-424-484-3844</a>
                     </div>
                  </div>

                  <div className="flex items-start gap-4">
                     <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                       <MapPin className="w-4 h-4 text-zinc-300" />
                     </div>
                     <div>
                       <div className="text-xs text-zinc-500 font-medium mb-0.5">Location</div>
                       <div className="text-sm text-white">Los Angeles, California</div>
                       <div className="text-xs text-zinc-500 mt-0.5">Serving Southern California</div>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* Office Hours Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="p-8 rounded-3xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/10"
            >
               <h3 className="text-lg font-bold text-white mb-6">Office Hours</h3>
               <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Monday - Friday</span>
                    <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Saturday</span>
                    <span className="text-white font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-400">Sunday</span>
                    <span className="text-zinc-500 font-medium">Closed</span>
                  </div>
                  
                  <div className="pt-6 border-t border-white/5 mt-6 flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs text-zinc-300 font-medium">Currently available</span>
                  </div>
               </div>
            </motion.div>

            {/* Follow Us Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="p-8 rounded-3xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/10"
            >
               <h3 className="text-lg font-bold text-white mb-6">Follow Us</h3>
               <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all border border-white/5">
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all border border-white/5">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all border border-white/5">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 hover:bg-white hover:text-black transition-all border border-white/5">
                    <Youtube className="w-4 h-4" />
                  </a>
               </div>
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
};
