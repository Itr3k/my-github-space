import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from 'figma:asset/8320e13332163660193ffca7e227562749e71202.png';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const handleNavigation = (item: string) => {
    if (item === 'Solutions') {
      navigate('/solutions');
      return;
    }
    
    if (item === 'Blog') {
      navigate('/blog');
      return;
    }

    if (item === 'Case Studies') {
      navigate('/case-studies');
      return;
    }

    if (item === 'Resources') {
      navigate('/resources');
      return;
    }

    const hash = `#${item.toLowerCase().replace(' ', '-')}`;

    if (location.pathname !== '/') {
      navigate('/');
      // Optional: timeout to scroll after navigation
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      // Just scroll if already on home
      const element = document.getElementById(hash.replace('#', ''));
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`transition-all duration-300 w-full border-b ${
          isScrolled 
            ? 'bg-[#0A0A0F]/80 backdrop-blur-xl border-white/10 py-0 shadow-lg' 
            : 'bg-transparent border-transparent py-1'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center py-2">
            <img src={logo} alt="Elevated AI" className="h-20 w-auto object-contain scale-150 origin-left ml-2" />
          </Link>

          {/* Desktop Links */}
          <div className={`hidden md:flex items-center gap-1 p-1 rounded-full ${isScrolled ? 'bg-white/5 border border-white/5' : ''}`}>
            {["Solutions", "Blog", "Case Studies", "Resources"].map((item) => (
              <button 
                key={item} 
                onClick={() => handleNavigation(item)}
                className="px-4 py-1.5 text-zinc-400 hover:text-white text-sm font-medium transition-all hover:bg-white/10 rounded-full bg-transparent border-none cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/start" className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-all flex items-center gap-2" style={{ color: 'black' }}>
              Get Started
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 p-4 bg-[#0A0A0F] border-b border-white/10 shadow-2xl">
             {["Solutions", "Blog", "Case Studies", "Resources"].map((item) => (
               <button 
                 key={item}
                 onClick={() => {
                   handleNavigation(item);
                   setIsMobileMenuOpen(false);
                 }}
                 className="w-full text-left block px-4 py-3 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white font-medium transition-colors"
               >
                 {item}
               </button>
             ))}
             <div className="pt-2 border-t border-white/10 mt-2">
                <Link to="/start" className="w-full block text-center px-5 py-3 rounded-xl bg-white text-black text-sm font-medium mt-2" onClick={() => setIsMobileMenuOpen(false)}>
                  Get Started
                </Link>
             </div>
          </div>
        )}
      </motion.nav>
    </div>
  );
};
