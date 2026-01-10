import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/8320e13332163660193ffca7e227562749e71202.png';

const SERVICES = [
  { name: 'AI Transformation', path: '/ai-transformation', description: 'Strategic AI implementation' },
  { name: 'AI Governance', path: '/ai-governance', description: 'Risk & compliance frameworks' },
  { name: 'Voice AI', path: '/voice-ai', description: 'AI phone agents & voice automation' },
  { name: 'AI Automation', path: '/ai-automation', description: 'Workflow & process automation' },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      setTimeout(() => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
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
            {/* How We Help Dropdown */}
            <div ref={servicesRef} className="relative">
              <button 
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="flex items-center gap-1 px-4 py-1.5 text-zinc-400 hover:text-white text-sm font-medium transition-all hover:bg-white/10 rounded-full bg-transparent border-none cursor-pointer"
              >
                How We Help
                <ChevronDown className={`w-3 h-3 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-[#0A0A0F] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    {SERVICES.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        onClick={() => setIsServicesOpen(false)}
                        className="block px-4 py-3 hover:bg-white/5 transition-colors"
                      >
                        <div className="text-white text-sm font-medium">{service.name}</div>
                        <div className="text-zinc-500 text-xs">{service.description}</div>
                      </Link>
                    ))}
                    <div className="border-t border-white/10">
                      <Link
                        to="/solutions"
                        onClick={() => setIsServicesOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-indigo-400 text-sm font-medium hover:bg-white/5 transition-colors"
                      >
                        View All Solutions
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Governance & Risk - Direct Link */}
            <Link 
              to="/ai-governance"
              className="px-4 py-1.5 text-zinc-400 hover:text-white text-sm font-medium transition-all hover:bg-white/10 rounded-full"
            >
              Governance & Risk
            </Link>
            
            <Link 
              to="/contact"
              className="px-4 py-1.5 text-zinc-400 hover:text-white text-sm font-medium transition-all hover:bg-white/10 rounded-full"
            >
              Contact
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/contact" className="px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-zinc-200 transition-all flex items-center gap-2" style={{ color: 'black' }}>
              Request a Conversation
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
             {/* Mobile Services Section */}
             <div className="mb-2">
               <div className="px-4 py-2 text-xs font-bold text-zinc-500 uppercase tracking-wider">How We Help</div>
               {SERVICES.map((service) => (
                 <Link
                   key={service.path}
                   to={service.path}
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="block px-4 py-3 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white font-medium transition-colors"
                 >
                   {service.name}
                 </Link>
               ))}
             </div>
             
             <div className="border-t border-white/10 pt-2">
               <Link 
                 to="/ai-governance"
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="block px-4 py-3 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white font-medium transition-colors"
               >
                 Governance & Risk
               </Link>
               <Link 
                 to="/contact"
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="block px-4 py-3 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white font-medium transition-colors"
               >
                 Contact
               </Link>
             </div>
             
             <div className="pt-2 border-t border-white/10 mt-2">
                <Link to="/contact" className="w-full block text-center px-5 py-3 rounded-xl bg-white text-black text-sm font-medium mt-2" onClick={() => setIsMobileMenuOpen(false)}>
                  Request a Conversation
                </Link>
             </div>
          </div>
        )}
      </motion.nav>
    </div>
  );
};
