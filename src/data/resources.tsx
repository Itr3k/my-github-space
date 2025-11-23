import { 
  Zap, 
  ClipboardCheck, 
  Mic, 
  Layers, 
  TrendingUp, 
  GraduationCap, 
  FileText, 
  Workflow,
} from 'lucide-react';
import { LibraryItem, DownloadableItem, ResourceCategory } from '../types';

export const RESOURCE_CATEGORIES: ResourceCategory[] = [
  { id: 'all', label: 'All Resources', icon: Layers },
  { id: 'whitepaper', label: 'White Papers', icon: FileText },
  { id: 'workflow', label: 'Workflows', icon: Workflow },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'forms', label: 'Client Forms', icon: ClipboardCheck },
];

export const LIBRARY_ITEMS: LibraryItem[] = [
  {
    id: 1,
    type: 'whitepaper',
    title: "The State of Deep Tech 2024",
    description: "Comprehensive analysis of AI adoption trends in enterprise sectors.",
    readTime: "15 min read",
    date: "Oct 24, 2023"
  },
  {
    id: 2,
    type: 'workflow',
    title: "Automated Lead Scoring Matrix",
    description: "Interactive workflow for qualifying B2B leads using n8n and OpenAI.",
    readTime: "Interactive",
    date: "Nov 02, 2023"
  },
  {
    id: 3,
    type: 'education',
    title: "Prompt Engineering Masterclass",
    description: "Advanced techniques for optimizing LLM outputs in production environments.",
    readTime: "Course",
    date: "Sep 15, 2023"
  },
  {
    id: 4,
    type: 'forms',
    title: "Project Scope Definition Form",
    description: "Standardized intake form for defining AI implementation requirements.",
    readTime: "Form",
    date: "Updated yesterday"
  },
  {
    id: 5,
    type: 'whitepaper',
    title: "Security First AI Architecture",
    description: "Blueprints for deploying LLMs within SOC2 compliant environments.",
    readTime: "20 min read",
    date: "Oct 30, 2023"
  },
  {
    id: 6,
    type: 'workflow',
    title: "Customer Support Routing",
    description: "Logic flow for triaging support tickets using sentiment analysis.",
    readTime: "Interactive",
    date: "Oct 12, 2023"
  }
];

export const DOWNLOADABLE_ITEMS: DownloadableItem[] = [
  {
    title: "AI Audit Template Summary",
    description: "Comprehensive framework for assessing AI readiness across your organization",
    size: "2.4 MB",
    type: "PDF",
    isPremium: true
  },
  {
    title: "Voice AI Capabilities Overview",
    description: "Detailed breakdown of Voice AI tiers and implementation details",
    size: "1.8 MB",
    type: "PDF",
    isPremium: false
  },
  {
    title: "AI Transformation Guide",
    description: "Step-by-step guide to planning and executing successful AI adoption initiatives",
    size: "3.2 MB",
    type: "PDF",
    isPremium: false
  },
  {
    title: "Strategic Roadmap Framework",
    description: "90-day AI implementation planning template with milestones and KPIs",
    size: "1.5 MB",
    type: "PDF",
    isPremium: false
  },
  {
    title: "Voice AI Proposal Template",
    description: "Customizable proposal template for Voice AI projects with ROI projections",
    size: "850 KB",
    type: "DOCX",
    isPremium: false
  },
  {
    title: "Technical Requirements Sheet",
    description: "Hardware and software prerequisites for on-premise AI deployment",
    size: "1.1 MB",
    type: "PDF",
    isPremium: false
  }
];
