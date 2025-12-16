import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mic, 
  MessageSquare, 
  Headphones, 
  Clock, 
  TrendingUp,
  Zap,
  Users,
  Building2,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Bot,
  PhoneCall,
  Calendar,
  Globe
} from 'lucide-react';

const USE_CASES = [
  {
    icon: PhoneCall,
    title: "AI Phone Agents",
    description: "24/7 intelligent phone answering that handles inquiries, qualifies leads, and routes calls with human-like conversation.",
    benefits: ["Reduce wait times by 90%", "Handle unlimited concurrent calls", "Qualify leads automatically"]
  },
  {
    icon: Calendar,
    title: "Appointment Scheduling",
    description: "Voice AI that books, confirms, and manages appointments naturally through phone conversations.",
    benefits: ["Zero scheduling conflicts", "Automatic reminders", "Multi-calendar sync"]
  },
  {
    icon: Headphones,
    title: "Customer Service Automation",
    description: "Resolve customer inquiries instantly with intelligent voice agents that understand context and emotion.",
    benefits: ["80% first-call resolution", "Sentiment-aware responses", "Seamless escalation"]
  },
  {
    icon: Users,
    title: "Sales Qualification",
    description: "AI voice agents that engage prospects, qualify opportunities, and schedule demos with your sales team.",
    benefits: ["3x more qualified leads", "Consistent qualification criteria", "Real-time CRM updates"]
  }
];

const FEATURES = [
  { icon: Zap, title: "Sub-200ms Latency", description: "Real-time voice synthesis for natural conversations" },
  { icon: Globe, title: "30+ Languages", description: "Deploy globally with native-quality voice AI" },
  { icon: ShieldCheck, title: "Enterprise Security", description: "SOC 2 compliant with end-to-end encryption" },
  { icon: Bot, title: "Custom Voice Cloning", description: "Create branded AI voices for your business" }
];

const INDUSTRIES = [
  { name: "Healthcare", use: "Patient scheduling & follow-ups" },
  { name: "Financial Services", use: "Account inquiries & verification" },
  { name: "Real Estate", use: "Property inquiries & scheduling" },
  { name: "Insurance", use: "Claims intake & policy questions" },
  { name: "E-commerce", use: "Order status & returns" },
  { name: "Professional Services", use: "Consultation booking" }
];

export const VoiceAIPage = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Voice AI Solutions",
    "provider": {
      "@type": "Organization",
      "name": "Elevated AI"
    },
    "description": "Enterprise voice AI solutions including AI phone agents, conversational AI, and voice automation for business.",
    "areaServed": "US",
    "serviceType": "Voice AI Consulting"
  };

  return (
    <>
      <Helmet>
        <title>Voice AI Solutions | AI Phone Agents & Conversational AI | Elevated AI</title>
        <meta name="description" content="Enterprise voice AI solutions: AI phone agents, conversational AI for business, voice automation. Reduce call center costs by 60% with 24/7 intelligent voice agents." />
        <meta name="keywords" content="Voice AI solutions, AI voice agents, conversational AI for business, enterprise voice AI, AI phone agents, AI call automation, AI customer service voice agent, voice AI for call centers" />
        <link rel="canonical" href="https://elevatedai.co/voice-ai" />
        
        <meta property="og:title" content="Voice AI Solutions | Elevated AI" />
        <meta property="og:description" content="Enterprise voice AI solutions: AI phone agents, conversational AI, voice automation. 24/7 intelligent voice agents." />
        <meta property="og:url" content="https://elevatedai.co/voice-ai" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Voice AI Solutions | Elevated AI" />
        <meta name="twitter:description" content="Enterprise voice AI solutions with AI phone agents and conversational AI for business." />
        
        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen pt-32 pb-24 bg-[#050508]">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-400 mb-8">
                <Mic className="w-3 h-3" />
                Enterprise Voice AI
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                Voice AI That Sounds
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
                  Remarkably Human
                </span>
              </h1>
              
              <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
                Deploy intelligent AI phone agents that handle customer calls 24/7. Reduce call center costs by 60% while delivering exceptional customer experiences.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/book-consultation"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all"
                >
                  Schedule Voice AI Demo
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/case-studies"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
                >
                  View Case Studies
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Banner */}
        <section className="border-y border-white/5 bg-white/[0.02] py-12 mb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "60%", label: "Cost Reduction" },
                { value: "24/7", label: "Availability" },
                { value: "<200ms", label: "Response Time" },
                { value: "95%", label: "Customer Satisfaction" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-zinc-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Voice AI Use Cases</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              From customer service to sales qualification, our voice AI solutions handle complex conversations naturally.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {USE_CASES.map((useCase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-emerald-500/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                  <useCase.icon className="w-7 h-7 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{useCase.title}</h3>
                <p className="text-zinc-400 mb-6">{useCase.description}</p>
                <ul className="space-y-2">
                  {useCase.benefits.map((benefit, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Technology Features */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Enterprise-Grade Technology</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Built on ElevenLabs and leading voice AI infrastructure for unmatched quality and reliability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-white/5 border border-white/10 text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-500 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Industries */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-emerald-950/30 to-cyan-950/30 border border-emerald-900/30">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Industries We Serve</h2>
              <p className="text-zinc-400">Voice AI solutions tailored for your industry</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {INDUSTRIES.map((industry, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-white font-semibold mb-1">{industry.name}</div>
                  <div className="text-zinc-500 text-sm">{industry.use}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="text-center p-12 rounded-3xl bg-gradient-to-r from-emerald-900/20 to-cyan-900/20 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-emerald-500/20 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              <Phone className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Customer Experience?</h2>
              <p className="text-zinc-400 max-w-xl mx-auto mb-8">
                Schedule a demo to see how our voice AI can handle your specific use case with remarkable human-like conversation.
              </p>
              <Link 
                to="/book-consultation"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all"
              >
                Book Voice AI Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default VoiceAIPage;
