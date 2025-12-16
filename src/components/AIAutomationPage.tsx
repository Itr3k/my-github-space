import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Workflow, 
  Zap, 
  Database, 
  FileText, 
  Mail, 
  Calendar,
  TrendingUp,
  Clock,
  DollarSign,
  Settings,
  ArrowRight,
  CheckCircle2,
  Repeat,
  Bot,
  Link2,
  BarChart3
} from 'lucide-react';

const AUTOMATION_TYPES = [
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "End-to-end process automation that connects your tools and eliminates manual handoffs between systems.",
    capabilities: ["Multi-step workflows", "Conditional logic", "Error handling", "Real-time triggers"]
  },
  {
    icon: FileText,
    title: "Document Processing",
    description: "AI-powered extraction and processing of invoices, contracts, forms, and unstructured documents.",
    capabilities: ["OCR with AI understanding", "Data extraction", "Auto-classification", "Compliance checks"]
  },
  {
    icon: Mail,
    title: "Communication Automation",
    description: "Intelligent email triage, response drafting, and customer communication workflows.",
    capabilities: ["Email classification", "Auto-responses", "Sentiment routing", "Follow-up scheduling"]
  },
  {
    icon: Database,
    title: "Data Orchestration",
    description: "Sync data across your tech stack with intelligent transformation and validation.",
    capabilities: ["Real-time sync", "Data transformation", "Deduplication", "Quality checks"]
  }
];

const INTEGRATIONS = [
  "Salesforce", "HubSpot", "Slack", "Microsoft 365", "Google Workspace", 
  "Notion", "Airtable", "Zapier", "n8n", "Make", "NetSuite", "QuickBooks"
];

const ROI_METRICS = [
  { value: "40+", label: "Hours Saved Weekly", icon: Clock },
  { value: "80%", label: "Error Reduction", icon: TrendingUp },
  { value: "3-6mo", label: "Typical ROI Payback", icon: DollarSign },
  { value: "10x", label: "Processing Speed", icon: Zap }
];

export const AIAutomationPage = () => {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "AI Automation Services",
    "provider": {
      "@type": "Organization",
      "name": "Elevated AI"
    },
    "description": "Enterprise AI automation services including workflow automation, document processing, and intelligent process automation.",
    "areaServed": "US",
    "serviceType": "AI Automation Consulting"
  };

  return (
    <>
      <Helmet>
        <title>AI Automation Services | Workflow Automation & Process Automation | Elevated AI</title>
        <meta name="description" content="Enterprise AI automation services: workflow automation, document processing, data orchestration. Save 40+ hours weekly with intelligent process automation." />
        <meta name="keywords" content="AI automation services, AI workflow automation, enterprise AI automation, AI process automation, AI systems integration, n8n AI automation, AI implementation services" />
        <link rel="canonical" href="https://elevatedai.co/ai-automation" />
        
        <meta property="og:title" content="AI Automation Services | Elevated AI" />
        <meta property="og:description" content="Enterprise AI automation: workflow automation, document processing, data orchestration. Save 40+ hours weekly." />
        <meta property="og:url" content="https://elevatedai.co/ai-automation" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Automation Services | Elevated AI" />
        <meta name="twitter:description" content="Enterprise AI automation services with workflow automation and intelligent process automation." />
        
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-medium text-orange-400 mb-8">
                <Workflow className="w-3 h-3" />
                Enterprise Automation
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                Automate Everything
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400">
                  That Slows You Down
                </span>
              </h1>
              
              <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
                Eliminate manual processes with intelligent AI automation. Connect your tools, automate workflows, and reclaim 40+ hours weekly for strategic work.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/book-consultation"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all"
                >
                  Get Automation Assessment
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link 
                  to="/resources"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
                >
                  View ROI Calculator
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ROI Stats */}
        <section className="border-y border-white/5 bg-white/[0.02] py-12 mb-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {ROI_METRICS.map((metric, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mx-auto mb-3">
                    <metric.icon className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-sm text-zinc-500">{metric.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Automation Types */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Automation Solutions</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              From simple triggers to complex multi-system orchestration, we build automation that scales with your business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AUTOMATION_TYPES.map((type, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-orange-500/30 transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6 group-hover:bg-orange-500/20 transition-colors">
                  <type.icon className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{type.title}</h3>
                <p className="text-zinc-400 mb-6">{type.description}</p>
                <div className="grid grid-cols-2 gap-2">
                  {type.capabilities.map((cap, j) => (
                    <div key={j} className="flex items-center gap-2 text-sm text-zinc-300">
                      <CheckCircle2 className="w-3 h-3 text-orange-500 shrink-0" />
                      {cap}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Automation Process</h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              A proven methodology for identifying, implementing, and optimizing automation opportunities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Discovery", desc: "Map current processes and identify automation opportunities" },
              { step: "02", title: "Design", desc: "Architect automated workflows with error handling and monitoring" },
              { step: "03", title: "Build", desc: "Implement automations using n8n, Make, or custom solutions" },
              { step: "04", title: "Optimize", desc: "Monitor performance and continuously improve efficiency" }
            ].map((phase, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-orange-500/10 mb-4">{phase.step}</div>
                <h3 className="text-xl font-bold text-white mb-2">{phase.title}</h3>
                <p className="text-zinc-500 text-sm">{phase.desc}</p>
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 translate-x-1/2">
                    <ArrowRight className="w-6 h-6 text-zinc-700" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Integrations */}
        <section className="max-w-7xl mx-auto px-6 mb-24">
          <div className="p-10 rounded-3xl bg-gradient-to-br from-orange-950/30 to-amber-950/30 border border-orange-900/30">
            <div className="text-center mb-8">
              <Link2 className="w-10 h-10 text-orange-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">Connect Your Entire Stack</h2>
              <p className="text-zinc-400">We integrate with 500+ applications and custom APIs</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {INTEGRATIONS.map((integration, i) => (
                <span 
                  key={i} 
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300"
                >
                  {integration}
                </span>
              ))}
              <span className="px-4 py-2 rounded-full bg-orange-500/20 border border-orange-500/30 text-sm text-orange-300">
                + 500 more
              </span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="text-center p-12 rounded-3xl bg-gradient-to-r from-orange-900/20 to-amber-900/20 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-orange-500/20 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10">
              <Settings className="w-12 h-12 text-orange-400 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Automate?</h2>
              <p className="text-zinc-400 max-w-xl mx-auto mb-8">
                Get a free automation assessment to identify your highest-impact opportunities and calculate potential ROI.
              </p>
              <Link 
                to="/book-consultation"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-all"
              >
                Get Free Assessment
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AIAutomationPage;
