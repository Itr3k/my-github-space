import { LucideIcon } from 'lucide-react';

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  category: string;
  headline: string;
  image: string;
  challenge: string;
  solution: string;
  results: string;
  icon: LucideIcon;
  fullDescription?: string;
  stats?: CaseStudyStat[];
}

export type ResourceType = 'whitepaper' | 'workflow' | 'education' | 'forms' | 'all';

export interface LibraryItem {
  id: number | string;
  type: ResourceType;
  title: string;
  description: string;
  readTime: string;
  date?: string;
  comingSoon?: boolean;
}

export interface DownloadableItem {
  title: string;
  description: string;
  size: string;
  type: string; // PDF, DOCX, etc.
  isPremium?: boolean;
  comingSoon?: boolean;
  downloadUrl?: string;
}

export interface BlogPost {
  id: number | string;
  slug?: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  image: string;
  content?: string; // HTML or Markdown content
  date?: string;
  views?: string;
  author?: {
    name: string;
    role: string;
    image: string;
  };
  // UI helpers (optional)
  color?: string;
  bg?: string;
  border?: string;
  tags?: string[];
}

export interface ResourceCategory {
  id: ResourceType;
  label: string;
  icon: LucideIcon;
}
