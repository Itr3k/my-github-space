import { Cpu, Network, MessageSquareText, FileText, Scan, Wrench, Shield } from 'lucide-react';

export const SOLUTIONS = [
  {
    id: "intelligent-automation",
    icon: Cpu,
    title: "Intelligent Automation",
    description: "Multi-agent systems that learn, adapt, and automate complex workflows across your entire organization.",
    longDescription: "Our Intelligent Automation ecosystem leverages advanced reinforcement learning to create self-optimizing workflows. Unlike traditional RPA which breaks when interfaces change, our agents perceive the screen visually and adapt to UI updates automatically. We build resilient digital workforces that can handle everything from invoice processing to complex supply chain logistics adjustments.",
    features: [
      "Process mining & optimization",
      "Self-healing workflows",
      "Cross-platform orchestration",
      "Real-time monitoring alerts"
    ],
    benefits: [
      "Reduce operational costs by up to 60%",
      "Eliminate 99% of human error in repetitive tasks",
      "Scale operations instantly during peak demand",
      "Free up human talent for strategic initiatives"
    ],
    image: "https://images.unsplash.com/photo-1738082956233-b8f1803411d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwZGF0YSUyMGNvbm5lY3Rpb24lMjBhYnN0cmFjdHxlbnwxfHx8fDE3NjM3NjYzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "decision-intelligence",
    icon: Network,
    title: "Decision Intelligence",
    description: "Advanced analytics tools that find patterns in your data to help you make smarter decisions faster.",
    longDescription: "Transform your raw data into actionable strategic advantages. Our Decision Intelligence platform connects siloed data sources—from SQL databases to unstructured PDF reports—and uses causal AI to predict outcomes of potential business decisions before you make them. It's not just a dashboard; it's a crystal ball for your enterprise.",
    features: [
      "Predictive analytics & forecasting",
      "Natural language queries",
      "Anomaly detection",
      "Interactive dashboards"
    ],
    benefits: [
      "Forecast market trends with 90%+ accuracy",
      "Identify revenue leakage instantly",
      "Democratize data access across teams",
      "Reduce decision latency from weeks to minutes"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkJTIwZnV0dXJpc3RpY3xlbnwxfHx8fDE3NjM3NjYzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "conversational-ai",
    icon: MessageSquareText,
    title: "Conversational AI",
    description: "Natural, context-aware chatbots and voice assistants that deliver exceptional customer experiences.",
    longDescription: "Deploy AI agents that sound and think like your best support representatives. Utilizing the latest LLM technology with RAG (Retrieval Augmented Generation), our conversational agents have deep knowledge of your entire knowledge base and can perform actions like booking appointments, updating CRM records, and resolving complex technical issues without human intervention.",
    features: [
      "Multi-channel deployment (Web, SMS, Phone)",
      "Sentiment analysis & emotional intelligence",
      "Multi-language support (95+ languages)",
      "Seamless human handoff with context"
    ],
    benefits: [
      "24/7 instant customer support",
      "Reduce support ticket volume by 70%",
      "Consistent brand voice across all channels",
      "Gather deep customer insights from conversations"
    ],
    image: "https://images.unsplash.com/photo-1581650127213-e72e2271ff15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMGFzc2lzdGFudCUyMHZvaWNlJTIwd2F2ZXxlbnwxfHx8fDE3NjM3NjYzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "document-intelligence",
    icon: FileText,
    title: "Document Intelligence",
    description: "Extract, classify, and validate information from documents automatically.",
    longDescription: "Stop manual data entry forever. Our Document Intelligence engine can read handwriting, understand complex table structures, and validate data against your ERP systems. Whether it's invoices, legal contracts, or medical records, we turn unstructured documents into structured, queryable data in milliseconds.",
    features: [
      "OCR with handwriting recognition",
      "Smart data extraction & structuring",
      "Automatic document classification",
      "Cross-validation & verification"
    ],
    benefits: [
      "Process documents 100x faster than humans",
      "Reduce processing costs by 90%",
      "Ensure 100% compliance audit trails",
      "Unlock value trapped in paper archives"
    ],
    image: "https://images.unsplash.com/photo-1722107761753-734b118c563a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwZG9jdW1lbnQlMjBzY2FubmluZyUyMGdsb3dpbmd8ZW58MXx8fHwxNzYzNzY2MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "computer-vision",
    icon: Scan,
    title: "Computer Vision",
    description: "Visual intelligence that sees, understands, and acts on images and video streams.",
    longDescription: "Give your systems the gift of sight. From manufacturing quality control to safety monitoring and retail heatmaps, our Computer Vision models can detect defects invisible to the human eye, track assets in real-time, and ensure workplace safety compliance by identifying hazards instantly.",
    features: [
      "Object detection & tracking",
      "Micro-defect identification",
      "Facial recognition & biometrics",
      "Real-time video feed analysis"
    ],
    benefits: [
      "Zero-defect manufacturing quality",
      "Enhanced physical security & safety",
      "Automated inventory management",
      "Deep behavioral insights in physical spaces"
    ],
    image: "https://images.unsplash.com/photo-1695902173528-0b15104c4554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHZpc2lvbiUyMGZhY2UlMjByZWNvZ25pdGlvbnxlbnwxfHx8fDE3NjM3NjYzMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "custom-solutions",
    icon: Wrench,
    title: "Custom Solutions",
    description: "Bespoke AI systems tailored to your unique challenges when off-the-shelf software isn't enough.",
    longDescription: "Every business is unique, and sometimes standard tools just don't fit. Our engineering team specializes in building custom AI architectures from the ground up. We handle everything from data pipeline construction and model training to full-stack application development and secure cloud deployment.",
    features: [
      "Comprehensive requirements analysis",
      "Custom model architecture & training",
      "Full-stack development & integration",
      "Long-term support & optimization"
    ],
    benefits: [
      "Perfect fit for your specific workflows",
      "Full ownership of IP and data",
      "Competitive advantage via proprietary tech",
      "Seamless integration with legacy systems"
    ],
    image: "https://images.unsplash.com/photo-1759661881353-5b9cc55e1cf4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwcHJvZ3JhbW1pbmclMjBhYnN0cmFjdCUyMGJsdWV8ZW58MXx8fHwxNzYzNzY2MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  },
  {
    id: "ai-governance",
    icon: Shield,
    title: "AI Governance",
    description: "Comprehensive frameworks for responsible AI deployment, risk management, and regulatory compliance for any organization.",
    longDescription: "As AI becomes central to business operations, governance is critical. We help organizations of all sizes and industries establish robust AI governance frameworks that ensure ethical deployment, regulatory compliance, and stakeholder trust. Our approach is fully customizable to your industry's unique requirements and risk profile.",
    features: [
      "Policy & framework development",
      "Risk assessment & mitigation",
      "Compliance audits & documentation",
      "Ethical AI guidelines & training"
    ],
    benefits: [
      "Regulatory compliance across jurisdictions",
      "Reduced liability and risk exposure",
      "Stakeholder and board-level confidence",
      "Audit-ready documentation and processes"
    ],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbXBsaWFuY2UlMjBkb2N1bWVudHN8ZW58MXx8fHwxNzYzNzY2MzI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  }
];