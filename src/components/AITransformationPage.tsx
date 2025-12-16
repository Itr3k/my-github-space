import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Rocket, 
  ArrowRight, 
  Search, 
  Bot, 
  Cog, 
  Layers,
  Users,
  BarChart3,
  Headphones,
  Briefcase,
  ShoppingCart,
  FileText,
  Map,
  Workflow,
  LayoutDashboard,
  FileCheck,
  Clock,
  TrendingUp,
  Shield,
  Zap,
  Target,
  CheckCircle2
} from 'lucide-react';

const AITransformationPage = () => {
  const transformationPhases = [
    {
      step: 1,
      icon: Search,
      title: "Discovery & Audit",
      description: "Comprehensive on-site discovery, documentation analysis, and end-to-end workflow mapping to identify AI opportunities.",
      deliverables: ["AI Opportunity Matrix", "Workflow Documentation", "ROI Analysis"]
    },
    {
      step: 2,
      icon: Bot,
      title: "Internal AI Systems",
      description: "Deploy RAG-based knowledge assistants, workflow automations, and documentation tools that transform daily operations.",
      deliverables: ["Knowledge Assistants", "Process Automation", "Documentation Tools"]
    },
    {
      step: 3,
      icon: Cog,
      title: "Operations Automation",
      description: "Implement production visibility dashboards, scheduling assistance, quality insights, and seamless system integrations.",
      deliverables: ["Real-time Dashboards", "Automated Workflows", "System Integrations"]
    },
    {
      step: 4,
      icon: Layers,
      title: "Integration & Optimization",
      description: "Connect digital touchpoints, establish continuous improvement cycles, and optimize for long-term scalability.",
      deliverables: ["Performance Monitoring", "Continuous Optimization", "Scale Planning"]
    }
  ];

  const roleImpacts = [
    {
      icon: Users,
      role: "Technical Teams",
      before: "Hours spent on documentation and process questions",
      after: "Minutes with instant AI-powered answers and automated documentation"
    },
    {
      icon: BarChart3,
      role: "Operations & Planning",
      before: "Manual dashboard creation and reactive problem-solving",
      after: "Automatic dashboards, proactive alerts, and bottleneck identification"
    },
    {
      icon: Headphones,
      role: "Customer Service",
      before: "Routine inquiries consuming valuable time",
      after: "Instant, accurate status updates—focus on complex customer needs"
    },
    {
      icon: Briefcase,
      role: "Leadership",
      before: "Data gathering and report compilation",
      after: "Automated briefings and data-driven strategic decision making"
    },
    {
      icon: ShoppingCart,
      role: "Procurement",
      before: "Manual supplier follow-ups and tracking",
      after: "Automated communications—focus on strategic sourcing"
    }
  ];

  const keyDeliverables = [
    { icon: Target, title: "AI Opportunity Matrix", description: "Scored by ROI, complexity, and strategic value" },
    { icon: Map, title: "12-18 Month Roadmap", description: "Phased implementation with clear milestones" },
    { icon: Bot, title: "Custom Knowledge Systems", description: "RAG-based assistants trained on your data" },
    { icon: Workflow, title: "Automation Library", description: "Reusable workflow automations" },
    { icon: LayoutDashboard, title: "Visibility Dashboards", description: "Real-time operational insights" },
    { icon: FileCheck, title: "Documentation Templates", description: "AI-powered document generation" }
  ];

  const expectedOutcomes = [
    "Significant reduction in manual workload across departments",
    "Dramatically reduced errors in critical documentation",
    "Improved production and operational visibility",
    "Automated routine communications—humans focus on high-value work",
    "Scalable operations that support growth without proportional headcount"
  ];

  const industries = [
    "Manufacturing", "Healthcare", "Financial Services", "Insurance", 
    "Retail", "Logistics", "Professional Services", "Technology"
  ];

  return (
    <>
      <Helmet>
        <title>AI Transformation Services | Enterprise AI Implementation | Elevated AI</title>
        <meta name="description" content="Strategic AI transformation initiatives that deliver measurable operational improvements. Discovery-driven implementation, custom roadmaps, and scalable automation for any industry." />
        <meta name="keywords" content="AI transformation, enterprise AI, operational automation, AI implementation, digital transformation, AI consulting, workflow automation, business automation" />
        <link rel="canonical" href="https://elevatedai.co/ai-transformation" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Transformation Services | Enterprise AI Implementation | Elevated AI" />
        <meta property="og:description" content="Strategic AI transformation initiatives that deliver measurable operational improvements. Discovery-driven implementation, custom roadmaps, and scalable automation for any industry." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elevatedai.co/ai-transformation" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Transformation Services | Enterprise AI Implementation | Elevated AI" />
        <meta name="twitter:description" content="Strategic AI transformation initiatives that deliver measurable operational improvements. Discovery-driven implementation, custom roadmaps, and scalable automation for any industry." />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Transformation Services",
            "provider": {
              "@type": "Organization",
              "name": "Elevated AI",
              "url": "https://elevatedai.co"
            },
            "description": "Strategic AI transformation initiatives that deliver measurable operational improvements through discovery-driven implementation, custom roadmaps, and scalable automation.",
            "serviceType": "AI Consulting",
            "areaServed": "Worldwide",
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "AI Transformation Services",
              "itemListElement": [
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Discovery & Audit" }},
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Internal AI Systems" }},
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Operations Automation" }},
                { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Integration & Optimization" }}
              ]
            }
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)]" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span className="text-sm text-indigo-300">Discovery-Driven Implementation</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                AI Transformation That Drives{' '}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Real Results
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
                Strategic AI initiatives that deliver measurable operational improvements. 
                From discovery to deployment, we build scalable systems that transform how your organization works.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/book-consultation"
                  className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2"
                >
                  Book a Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="/downloads/AI_Transformation_Plan_Sample.pdf"
                  download
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Download Sample Roadmap
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What Changes Section */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What Changes Day-to-Day</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                AI transformation impacts every level of your organization—here's how different roles benefit.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roleImpacts.map((impact, index) => (
                <motion.div
                  key={impact.role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <impact.icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="font-semibold text-lg text-white">{impact.role}</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-red-400 font-medium text-sm shrink-0">Before:</span>
                      <p className="text-sm text-zinc-400">{impact.before}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 font-medium text-sm shrink-0">After:</span>
                      <p className="text-sm text-white">{impact.after}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Transformation Process */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Transformation Process</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                A proven four-phase approach that ensures successful AI adoption at scale.
              </p>
            </motion.div>

            <div className="relative">
              {/* Connection Line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent -translate-y-1/2" />
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {transformationPhases.map((phase, index) => (
                  <motion.div
                    key={phase.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 h-full hover:border-indigo-500/30 transition-colors group">
                      <div className="absolute -top-3 left-6 px-3 py-1 bg-indigo-500 rounded-full text-xs font-bold text-white">
                        Phase {phase.step}
                      </div>
                      
                      <div className="flex items-center gap-3 mb-4 mt-2">
                        <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                          <phase.icon className="w-6 h-6 text-indigo-400" />
                        </div>
                      </div>
                      
                      <h3 className="font-bold text-lg text-white mb-2">{phase.title}</h3>
                      <p className="text-sm text-zinc-400 mb-4">{phase.description}</p>
                      
                      <div className="space-y-2">
                        {phase.deliverables.map((deliverable) => (
                          <div key={deliverable} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
                            <span className="text-zinc-300">{deliverable}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Deliverables */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What You'll Receive</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Tangible deliverables that drive immediate value and long-term transformation.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {keyDeliverables.map((deliverable, index) => (
                <motion.div
                  key={deliverable.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4">
                    <deliverable.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2">{deliverable.title}</h3>
                  <p className="text-sm text-zinc-400">{deliverable.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Now */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border border-indigo-500/20 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent p-8 md:p-12"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-8 h-8 text-indigo-400" />
                  <h2 className="text-3xl md:text-4xl font-bold text-white">Why Now?</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-indigo-400 mt-1 shrink-0" />
                      <p className="text-zinc-400">Market pressures are intensifying—efficiency is no longer optional, it's survival.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-indigo-400 mt-1 shrink-0" />
                      <p className="text-zinc-400">Labor constraints require operational efficiency without proportional headcount increases.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-indigo-400 mt-1 shrink-0" />
                      <p className="text-zinc-400">First movers gain compounding advantages that become increasingly difficult to close.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-indigo-400 mt-1 shrink-0" />
                      <p className="text-zinc-400">The AI adoption window is open now—waiting means falling behind competitors who act.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Expected Outcomes */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Expected Outcomes</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Measurable improvements that compound over time.
              </p>
            </motion.div>

            <div className="max-w-3xl mx-auto">
              <div className="grid gap-4">
                {expectedOutcomes.map((outcome, index) => (
                  <motion.div
                    key={outcome}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:border-indigo-500/30 transition-colors"
                  >
                    <CheckCircle2 className="w-6 h-6 text-indigo-400 shrink-0" />
                    <p className="text-white">{outcome}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-indigo-900/10 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Who This Is For</h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                AI transformation applies across industries—if you have operations, you have opportunities.
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-8">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300 hover:border-indigo-500/30 transition-colors"
                >
                  {industry}
                </span>
              ))}
            </div>
            
            <p className="text-center text-zinc-400">
              <em>For any organization ready to transform operations through AI</em>
            </p>
          </div>
        </section>

        {/* Investment Positioning */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">A Strategic Investment</h2>
              <p className="text-lg text-zinc-400 mb-6">
                AI Transformation is a strategic investment tailored to your organization's scale, 
                complexity, and specific operational challenges.
              </p>
              <p className="text-lg text-zinc-400 mb-8">
                Every engagement begins with discovery—we scope your specific needs and create 
                a customized proposal that aligns with your goals and budget.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                Contact Us for a Customized Proposal
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-indigo-900/10 to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-10 h-10 text-indigo-400" />
              </div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Ready to Transform Your Operations?
              </h2>
              <p className="text-lg text-zinc-400 mb-8 max-w-2xl mx-auto">
                Let's discuss your unique challenges and create a customized AI transformation roadmap 
                that delivers measurable results.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/book-consultation"
                  className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2"
                >
                  Book a Consultation
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AITransformationPage;
