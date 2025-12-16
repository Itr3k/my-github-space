import React, { useEffect, useRef, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { Toaster } from './components/ui/sonner';
import { PageSkeleton } from './components/ui/PageSkeleton';

// Lazy load all route components for code splitting
const BookConsultation = lazy(() => import('./components/BookConsultation').then(m => ({ default: m.BookConsultation })));
const Solutions = lazy(() => import('./components/Solutions').then(m => ({ default: m.Solutions })));
const SolutionDetail = lazy(() => import('./components/SolutionDetail').then(m => ({ default: m.SolutionDetail })));
const Blog = lazy(() => import('./components/Blog').then(m => ({ default: m.Blog })));
const BlogPostDetail = lazy(() => import('./components/BlogPostDetail').then(m => ({ default: m.BlogPostDetail })));
const CaseStudiesPage = lazy(() => import('./components/CaseStudiesPage').then(m => ({ default: m.CaseStudiesPage })));
const CaseStudyDetail = lazy(() => import('./components/CaseStudyDetail').then(m => ({ default: m.CaseStudyDetail })));
const ResourcesPage = lazy(() => import('./components/ResourcesPage').then(m => ({ default: m.ResourcesPage })));
const About = lazy(() => import('./components/About').then(m => ({ default: m.About })));
const Contact = lazy(() => import('./components/Contact').then(m => ({ default: m.Contact })));
const ProjectWizard = lazy(() => import('./components/ProjectWizard').then(m => ({ default: m.ProjectWizard })));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const TermsOfService = lazy(() => import('./components/TermsOfService').then(m => ({ default: m.TermsOfService })));
const ChecklistLandingPage = lazy(() => import('./components/ChecklistLandingPage').then(m => ({ default: m.ChecklistLandingPage })));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();
  const rafRef = useRef<number>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    let metaThemeColor = document.querySelector("meta[name='theme-color']");
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', '#050508');

    document.documentElement.style.backgroundColor = '#050508';
    document.body.style.backgroundColor = '#050508';
  }, []);

  // Throttled mousemove handler for performance
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) return;
      
      rafRef.current = requestAnimationFrame(() => {
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
        rafRef.current = undefined;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-dvh bg-[#050508] text-white overflow-x-hidden font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Grid Pattern Overlay - optimized with will-change */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%270 0 200 200%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27noiseFilter%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23noiseFilter)%27/%3E%3C/svg%3E')] opacity-20 brightness-100 contrast-150"></div>
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
        }}
      />
      
      {/* Ambient Background Glow - reduced blur on mobile for performance */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[400px] md:h-[600px] bg-indigo-600/10 rounded-full blur-[60px] md:blur-[120px] pointer-events-none z-0 will-change-transform" />

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
          <Suspense fallback={<PageSkeleton />}>
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
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </Layout>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
};

export default App;
