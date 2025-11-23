import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, CheckCircle2, ChevronLeft, Send, Sparkles, Terminal, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  techStack: string;
  challenges: string;
  goals: string;
  budget: string;
  timeline: string;
}

const STEPS = [
  { id: 'intro', title: 'Welcome', icon: Sparkles },
  { id: 'about', title: 'About You', icon: Terminal },
  { id: 'tech', title: 'Technology', icon: Zap },
  { id: 'goals', title: 'Goals', icon: ArrowRight },
  { id: 'review', title: 'Review', icon: CheckCircle2 },
];

export const ProjectWizard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    techStack: '',
    challenges: '',
    goals: '',
    budget: '',
    timeline: ''
  });

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Form Data:", data);
    // In a real app, this would send to Supabase Edge Function
    setIsSubmitting(false);
    alert("Brief generated! We'll be in touch shortly.");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-[#0A0A0F] border-r border-white/10 px-8 pb-8 pt-32 flex flex-col">
        <div className="mb-12">
          <div className="flex items-center gap-2 text-indigo-400 mb-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-widest">AI Project Scope</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Start Your Journey</h1>
          <p className="text-zinc-500 text-sm mt-2">
            Tell us about your organization and goals so we can build a tailored roadmap.
          </p>
        </div>

        <div className="space-y-6 relative">
          {/* Step Indicator Line */}
          <div className="absolute left-3.5 top-2 bottom-2 w-px bg-white/10" />
          
          {STEPS.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            
            return (
              <div key={step.id} className="relative flex items-center gap-4 z-10">
                <div 
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isActive ? 'bg-indigo-600 border-indigo-500 text-white' : 
                    isCompleted ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' : 
                    'bg-[#0A0A0F] border-white/10 text-zinc-600'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <step.icon className="w-4 h-4" />}
                </div>
                <span className={`text-sm font-medium transition-colors ${isActive ? 'text-white' : 'text-zinc-500'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
        
        <div className="mt-auto pt-8">
           <button onClick={() => navigate('/')} className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm">
              <ChevronLeft className="w-4 h-4" />
              Back to Home
           </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 pb-8 pt-32 md:px-16 md:pb-16 md:pt-32 overflow-y-auto flex items-center justify-center bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-fixed opacity-100">
        <div className="max-w-2xl w-full relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold mb-4">Let's assess your needs.</h2>
                  <p className="text-xl text-zinc-400 leading-relaxed">
                    We'll walk through a few questions to understand your current technology stack, challenges, and where AI can make the biggest impact.
                  </p>
                  <p className="text-zinc-500">
                    This process takes about 3 minutes and will generate a preliminary brief for our engineering team.
                  </p>
                  <div className="pt-8">
                    <button onClick={handleNext} className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold flex items-center gap-2 transition-all">
                      Begin Assessment <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold mb-6">About You</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">Full Name</label>
                      <input 
                        value={data.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="Jane Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">Work Email</label>
                      <input 
                        value={data.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="jane@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">Company Name</label>
                      <input 
                        value={data.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="Acme Inc."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">Your Role</label>
                      <input 
                        value={data.role}
                        onChange={(e) => handleChange('role', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="CTO / Product Manager"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold mb-2">Current Technology</h2>
                  <p className="text-zinc-400 mb-6">Where is your business currently at?</p>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">Existing Tech Stack</label>
                      <textarea 
                        value={data.techStack}
                        onChange={(e) => handleChange('techStack', e.target.value)}
                        className="w-full h-32 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none"
                        placeholder="e.g., AWS, React, Python, Legacy SQL databases..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">Key Challenges & Pain Points</label>
                      <textarea 
                        value={data.challenges}
                        onChange={(e) => handleChange('challenges', e.target.value)}
                        className="w-full h-32 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none"
                        placeholder="What's broken? What's too slow? Where are the bottlenecks?"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold mb-2">Project Goals</h2>
                  <p className="text-zinc-400 mb-6">What are you looking to achieve with AI?</p>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-400">Primary Objectives</label>
                      <textarea 
                        value={data.goals}
                        onChange={(e) => handleChange('goals', e.target.value)}
                        className="w-full h-32 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all resize-none"
                        placeholder="e.g., Automate customer support, Predict inventory, Analyze documents..."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-zinc-400">Estimated Budget</label>
                          <select 
                            value={data.budget}
                            onChange={(e) => handleChange('budget', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all [&>option]:bg-[#0A0A0F]"
                          >
                            <option value="">Select Range</option>
                            <option value="<50k">&lt; $50k</option>
                            <option value="50k-150k">$50k - $150k</option>
                            <option value="150k-500k">$150k - $500k</option>
                            <option value="500k+">$500k+</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-zinc-400">Target Timeline</label>
                          <select 
                            value={data.timeline}
                            onChange={(e) => handleChange('timeline', e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all [&>option]:bg-[#0A0A0F]"
                          >
                            <option value="">Select Timeline</option>
                            <option value="ASAP">ASAP (1-2 months)</option>
                            <option value="Q3">Next Quarter</option>
                            <option value="6m+">6 months+</option>
                          </select>
                        </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold mb-6">Review & Submit</h2>
                  
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 space-y-4">
                    <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5">
                        <div>
                            <span className="text-xs text-zinc-500 uppercase">Name</span>
                            <div className="text-white">{data.name || "-"}</div>
                        </div>
                        <div>
                            <span className="text-xs text-zinc-500 uppercase">Company</span>
                            <div className="text-white">{data.company || "-"}</div>
                        </div>
                    </div>
                    <div>
                        <span className="text-xs text-zinc-500 uppercase">Challenge</span>
                        <div className="text-zinc-300 text-sm mt-1">{data.challenges || "-"}</div>
                    </div>
                    <div>
                        <span className="text-xs text-zinc-500 uppercase">Goal</span>
                        <div className="text-zinc-300 text-sm mt-1">{data.goals || "-"}</div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      className="flex-1 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-900/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>Processing...</>
                      ) : (
                        <>
                          Generate Brief & Send <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                  <p className="text-center text-xs text-zinc-500">
                    This will create a confidential project brief sent to our executive team.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {currentStep > 0 && currentStep < 4 && (
            <div className="mt-12 flex justify-between items-center border-t border-white/10 pt-8">
              <button onClick={handleBack} className="text-zinc-500 hover:text-white px-4 py-2 rounded-lg transition-colors">
                Back
              </button>
              <button onClick={handleNext} className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-zinc-200 transition-colors">
                Next Step
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
