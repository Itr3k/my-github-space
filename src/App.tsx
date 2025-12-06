import React, { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { BookConsultation } from './components/BookConsultation';
import { Solutions } from './components/Solutions';
import { SolutionDetail } from './components/SolutionDetail';
import { Blog } from './components/Blog';
import { BlogPostDetail } from './components/BlogPostDetail';
import { CaseStudiesPage } from './components/CaseStudiesPage';
import { CaseStudyDetail } from './components/CaseStudyDetail';
import { Toaster } from './components/ui/sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes  
      refetchOnWindowFocus: false,
    },
  },
});

import { ResourcesPage } from './components/ResourcesPage';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { ProjectWizard } from './components/ProjectWizard';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { ChecklistLandingPage } from './components/ChecklistLandingPage';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Fix for iOS/Mobile white bars (overscroll/safe-areas)
  useEffect(() => {
    // 1. Set theme color for browser chrome
    let metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', '#050508');

    // 2. Set viewport-fit=cover to extend background into the notch/home area
    let metaViewport = document.querySelector("meta[name='viewport']");
    if (!metaViewport) {
      metaViewport = document.createElement('meta');
      metaViewport.setAttribute('name', 'viewport');
      metaViewport.setAttribute('content', 'width=device-width, initial-scale=1, viewport-fit=cover');
      document.head.appendChild(metaViewport);
    } else {
      const content = metaViewport.getAttribute('content') || '';
      if (!content.includes('viewport-fit=cover')) {
        metaViewport.setAttribute('content', `${content}, viewport-fit=cover`);
      }
    }

    // 3. Set background color for html/body to prevent white overscroll
    document.documentElement.style.backgroundColor = '#050508';
    document.body.style.backgroundColor = '#050508';
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const cards = containerRef.current.getElementsByClassName('group');
        for (const card of cards) {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
          (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-dvh bg-[#050508] text-white overflow-x-hidden font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E')] opacity-20 brightness-100 contrast-150"></div>
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
        }}
      />
      
      {/* Ambient Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <Navbar />
      
      <main className="relative z-10">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book-consultation" element={<BookConsultation />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/solutions/:id" element={<SolutionDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPostDetail />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/case-studies/:id" element={<CaseStudyDetail />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/start" element={<ProjectWizard />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/checklist" element={<ChecklistLandingPage />} />
            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
};

export default App;