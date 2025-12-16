import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  FileText, 
  Settings, 
  Award, 
  RefreshCw,
  Building2,
  Scale,
  Globe,
  FileCheck,
  MapPin,
  Heart,
  BadgeCheck,
  TrendingUp,
  Users,
  Lock
} from 'lucide-react';

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Discovery & Assessment",
    description: "Evaluate your current AI systems, identify risks, gaps, and compliance requirements across your organization.",
    icon: Search,
  },
  {
    step: 2,
    title: "Policy Development",
    description: "Create customized governance policies, documentation, and procedures aligned with industry standards.",
    icon: FileText,
  },
  {
    step: 3,
    title: "Implementation",
    description: "Deploy governance controls, training programs, and monitoring systems across your AI infrastructure.",
    icon: Settings,
  },
  {
    step: 4,
    title: "Certification Prep",
    description: "Prepare your organization for TrustArc Responsible AI Certification with gap analysis and audit readiness.",
    icon: Award,
  },
  {
    step: 5,
    title: "Ongoing Compliance",
    description: "Continuous monitoring, annual recertification support, and policy updates as regulations evolve.",
    icon: RefreshCw,
  },
];

const COMPLIANCE_STANDARDS = [
  {
    title: "NIST AI RMF",
    description: "U.S. AI Risk Management Framework for trustworthy AI development and deployment.",
    icon: Building2,
  },
  {
    title: "OECD AI Principles",
    description: "International guidelines for responsible stewardship of trustworthy AI.",
    icon: Globe,
  },
  {
    title: "EU AI Act",
    description: "European regulation establishing requirements for high-risk AI systems.",
    icon: Scale,
  },
  {
    title: "ISO/IEC 42001",
    description: "International standard for AI Management Systems certification.",
    icon: FileCheck,
  },
  {
    title: "State Regulations",
    description: "Colorado AI Act, NYC Local Law 144, and emerging state-level requirements.",
    icon: MapPin,
  },
  {
    title: "Industry-Specific",
    description: "HIPAA, SOC 2, GDPR, and sector-specific compliance requirements.",
    icon: Heart,
  },
];

const BENEFITS = [
  {
    title: "Reduced Legal Risk",
    description: "Proactively address regulatory requirements before enforcement actions.",
    icon: Lock,
  },
  {
    title: "Stakeholder Confidence",
    description: "Board-ready documentation and third-party certification validation.",
    icon: Users,
  },
  {
    title: "Competitive Advantage",
    description: "Differentiate your organization with certified responsible AI practices.",
    icon: TrendingUp,
  },
  {
    title: "Faster Compliance",
    description: "Streamlined path to certification with expert guidance throughout.",
    icon: BadgeCheck,
  },
];

