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
import { Button } from '@/components/ui/button';

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

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.15),transparent_50%)]" />
          
          <div className="container relative z-10 mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Discovery-Driven Implementation</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text">
                AI Transformation That Drives Real Results
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Strategic AI initiatives that deliver measurable operational improvements. 
                From discovery to deployment, we build scalable systems that transform how your organization works.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link to="/book-consultation">
                    Book a Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <a href="/downloads/AI_Transformation_Plan_Sample.pdf" download>
                    <FileText className="mr-2 h-5 w-5" />
                    Download Sample Roadmap
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What Changes Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What Changes Day-to-Day</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                AI transformation impacts every level of your organization—here's how different roles benefit.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {roleImpacts.map((impact, index) => (
                <motion.div
                  key={impact.role}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <impact.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg">{impact.role}</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-destructive font-medium text-sm shrink-0">Before:</span>
                      <p className="text-sm text-muted-foreground">{impact.before}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-500 font-medium text-sm shrink-0">After:</span>
                      <p className="text-sm text-foreground">{impact.after}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Transformation Process */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Transformation Process</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A proven four-phase approach that ensures successful AI adoption at scale.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {transformationPhases.map((phase, index) => (
                <motion.div
                  key={phase.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="bg-card border border-border rounded-xl p-6 h-full hover:border-primary/50 transition-colors">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {phase.step}
                      </div>
                      <phase.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{phase.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{phase.description}</p>
                    <div className="space-y-1">
                      {phase.deliverables.map((deliverable) => (
                        <div key={deliverable} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                          <span>{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {index < transformationPhases.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Deliverables */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll Receive</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                  className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4">
                    <deliverable.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{deliverable.title}</h3>
                  <p className="text-sm text-muted-foreground">{deliverable.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Now */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-primary/20 rounded-2xl p-8 md:p-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-8 h-8 text-primary" />
                  <h2 className="text-3xl md:text-4xl font-bold">Why Now?</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-primary mt-1 shrink-0" />
                      <p className="text-muted-foreground">Market pressures are intensifying—efficiency is no longer optional, it's survival.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users className="w-5 h-5 text-primary mt-1 shrink-0" />
                      <p className="text-muted-foreground">Labor constraints require operational efficiency without proportional headcount increases.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-primary mt-1 shrink-0" />
                      <p className="text-muted-foreground">First movers gain compounding advantages that become increasingly difficult to close.</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-primary mt-1 shrink-0" />
                      <p className="text-muted-foreground">The AI adoption window is open now—waiting means falling behind competitors who act.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Expected Outcomes */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Expected Outcomes</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
                    className="flex items-center gap-4 bg-card border border-border rounded-lg p-4"
                  >
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <p className="text-foreground">{outcome}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Who This Is For</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                AI transformation applies across industries—if you have operations, you have opportunities.
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto mb-8">
              {industries.map((industry) => (
                <span
                  key={industry}
                  className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium hover:border-primary/50 transition-colors"
                >
                  {industry}
                </span>
              ))}
            </div>
            
            <p className="text-center text-muted-foreground">
              <em>For any organization ready to transform operations through AI</em>
            </p>
          </div>
        </section>

        {/* Investment Positioning */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">A Strategic Investment</h2>
              <p className="text-lg text-muted-foreground mb-6">
                AI Transformation is a strategic investment tailored to your organization's scale, 
                complexity, and specific operational challenges.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Every engagement begins with discovery—we scope your specific needs and create 
                a customized proposal that aligns with your goals and budget.
              </p>
              <Button asChild size="lg" variant="outline">
                <Link to="/contact">
                  Contact Us for a Customized Proposal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <Rocket className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Operations?
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let's discuss your unique challenges and create a customized AI transformation roadmap 
                that delivers measurable results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="text-lg px-8">
                  <Link to="/book-consultation">
                    Book a Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link to="/contact">
                    Contact Us
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AITransformationPage;
