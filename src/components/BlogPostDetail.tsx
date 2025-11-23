import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, User, Share2, ArrowRight, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getBlogPostById, getLatestPosts } from '../services/api';
import { BlogPost } from '../types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

export const BlogPostDetail = () => {
   const { id } = useParams();
   const [post, setPost] = useState<BlogPost | undefined>(undefined);
   const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
   const [isLoading, setIsLoading] = useState(true);

   const handleShare = (platform: 'twitter' | 'linkedin' | 'copy') => {
     const url = window.location.href;
     const title = post?.title || 'Check out this article';
 
     if (platform === 'copy') {
       navigator.clipboard.writeText(url);
       toast.success("Link copied to clipboard");
     } else if (platform === 'twitter') {
       window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
     } else if (platform === 'linkedin') {
       window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
     }
   };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (id) {
        try {
          const data = await getBlogPostById(id);
          setPost(data);
          
          // Fetch related posts (just using latest posts for now, excluding current)
          const allPosts = await getLatestPosts();
          setRelatedPosts(allPosts.filter(p => p.id.toString() !== id).slice(0, 3));
        } catch (error) {
          console.error("Failed to fetch blog post", error);
        }
      }
      setIsLoading(false);
    };

    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center text-center px-6 bg-[#050508]">
        <div className="text-indigo-500 animate-pulse">Loading Article...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center text-center px-6 bg-[#050508]">
        <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
        <Link to="/blog" className="text-indigo-400 hover:text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Insights
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#050508]">
      {/* Progress Bar could go here */}
      
      <article className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Back Link */}
        <Link to="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Insights
        </Link>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
           <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <div className={`px-3 py-1 rounded-full ${post.bg || 'bg-indigo-500/10'} ${post.border || 'border-indigo-500/20'} border`}>
                <span className={`font-bold uppercase tracking-wider ${post.color || 'text-indigo-400'}`}>
                  {post.category}
                </span>
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Calendar className="w-4 h-4" />
                {post.date}
              </div>
              <div className="flex items-center gap-2 text-zinc-400">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </div>
           </div>
           
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
             {post.title}
           </h1>

           {/* Author & Share */}
           <div className="flex items-center justify-between border-y border-white/10 py-6">
              <div className="flex items-center gap-4">
                {post.author?.image ? (
                  <ImageWithFallback src={post.author.image} alt={post.author.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-zinc-400" />
                  </div>
                )}
                <div>
                  <div className="text-white font-bold">{post.author?.name || 'Elevated AI Team'}</div>
                  <div className="text-zinc-500 text-sm">{post.author?.role || 'Editor'}</div>
                </div>
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/50" title="Share Article">
                    <Share2 className="w-4 h-4" />
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-64 bg-[#0A0A0F]/95 backdrop-blur-xl border border-white/10 text-white p-2 shadow-2xl rounded-2xl ring-1 ring-white/5">
                   <div className="flex flex-col gap-1">
                      <div className="px-3 py-2 text-xs font-medium text-zinc-500 uppercase tracking-wider">Share this article</div>
                      
                      <button onClick={() => handleShare('twitter')} className="flex items-center gap-3 w-full px-3 py-2.5 hover:bg-white/5 rounded-xl text-sm text-zinc-300 hover:text-white transition-all group">
                         <div className="w-8 h-8 rounded-lg bg-[#1DA1F2]/10 flex items-center justify-center group-hover:bg-[#1DA1F2]/20 transition-colors">
                            <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                         </div>
                         <span className="font-medium">Twitter</span>
                      </button>
                      
                      <button onClick={() => handleShare('linkedin')} className="flex items-center gap-3 w-full px-3 py-2.5 hover:bg-white/5 rounded-xl text-sm text-zinc-300 hover:text-white transition-all group">
                         <div className="w-8 h-8 rounded-lg bg-[#0A66C2]/10 flex items-center justify-center group-hover:bg-[#0A66C2]/20 transition-colors">
                            <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                         </div>
                         <span className="font-medium">LinkedIn</span>
                      </button>
                      
                      <div className="h-px bg-white/5 my-1 mx-2" />
                      
                      <button onClick={() => handleShare('copy')} className="flex items-center gap-3 w-full px-3 py-2.5 hover:bg-white/5 rounded-xl text-sm text-zinc-300 hover:text-white transition-all group">
                         <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                            <Copy className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                         </div>
                         <span className="font-medium">Copy Link</span>
                      </button>
                   </div>
                </PopoverContent>
              </Popover>
           </div>
        </motion.div>

        {/* Featured Image */}
        <div className="rounded-3xl overflow-hidden border border-white/10 mb-12 relative aspect-video">
           <ImageWithFallback 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
           {/* Render HTML content safely */}
           {post.content ? (
             <div dangerouslySetInnerHTML={{ __html: post.content }} />
           ) : (
             <p className="text-zinc-400">Content coming soon...</p>
           )}
        </div>
        
        {/* Tags / Footer of Article */}
        <div className="mt-16 pt-8 border-t border-white/10">
           <h3 className="text-white font-bold mb-4">Tags</h3>
           <div className="flex flex-wrap gap-2">
             {(post.tags || [post.category, 'AI Strategy', 'Enterprise', 'Innovation']).map((tag, i) => (
               <Link 
                 to={`/blog?search=${encodeURIComponent(tag)}`}
                 key={i} 
                 className="px-4 py-2 rounded-full bg-white/5 text-zinc-300 text-sm hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
               >
                 #{tag.replace(/\s+/g, '')}
               </Link>
             ))}
           </div>
        </div>

      </article>

      {/* Related Articles */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-white">Related Articles</h2>
          <Link to="/blog" className="text-indigo-400 hover:text-white flex items-center gap-2">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {relatedPosts.map((related) => (
             <Link to={`/blog/${related.id}`} key={related.id} className="group block">
                <div className="rounded-2xl overflow-hidden border border-white/10 mb-4 aspect-[4/3] relative">
                   <ImageWithFallback 
                      src={related.image} 
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                   />
                   <div className="absolute top-4 left-4">
                     <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-bold text-white">
                       {related.category}
                     </span>
                   </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {related.title}
                </h3>
                <div className="text-zinc-500 text-sm">{related.date}</div>
             </Link>
           ))}
        </div>
      </section>

    </div>
  );
};