export const AIGovernancePage = () => {
  return (
    <>
      <Helmet>
        <title>AI Governance Services | TrustArc Certification Ready | Elevated AI</title>
        <meta 
          name="description" 
          content="Comprehensive AI governance frameworks that prepare your organization for TrustArc Responsible AI Certification. Risk management, compliance, and ethical AI deployment for any industry." 
        />
        <meta name="keywords" content="AI governance, TrustArc certification, responsible AI, AI compliance, NIST AI RMF, EU AI Act, AI risk management, ethical AI" />
        <link rel="canonical" href="https://elevatedai.co/ai-governance" />
        
        {/* Open Graph */}
        <meta property="og:title" content="AI Governance Services | TrustArc Certification Ready | Elevated AI" />
        <meta property="og:description" content="Comprehensive AI governance frameworks that prepare your organization for TrustArc Responsible AI Certification." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://elevatedai.co/ai-governance" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Governance Services | TrustArc Certification Ready" />
        <meta name="twitter:description" content="Comprehensive AI governance frameworks for TrustArc Responsible AI Certification." />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "AI Governance Services",
            "provider": {
              "@type": "Organization",
              "name": "Elevated AI",
              "url": "https://elevatedai.co"
            },
            "description": "Comprehensive AI governance frameworks that prepare organizations for TrustArc Responsible AI Certification, including risk management, compliance, and ethical AI deployment.",
            "serviceType": "AI Consulting",
            "areaServed": "Worldwide"
          })}
        </script>
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8">
                <Shield className="w-4 h-4 text-indigo-400" />
                <span className="text-sm text-indigo-300">TrustArc Certification Ready</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
                AI Governance That Gets You{' '}
                <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Certified
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
                Comprehensive governance frameworks designed to prepare your organization for 
                <strong className="text-white"> TrustArc Responsible AI Certification</strong>—the 
                gold standard in third-party AI accountability validation.
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
                  to="/resources"
                  className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-colors"
                >
                  Download Sample Framework
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* TrustArc Certification Callout */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden border border-indigo-500/20 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent p-8 md:p-12"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
                    <BadgeCheck className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-300">Third-Party Verified</span>
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    TrustArc Responsible AI Certification
                  </h2>
                  
                  <p className="text-zinc-400 mb-6">
                    Our governance framework is specifically designed to prepare your organization for 
                    TrustArc's Responsible AI Certification—a rigorous third-party assessment that 
                    validates your AI practices against leading global standards.
                  </p>
                  
                  <ul className="space-y-3">
                    {[
                      "Demonstrates accountability, fairness, and transparency",
                      "Aligns with NIST, OECD, and EU AI Act requirements",
                      "Provides competitive differentiation in the marketplace",
                      "Builds trust with customers, partners, and regulators"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex justify-center">
                  <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-indigo-600/30 to-purple-600/30 border border-white/10" />
                    <div className="relative z-10 text-center">
                      <Shield className="w-16 h-16 text-indigo-400 mx-auto mb-3" />
                      <p className="text-white font-bold text-lg">Certification</p>
                      <p className="text-zinc-400 text-sm">Ready</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 5-Step Process */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Our Governance Framework Process
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                A proven five-step methodology that takes you from assessment to certification-ready.
              </p>
            </motion.div>
            
            <div className="relative">
              {/* Connection Line */}
              <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent -translate-y-1/2" />
              
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                {PROCESS_STEPS.map((step, index) => (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group"
                  >
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-indigo-500 rounded-full text-xs font-bold text-white">
                      Step {step.step}
                    </div>
                    
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4 mt-2 group-hover:bg-indigo-500/20 transition-colors">
                      <step.icon className="w-6 h-6 text-indigo-400" />
                    </div>
                    
                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-zinc-400">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Compliance Standards */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Compliance Standards Covered
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Our governance framework addresses all major AI regulations and standards worldwide.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMPLIANCE_STANDARDS.map((standard, index) => (
                <motion.div
                  key={standard.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-indigo-500/30 transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4">
                    <standard.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{standard.title}</h3>
                  <p className="text-zinc-400">{standard.description}</p>
                </motion.div>
              ))}
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
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                For Any Organization Deploying AI
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Our industry-agnostic approach means we can help any organization that uses AI—regardless 
                of size, sector, or technical maturity.
              </p>
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Financial Services",
                "Healthcare",
                "Insurance",
                "Retail & E-Commerce",
                "Manufacturing",
                "Technology",
                "Legal Services",
                "Government",
                "Education",
                "Real Estate"
              ].map((industry) => (
                <span
                  key={industry}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-zinc-300"
                >
                  {industry}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Why Get Certified?
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto">
                Third-party certification provides tangible business value beyond compliance.
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {BENEFITS.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-indigo-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-zinc-400 text-sm">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sample Deliverables CTA */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 text-center"
            >
              <FileText className="w-12 h-12 text-indigo-400 mx-auto mb-6" />
              
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                See What You'll Get
              </h2>
              
              <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
                Download sample deliverables from our AI Governance Framework to understand the 
                depth and quality of documentation you'll receive.
              </p>
              
              <Link
                to="/resources"
                className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-500 text-white rounded-full font-medium hover:bg-indigo-600 transition-colors"
              >
                View Sample Documents
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Ready to Get Certified?
              </h2>
              
              <p className="text-zinc-400 text-lg mb-10 max-w-2xl mx-auto">
                Let's discuss your AI governance needs and create a roadmap to TrustArc 
                Responsible AI Certification.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  to="/book-consultation"
                  className="px-10 py-5 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors flex items-center gap-2 text-lg"
                >
                  Schedule Your Consultation
                  <ArrowRight className="w-5 h-5" />
                </Link>
                
                <Link
                  to="/contact"
                  className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full font-medium hover:bg-white/10 transition-colors text-lg"
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

export default AIGovernancePage;
