import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SearchX, ArrowLeft, Home, Mail, BookOpen, Briefcase, FileText, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const quickLinks = [
    { to: '/solutions', label: 'Solutions', icon: Briefcase },
    { to: '/blog', label: 'Blog', icon: BookOpen },
    { to: '/case-studies', label: 'Case Studies', icon: FileText },
    { to: '/resources', label: 'Resources', icon: Users },
  ];

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Elevated AI</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full text-center">
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 md:p-12">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <SearchX className="w-10 h-10 text-indigo-400" />
              </div>
            </div>
            
            <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Page Not Found</h2>
            <p className="text-muted-foreground mb-8">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back on track.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Go Back
              </Button>
              <Button asChild className="flex items-center gap-2">
                <Link to="/">
                  <Home className="w-4 h-4" />
                  Return Home
                </Link>
              </Button>
              <Button asChild variant="secondary" className="flex items-center gap-2">
                <Link to="/contact">
                  <Mail className="w-4 h-4" />
                  Contact Us
                </Link>
              </Button>
            </div>
            
            <div className="border-t border-zinc-800 pt-6">
              <p className="text-sm text-muted-foreground mb-4">Popular pages:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {quickLinks.map(({ to, label, icon: Icon }) => (
                  <Link
                    key={to}
                    to={to}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-zinc-400 hover:text-foreground bg-zinc-800/50 hover:bg-zinc-800 rounded-full transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
