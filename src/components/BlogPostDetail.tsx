import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Clock, User, Share2, ArrowRight, Twitter, Linkedin, Copy, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import DOMPurify from 'dompurify';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useBlogPost, useBlogPosts } from '@/hooks/useData';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

export const BlogPostDetail = () => {
   const { id } = useParams();
   const { data: post, isLoading } = useBlogPost(id);
   const { data: allPosts = [] } = useBlogPosts();
   
   const relatedPosts = allPosts.filter(p => String(p.id) !== String(id)).slice(0, 3);

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

  if (isLoading) {
    return (
      <div className="pt-24 pb-24 min-h-screen bg-[#050508]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-4 w-48 bg-white/10 rounded" />
            <div className="aspect-video bg-white/5 rounded-xl" />
            <div className="space-y-4">
              <div className="h-10 w-3/4 bg-white/10 rounded" />
              <div className="h-6 w-1/2 bg-white/5 rounded" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-white/5 rounded" style={{ width: `${100 - i * 5}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center text-center px-6 bg-[#050508]">
        <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
        <Link to="/blog" className="text-indigo-400 hover:text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  // Truncate title for breadcrumb
  const truncatedTitle = post.title.length > 40 ? post.title.substring(0, 40) + '...' : post.title;

  return (
    <div className="pt-24 pb-24 min-h-screen bg-[#050508]">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-6xl mx-auto px-6 mb-8">
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/blog" className="text-zinc-500 hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4 text-zinc-600" />
            <span className="text-zinc-400">{truncatedTitle}</span>
          </nav>
          
          <Link to="/blog" className="text-sm text-zinc-500 hover:text-white transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Blog
          </Link>
        </div>
      </div>
      
      {/* Two Column Layout */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Column */}
          <article className="flex-1 min-w-0">
            
            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl overflow-hidden border border-zinc-800 mb-8 aspect-video"
            >
               <ImageWithFallback 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Title & Meta */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8"
            >
               <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-[1.15] tracking-tight">
                 {post.title}
               </h1>
               
               {/* Meta Row */}
               <div className="flex flex-wrap items-center gap-4 text-sm pb-6 border-b border-zinc-800">
                  <div className={`px-3 py-1 rounded-full ${post.bg || 'bg-indigo-500/10'} ${post.border || 'border-indigo-500/20'} border`}>
                    <span className={`font-semibold text-xs uppercase tracking-wider ${post.color || 'text-indigo-400'}`}>
                      {post.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </div>
                  
                  {/* Share Button */}
                  <div className="ml-auto">
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors text-sm">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </PopoverTrigger>
                      <PopoverContent align="end" className="w-56 bg-zinc-900 border border-zinc-800 text-white p-2 shadow-xl rounded-xl">
                         <div className="flex flex-col gap-1">
                            <button onClick={() => handleShare('twitter')} className="flex items-center gap-3 w-full px-3 py-2 hover:bg-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-white transition-all">
                               <Twitter className="w-4 h-4 text-[#1DA1F2]" />
                               <span>Twitter</span>
                            </button>
                            
                            <button onClick={() => handleShare('linkedin')} className="flex items-center gap-3 w-full px-3 py-2 hover:bg-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-white transition-all">
                               <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                               <span>LinkedIn</span>
                            </button>
                            
                            <div className="h-px bg-zinc-800 my-1" />
                            
                            <button onClick={() => handleShare('copy')} className="flex items-center gap-3 w-full px-3 py-2 hover:bg-zinc-800 rounded-lg text-sm text-zinc-300 hover:text-white transition-all">
                               <Copy className="w-4 h-4" />
                               <span>Copy Link</span>
                            </button>
                         </div>
                      </PopoverContent>
                    </Popover>
                  </div>
               </div>
            </motion.div>

            {/* Content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="blog-content"
            >
               {post.content ? (
                 <div dangerouslySetInnerHTML={{ 
                   __html: DOMPurify.sanitize(post.content, {
                     ALLOWED_TAGS: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'em', 'u', 'a', 'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'br', 'img'],
                     ALLOWED_ATTR: ['href', 'class', 'src', 'alt', 'target', 'rel']
                   })
                 }} />
               ) : (
                 <p className="text-zinc-400">Content coming soon...</p>
               )}
            </motion.div>
            
            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-zinc-800">
               <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Tags</h3>
               <div className="flex flex-wrap gap-2">
                 {(post.tags || [post.category, 'AI Strategy', 'Enterprise', 'Innovation']).map((tag, i) => (
                   <Link 
                     to={`/blog?search=${encodeURIComponent(tag)}`}
                     key={i} 
                     className="px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 text-sm hover:bg-zinc-700 hover:text-white cursor-pointer transition-colors"
                   >
                     #{tag.replace(/\s+/g, '')}
                   </Link>
                 ))}
               </div>
            </div>

            {/* Author Box */}
            <div className="mt-8 p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
              <div className="flex items-center gap-4">
                {post.author?.image ? (
                  <ImageWithFallback src={post.author.image} alt={post.author.name} className="w-14 h-14 rounded-full object-cover border border-zinc-700" />
                ) : (
                  <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center">
                    <User className="w-6 h-6 text-zinc-500" />
                  </div>
                )}
                <div>
                  <div className="text-white font-semibold">{post.author?.name || 'Elevated AI Team'}</div>
                  <div className="text-zinc-500 text-sm">{post.author?.role || 'AI Consulting Experts'}</div>
                </div>
              </div>
            </div>

          </article>
          
          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-32 space-y-6">
              
              {/* CTA Card */}
              <div className="p-6 rounded-xl bg-gradient-to-br from-indigo-950/80 to-zinc-900/80 border border-indigo-900/40">
                <h3 className="text-xl font-bold text-white mb-3">Ready to Transform Your Business with AI?</h3>
                <p className="text-zinc-400 text-sm mb-5 leading-relaxed">
                  Book a free consultation with our Los Angeles-based AI experts and discover how AI can drive growth for your organization.
                </p>
                <Link 
                  to="/book-consultation" 
                  className="block w-full py-3 px-4 bg-indigo-600 text-white text-center rounded-lg font-medium hover:bg-indigo-500 transition-colors text-sm"
                >
                  Book Free Consultation
                </Link>
              </div>
              
              {/* Related Articles Mini */}
              <div className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800">
                <h3 className="text-white font-semibold mb-4">Related Articles</h3>
                <div className="space-y-4">
                  {relatedPosts.slice(0, 3).map((related) => (
                    <Link 
                      to={`/blog/${related.id}`} 
                      key={related.id} 
                      className="group block"
                    >
                      <h4 className="text-sm text-zinc-300 group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
                        {related.title}
                      </h4>
                      <div className="text-xs text-zinc-600 mt-1">{related.date}</div>
                    </Link>
                  ))}
                </div>
              </div>
              
            </div>
          </aside>
          
        </div>
      </div>

      {/* More Articles Section */}
      <section className="max-w-6xl mx-auto px-6 mt-24">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">More Articles</h2>
          <Link to="/blog" className="text-indigo-400 hover:text-white flex items-center gap-2 text-sm">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {relatedPosts.map((related) => (
             <Link to={`/blog/${related.id}`} key={related.id} className="group block">
                <div className="rounded-xl overflow-hidden border border-zinc-800 mb-4 aspect-[16/10] relative">
                   <ImageWithFallback 
                      src={related.image} 
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                   />
                   <div className="absolute top-3 left-3">
                     <span className={`px-2.5 py-1 rounded-full ${related.bg || 'bg-zinc-800'} backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider ${related.color || 'text-white'}`}>
                       {related.category.replace("AI ", "")}
                     </span>
                   </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
                  {related.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span>{related.date}</span>
                  <span>{related.readTime}</span>
                </div>
             </Link>
           ))}
        </div>
      </section>

    </div>
  );
};
