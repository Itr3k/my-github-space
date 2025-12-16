import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { 
  Zap, 
  ClipboardCheck, 
  Mic, 
  Layers, 
  TrendingUp, 
  GraduationCap, 
  FileText, 
  Lock,
  Clock,
  ArrowRight,
  File,
  BookOpen,
  Workflow,
  Download,
  Search
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "./ui/carousel";

// Services & Types
import { 
  getLibraryItems, 
  getDownloadableItems, 
  getResourceCategories, 
  getLatestPosts 
} from '../services/api';
import { LibraryItem, DownloadableItem, ResourceCategory, BlogPost } from '../types';

export const ResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Data State
  const [libraryItems, setLibraryItems] = useState<LibraryItem[]>([]);
  const [downloadableItems, setDownloadableItems] = useState<DownloadableItem[]>([]);
  const [categories, setCategories] = useState<ResourceCategory[]>([]);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API Fetch
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // In a real app, these would be await api.get...
        const libs = await getLibraryItems();
        const downs = await getDownloadableItems();
        const cats = getResourceCategories();
        const posts = await getLatestPosts();
        
        setLibraryItems(libs);
        setDownloadableItems(downs);
        setCategories(cats);
        setLatestPosts(posts);
      } catch (error) {
        console.error("Failed to fetch resources", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredLibrary = libraryItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.type === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryLabel = (type: string) => {
    const cat = categories.find(c => c.id === type);
    return cat ? cat.label : type;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 bg-[#050508] flex items-center justify-center">
        <div className="animate-pulse text-indigo-500">Loading Resources...</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>AI Resources & Documentation | Elevated AI</title>
        <meta name="description" content="Explore our library of AI white papers, interactive workflows, and educational materials. Download AI governance frameworks, transformation guides, and implementation templates." />
        <meta name="keywords" content="AI resources, AI documentation, AI white papers, AI governance framework, AI transformation guide, enterprise AI templates" />
        <link rel="canonical" href="https://elevatedai.co/resources" />
        
        <meta property="og:title" content="AI Resources & Documentation | Elevated AI" />
        <meta property="og:description" content="Download AI governance frameworks, transformation guides, and implementation templates." />
        <meta property="og:url" content="https://elevatedai.co/resources" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="AI Resources | Elevated AI" />
        <meta name="twitter:description" content="Download AI governance frameworks and transformation guides." />
      </Helmet>
    <div className="min-h-screen pt-32 pb-24 px-6 bg-[#050508]">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
             <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8">
               <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
               Knowledge Hub
             </div>
             
             <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
               Resources & <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-white to-purple-300">
                 Documentation
               </span>
             </h1>
             
             <p className="text-zinc-400 text-lg font-light leading-relaxed mb-8">
               Explore our library of white papers, interactive workflows, and educational materials designed to accelerate your AI journey.
             </p>

             {/* Search Bar */}
             <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Search documentation, workflows, and guides..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/10 transition-all"
                />
             </div>
          </motion.div>
        </div>

        {/* Library Section (Documents/Pages) */}
        <section>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'bg-white/10 border-indigo-500/50 text-white' 
                      : 'bg-transparent border-white/5 text-zinc-500 hover:border-white/10 hover:text-zinc-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Documentation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLibrary.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-[#0A0A0F] border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.02] transition-all cursor-pointer"
              >
                {/* Icon Box */}
                <div className="shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 flex items-center justify-center group-hover:from-indigo-500/10 group-hover:border-indigo-500/20 transition-colors">
                    {item.type === 'whitepaper' && <FileText className="w-8 h-8 text-zinc-400 group-hover:text-indigo-400 transition-colors" />}
                    {item.type === 'workflow' && <Workflow className="w-8 h-8 text-zinc-400 group-hover:text-indigo-400 transition-colors" />}
                    {item.type === 'education' && <GraduationCap className="w-8 h-8 text-zinc-400 group-hover:text-indigo-400 transition-colors" />}
                    {item.type === 'forms' && <ClipboardCheck className="w-8 h-8 text-zinc-400 group-hover:text-indigo-400 transition-colors" />}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      {getCategoryLabel(item.type)}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                    <span className="text-xs text-zinc-500 flex items-center gap-1">
                      {item.type === 'workflow' ? <Zap className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                      {item.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-medium text-white/60 group-hover:text-white transition-colors">
                    Open Document <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredLibrary.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-zinc-600" />
              </div>
              <h3 className="text-zinc-300 font-medium">No resources found</h3>
              <p className="text-zinc-500 text-sm mt-2">Try adjusting your search or category filter</p>
            </div>
          )}
        </section>

        {/* Downloadable Resources Section */}
        <section className="pt-12 border-t border-white/5">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-3">Downloadable Assets</h2>
              <p className="text-zinc-400">
                Ready-to-use templates and PDF guides. These are sample deliverables showcasing our capabilities.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {downloadableItems.map((item, index) => {
              const downloadUrl = item.downloadUrl;
              return (
                <motion.a
                  key={index}
                  href={downloadUrl || '#'}
                  download={downloadUrl ? true : undefined}
                  target={downloadUrl ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`group relative bg-[#0A0A0F] border border-white/5 rounded-xl p-6 hover:border-indigo-500/30 hover:bg-white/[0.02] transition-all ${!downloadUrl ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                >
                  <div className="absolute top-6 right-6">
                     <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                       <Download className="w-4 h-4 text-zinc-500 group-hover:text-white" />
                     </div>
                  </div>

                  <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-6">
                     <File className="w-6 h-6 text-indigo-400" />
                  </div>

                  <h3 className="text-white font-bold mb-2 pr-8">{item.title}</h3>
                  <p className="text-zinc-500 text-xs mb-6 h-10 overflow-hidden">{item.description}</p>

                  <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-wider text-zinc-600">
                    <span className="bg-white/5 px-2 py-1 rounded border border-white/5">{item.type}</span>
                    <span>{item.size}</span>
                    {item.isPremium && <span className="text-amber-500">Premium</span>}
                    {downloadUrl && <span className="text-emerald-500">Available</span>}
                  </div>
                </motion.a>
              );
            })}
          </div>
        </section>
        
        {/* Latest Insights Carousel Section (Using API data) */}
        <section className="pb-20">
          <div className="flex items-end justify-between mb-12">
             <div>
                <h2 className="text-4xl font-bold text-white mb-4">Latest Insights</h2>
                <p className="text-zinc-400 text-lg max-w-2xl">
                   Deep dives into AI technology, implementation strategies, and industry trends.
                </p>
             </div>
          </div>

          <div className="relative">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {latestPosts.map((post) => (
                  <CarouselItem key={post.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <motion.div 
                      className="group h-full bg-[#0A0A0F] border border-white/5 rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col"
                      whileHover={{ y: -5 }}
                    >
                      <div className="h-48 relative overflow-hidden">
                        <ImageWithFallback 
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent opacity-60" />
                        <div className="absolute top-4 left-4">
                           <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
                              {post.category}
                           </span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
                           <Clock className="w-3 h-3" />
                           {post.readTime}
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-indigo-400 transition-colors">
                          {post.title}
                        </h3>
                        
                        <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center text-indigo-400 text-sm font-medium group-hover:text-indigo-300">
                          Read Article <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="hidden md:block">
                <CarouselPrevious className="left-0 -translate-x-1/2 bg-black/50 border-white/10 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-colors" />
                <CarouselNext className="right-0 translate-x-1/2 bg-black/50 border-white/10 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-colors" />
              </div>
            </Carousel>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="relative rounded-3xl bg-gradient-to-r from-indigo-900/20 to-purple-900/20 border border-white/10 p-12 overflow-hidden">
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                 <h3 className="text-2xl font-bold text-white mb-2">Need Custom Documentation?</h3>
                 <p className="text-zinc-400 max-w-xl">
                    We build custom AI implementation roadmaps and technical documentation for enterprise teams.
                 </p>
              </div>
              <button className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-zinc-200 transition-colors whitespace-nowrap">
                 Request Custom Guide
              </button>
           </div>
           <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none" />
        </section>

      </div>
    </div>
    </>
  );
};
