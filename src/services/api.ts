import { CASE_STUDIES } from '../data/caseStudies';
import { LIBRARY_ITEMS, DOWNLOADABLE_ITEMS, RESOURCE_CATEGORIES } from '../data/resources';
import { LATEST_POSTS } from '../data/blog';
import { CaseStudy, LibraryItem, DownloadableItem, BlogPost, ResourceCategory } from '../types';
import { supabase } from '../lib/supabaseClient';

// TOGGLE THIS TO FALSE WHEN YOU CONNECT SUPABASE
const USE_MOCK_DATA = true;

// --- MOCK DATA FUNCTIONS ---

const getMockCaseStudies = (): CaseStudy[] => CASE_STUDIES;
const getMockCaseStudyById = (id: string): CaseStudy | undefined => CASE_STUDIES.find(cs => cs.id === id);
const getMockLibraryItems = (): LibraryItem[] => LIBRARY_ITEMS;
const getMockDownloadableItems = (): DownloadableItem[] => DOWNLOADABLE_ITEMS;
const getMockLatestPosts = (): BlogPost[] => LATEST_POSTS;
const getMockBlogPostById = (id: string | number): BlogPost | undefined => LATEST_POSTS.find(post => post.id.toString() === id.toString());

// --- REAL SUPABASE FUNCTIONS (Ready to use) ---

const getRealCaseStudies = async (): Promise<CaseStudy[]> => {
  const { data, error } = await supabase.from('case_studies').select('*');
  if (error) throw error;
  // Need to map icon strings back to Lucide icons if stored as text, 
  // or handle mapping in the component. For now, we return data as is.
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
  const { data, error } = await supabase.from('blog_posts').select('*').limit(4);
  if (error) throw error;
  return data as unknown as BlogPost[];
};

const getRealBlogPostById = async (id: string | number): Promise<BlogPost | undefined> => {
  const { data, error } = await supabase.from('blog_posts').select('*').eq('id', id).single();
  if (error) return undefined;
  return data as unknown as BlogPost;
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

// Categories are usually static app config, so we keep them local
export const getResourceCategories = (): ResourceCategory[] => {
  return RESOURCE_CATEGORIES;
};
