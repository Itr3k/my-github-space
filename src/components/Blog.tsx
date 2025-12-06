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
    setCurrentPage(1);
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
    setCurrentPage(1);
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
  
  // Featured post (first post)
  const featuredPost = filteredPosts[0];
  const remainingPosts = currentPage === 1 ? currentPosts.slice(1) : currentPosts;

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
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-6">
               <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
               Our Latest Thinking
             </div>
             
             <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
               AI Insights & Resources
             </h1>
             
             <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
               Latest articles on AI consulting, automation strategies, and workplace transformation.
             </p>
          </motion.div>
        </div>

        {/* Featured Post Hero */}
        {currentPage === 1 && featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <Link 
              to={`/blog/${featuredPost.id}`}
              className="group block relative rounded-2xl overflow-hidden"
            >
              {/* Background Image */}
              <div className="relative h-[500px] md:h-[600px]">
                <ImageWithFallback 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  {/* Featured Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold uppercase tracking-wider mb-4">
                    Featured
                  </div>
                  
                  {/* Category */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1 rounded-full ${featuredPost.bg || 'bg-white/10'} backdrop-blur-sm text-xs font-medium ${featuredPost.color || 'text-white'}`}>
                      {featuredPost.category}
                    </span>
                    <span className="text-zinc-400 text-sm flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featuredPost.date}
                    </span>
                    <span className="text-zinc-400 text-sm">{featuredPost.readTime}</span>
                  </div>
                  
                  {/* Title */}
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl leading-tight group-hover:text-indigo-200 transition-colors">
                    {featuredPost.title}
                  </h2>
                  
                  {/* Excerpt */}
                  <p className="text-zinc-300 text-lg max-w-2xl mb-6 line-clamp-2">
                    {featuredPost.excerpt}
                  </p>
                  
                  {/* Read Article Link */}
                  <span className="inline-flex items-center gap-2 text-white font-medium group-hover:text-indigo-300 transition-colors">
                    Read Article
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Latest Posts Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Latest Posts</h2>
            <p className="text-zinc-500 text-sm mt-1">
              Showing {startIndex + 1}-{Math.min(startIndex + POSTS_PER_PAGE, filteredPosts.length)} of {filteredPosts.length} articles
            </p>
          </div>
          
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-48">
               <button 
                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                 className="w-full flex items-center justify-between px-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white hover:border-zinc-700 transition-all"
               >
                 {selectedCategory === "All Categories" ? "All" : selectedCategory.replace("AI ", "")}
                 <ChevronDown className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
               </button>
               
               {isDropdownOpen && (
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl overflow-hidden z-50"
                 >
                   {CATEGORIES.map((cat) => (
                     <button
                       key={cat}
                       onClick={() => handleCategoryChange(cat)}
                       className="w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                     >
                       {cat}
                     </button>
                   ))}
                 </motion.div>
               )}
            </div>

            <div className="relative w-full sm:w-auto">
               <div className="relative">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                 <input 
                   type="text" 
                   placeholder="Search..." 
                   value={searchQuery}
                   onChange={(e) => handleSearch(e.target.value)}
                   className="w-full sm:w-56 bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-10 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-all"
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
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {remainingPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link 
                to={`/blog/${post.id}`}
                className="group flex flex-col h-full bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <ImageWithFallback 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-40" />
                  
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full ${post.bg || 'bg-zinc-800'} backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider ${post.color || 'text-white'}`}>
                      {post.category.replace("AI ", "")}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-white mb-2 leading-snug group-hover:text-indigo-300 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-4 flex-grow line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-zinc-500 pt-4 border-t border-zinc-800">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {post.date}
                      </span>
                      <span>{post.readTime}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-900 mb-4">
              <Search className="w-6 h-6 text-zinc-500" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No articles found</h3>
            <p className="text-zinc-500">Try adjusting your search or filter.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-24">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-10 h-10 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-indigo-600 text-white'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-10 h-10 rounded-lg border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 p-10 rounded-2xl bg-gradient-to-br from-indigo-950/50 to-zinc-900/50 border border-indigo-900/30 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-indigo-600/20 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative z-10 max-w-xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-3">Stay Ahead of the Curve</h2>
              <p className="text-zinc-400 text-sm mb-6">
                Get the latest AI insights and industry trends delivered to your inbox.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your work email" 
                  className="flex-grow bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-all text-sm"
                />
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-500 transition-colors whitespace-nowrap text-sm">
                  Subscribe
                </button>
              </form>
              <p className="mt-3 text-xs text-zinc-600">
                Join 5,000+ executives. Unsubscribe anytime.
              </p>
            </div>
        </div>

      </div>
    </div>
  );
};
