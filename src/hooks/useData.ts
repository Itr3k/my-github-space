import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getCaseStudies, getCaseStudyById, getLatestPosts, getBlogPostById } from '@/services/api';

// Case Studies
export const useCaseStudies = () => {
  return useQuery({
    queryKey: ['case-studies'],
    queryFn: getCaseStudies,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useCaseStudy = (id: string | undefined) => {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ['case-study', id],
    queryFn: () => getCaseStudyById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    initialData: () => {
      // Try to get from the list cache first
      const cachedStudies = queryClient.getQueryData<Awaited<ReturnType<typeof getCaseStudies>>>(['case-studies']);
      return cachedStudies?.find(study => study.id === id);
    },
  });
};

// Blog Posts
export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: getLatestPosts,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
};

export const useBlogPost = (id: string | number | undefined) => {
  const queryClient = useQueryClient();
  
  return useQuery({
    queryKey: ['blog-post', id],
    queryFn: () => getBlogPostById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    initialData: () => {
      const cachedPosts = queryClient.getQueryData<Awaited<ReturnType<typeof getLatestPosts>>>(['blog-posts']);
      return cachedPosts?.find(post => String(post.id) === String(id));
    },
  });
};

// Prefetch helpers
export const usePrefetchCaseStudies = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.prefetchQuery({
      queryKey: ['case-studies'],
      queryFn: getCaseStudies,
      staleTime: 5 * 60 * 1000,
    });
  };
};
