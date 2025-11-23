import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Calendar, Eye, ArrowRight, ChevronDown, Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getLatestPosts } from '../services/api';
import { BlogPost } from '../types';

const CATEGORIES = ["All Categories", "AI in the Workplace", "AI Consulting", "AI Tips", "AI Thought Leadership", "AI Services", "AI News"];
const POSTS_PER_PAGE = 9;

export const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const data = await getLatestPosts();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Sync URL params with state
  useEffect(() => {
    const searchParam = searchParams.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    
    const categoryParam = searchParams.get('category');
    if (categoryParam && CATEGORIES.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }

    const pageParam = searchParams.get('page');
    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    }
  }, [searchParams]);

  // Update URL when search changes
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to page 1 on search
    if (value) {
      setSearchParams(prev => {
        prev.set('search', value);
        prev.set('page', '1');
        return prev;
      });
    } else {
      setSearchParams(prev => {
        prev.delete('search');
        prev.set('page', '1');
        return prev;
      });
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    setCurrentPage(1); // Reset to page 1 on category change
    setSearchParams(prev => {
      if (category === "All Categories") {
        prev.delete('category');
      } else {
        prev.set('category', category);
      }
      prev.set('page', '1');
      return prev;
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchParams(prev => {
      prev.set('page', page.toString());
      return prev;
    });
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "All Categories" || post.category === selectedCategory;
    
    const query = searchQuery.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(query) || 
                          post.excerpt.toLowerCase().includes(query) ||
                          post.tags?.some(tag => tag.toLowerCase().includes(query));
                          
    return matchesCategory && matchesSearch;
  });

  const clearSearch = () => {
    setSearchQuery("");
    setSearchParams(prev => {
      prev.delete('search');
      prev.set('page', '1');
      return prev;
    });
    setCurrentPage(1);
  };

  // Pagination Logic
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-[#050508]">
        <div className="text-indigo-500 animate-pulse">Loading Insights...</div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-[#050508]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8">
               <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
               Our Latest Thinking
             </div>
             
             <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
               AI Insights & Resources
             </h1>
             
             <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
               Latest articles on AI consulting, automation strategies, and workplace transformation from our Los Angeles-based team.
             </p>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-12 relative z-20">
          <div className="relative w-full md:w-64">
             <button 
               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
               className="w-full flex items-center justify-between px-4 py-3 bg-[#0A0A0F] border border-white/10 rounded-xl text-sm text-white hover:border-white/20 transition-all"
             >
               {selectedCategory}
               <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
             </button>
             
             {isDropdownOpen && (
               <motion.div 
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="absolute top-full left-0 right-0 mt-2 bg-[#0A0A0F] border border-white/10 rounded-xl shadow-xl overflow-hidden z-50"
               >
                 {CATEGORIES.map((cat) => (
                   <button
                     key={cat}
                     onClick={() => handleCategoryChange(cat)}
                     className="w-full text-left px-4 py-3 text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                   >
                     {cat}
                   </button>
                 ))}
               </motion.div>
             )}
          </div>

          <div className="relative w-full md:w-auto">
             <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
               <input 
                 type="text" 
                 placeholder="Search articles or tags..." 
                 value={searchQuery}
                 onChange={(e) => handleSearch(e.target.value)}
                 className="w-full md:w-64 bg-[#0A0A0F] border border-white/10 rounded-xl pl-10 pr-10 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-all"
               />
               {searchQuery && (
                 <button 
                   onClick={clearSearch}
                   className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                 >
                   <X className="w-3 h-3" />
                 </button>
               )}
             </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {currentPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link 
                to={`/blog/${post.id}`}
                className="group flex flex-col h-full bg-[#0A0A0F] border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent opacity-60" />
                  
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full bg-zinc-950/90 ${post.border || 'border-white/20'} border backdrop-blur-md shadow-lg`}>
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${post.color || 'text-white'}`}>
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-indigo-300 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-zinc-500 mb-6">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      {post.views}
                    </div>
                  </div>

                  <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                    <button className="text-sm font-medium text-indigo-400 group-hover:text-white transition-colors flex items-center gap-2">
                      Read More
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
              <Search className="w-6 h-6 text-zinc-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No articles found</h3>
            <p className="text-zinc-500">Try adjusting your search or filter.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mb-24">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-indigo-600 text-white'
                      : 'bg-transparent text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-24 p-12 rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">Stay Ahead of the Curve</h2>
              <p className="text-zinc-400 mb-8">
                Get the latest AI insights, strategic frameworks, and industry trends delivered directly to your inbox.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="Enter your work email" 
                  className="flex-grow bg-white/[0.03] border border-white/10 rounded-full px-6 py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-all"
                />
                <button className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </form>
              <p className="mt-4 text-xs text-zinc-600">
                Join 5,000+ executives. Unsubscribe at any time.
              </p>
            </div>
        </div>

      </div>
    </div>
  );
};
