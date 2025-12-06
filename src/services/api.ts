import { CASE_STUDIES } from '../data/caseStudies';
import { LIBRARY_ITEMS, DOWNLOADABLE_ITEMS, RESOURCE_CATEGORIES } from '../data/resources';
import { LATEST_POSTS } from '../data/blog';
import { CaseStudy, LibraryItem, DownloadableItem, BlogPost, ResourceCategory } from '../types';
import { supabase } from '../lib/supabaseClient';

// Set to false to use real database data
const USE_MOCK_DATA = false;

// --- MOCK DATA FUNCTIONS ---

const getMockCaseStudies = (): CaseStudy[] => CASE_STUDIES;
const getMockCaseStudyById = (id: string): CaseStudy | undefined => CASE_STUDIES.find(cs => cs.id === id);
const getMockLibraryItems = (): LibraryItem[] => LIBRARY_ITEMS;
const getMockDownloadableItems = (): DownloadableItem[] => DOWNLOADABLE_ITEMS;
const getMockLatestPosts = (): BlogPost[] => LATEST_POSTS;
const getMockBlogPostById = (id: string | number): BlogPost | undefined => LATEST_POSTS.find(post => post.id.toString() === id.toString());

// --- REAL SUPABASE FUNCTIONS ---

const getRealCaseStudies = async (): Promise<CaseStudy[]> => {
  const { data, error } = await supabase.from('case_studies').select('*');
  if (error) throw error;
  return data as any; 
};

const getRealCaseStudyById = async (id: string): Promise<CaseStudy | undefined> => {
  const { data, error } = await supabase.from('case_studies').select('*').eq('id', id).single();
  if (error) return undefined;
  return data as any;
};

const getRealLibraryItems = async (): Promise<LibraryItem[]> => {
  const { data, error } = await supabase.from('library_items').select('*');
  if (error) throw error;
  return data as unknown as LibraryItem[];
};

const getRealDownloadableItems = async (): Promise<DownloadableItem[]> => {
  const { data, error } = await supabase.from('downloadable_items').select('*');
  if (error) throw error;
  return data as unknown as DownloadableItem[];
};

const getRealLatestPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
  
  // Map database fields to BlogPost interface
  return (data || []).map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    readTime: post.read_time,
    image: post.image,
    content: post.content,
    date: post.date,
    views: post.views?.toString(),
    author: {
      name: post.author_name || 'Elevated AI Team',
      role: post.author_role || 'AI Consulting Experts',
      image: post.author_image || '/placeholder.svg'
    },
    color: post.color,
    bg: post.bg,
    border: post.border,
    tags: post.tags || []
  }));
};

const getRealBlogPostById = async (id: string | number): Promise<BlogPost | undefined> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  
  if (error || !data) return undefined;
  
  return {
    id: data.id,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    readTime: data.read_time,
    image: data.image,
    content: data.content,
    date: data.date,
    views: data.views?.toString(),
    author: {
      name: data.author_name || 'Elevated AI Team',
      role: data.author_role || 'AI Consulting Experts',
      image: data.author_image || '/placeholder.svg'
    },
    color: data.color,
    bg: data.bg,
    border: data.border,
    tags: data.tags || []
  };
};

// --- EXPORTED API ---

export const getCaseStudies = async (): Promise<CaseStudy[]> => {
  if (USE_MOCK_DATA) return getMockCaseStudies();
  return getRealCaseStudies();
};

export const getCaseStudyById = async (id: string): Promise<CaseStudy | undefined> => {
  if (USE_MOCK_DATA) return getMockCaseStudyById(id);
  return getRealCaseStudyById(id);
};

export const getLibraryItems = async (): Promise<LibraryItem[]> => {
  if (USE_MOCK_DATA) return getMockLibraryItems();
  return getRealLibraryItems();
};

export const getDownloadableItems = async (): Promise<DownloadableItem[]> => {
  if (USE_MOCK_DATA) return getMockDownloadableItems();
  return getRealDownloadableItems();
};

export const getLatestPosts = async (): Promise<BlogPost[]> => {
  if (USE_MOCK_DATA) return getMockLatestPosts();
  return getRealLatestPosts();
};

export const getBlogPostById = async (id: string | number): Promise<BlogPost | undefined> => {
  if (USE_MOCK_DATA) return getMockBlogPostById(id);
  return getRealBlogPostById(id);
};

// Categories are static app config
export const getResourceCategories = (): ResourceCategory[] => {
  return RESOURCE_CATEGORIES;
};

// --- BLOG GENERATION API ---

export const generateBlogPost = async (topic?: string, category?: string): Promise<{
  success: boolean;
  message: string;
  post?: { id: number; title: string; category: string; image: string };
  error?: string;
}> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-blog-post', {
      body: { topic, category }
    });

    if (error) {
      console.error('Error generating blog post:', error);
      return { success: false, message: 'Failed to generate blog post', error: error.message };
    }

    return data;
  } catch (err) {
    console.error('Error calling generate-blog-post:', err);
    return { 
      success: false, 
      message: 'Failed to generate blog post', 
      error: err instanceof Error ? err.message : 'Unknown error' 
    };
  }
};
