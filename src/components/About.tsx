import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';

export const About = () => {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Elevated AI",
      "founder": {
        "@type": "Person",
        "name": "Johnathan Scott",
        "jobTitle": "Founder & CEO"
      },
      "foundingDate": "2023",
      "description": "Enterprise AI consulting firm specializing in AI transformation, voice AI, governance, and automation.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Los Angeles",
        "addressRegion": "CA",
        "addressCountry": "US"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>About Elevated AI | Enterprise AI Consulting Firm</title>
        <meta name="description" content="Learn about Elevated AI, a premier enterprise AI consulting firm founded by Johnathan Scott. Based in Los Angeles, we specialize in AI transformation, voice AI, and governance solutions." />
        <meta name="keywords" content="About Elevated AI, Johnathan Scott AI, enterprise AI strategist, AI transformation expert, AI consulting firm Los Angeles" />
        <link rel="canonical" href="https://elevatedai.co/about" />
        
        <meta property="og:title" content="About Elevated AI | Enterprise AI Consulting" />
        <meta property="og:description" content="Learn about Elevated AI, founded by Johnathan Scott. Premier enterprise AI consulting based in Los Angeles." />
        <meta property="og:url" content="https://elevatedai.co/about" />
        <meta property="og:type" content="website" />
        
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="About Elevated AI" />
        <meta name="twitter:description" content="Premier enterprise AI consulting firm founded by Johnathan Scott." />
        
        <script type="application/ld+json">
          {JSON.stringify(aboutSchema)}
        </script>
      </Helmet>
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">About Elevated AI</h1>
            
            <div className="space-y-8 text-zinc-400 text-lg leading-relaxed">
                <p>
                    Elevated AI is a premier consultancy dedicated to transforming enterprises through intelligent automation and strategic AI implementation. Founded in 2023 by <strong className="text-white">Johnathan Scott</strong>, we bridge the gap between cutting-edge artificial intelligence research and practical, scalable business solutions.
                </p>
                
                <p>
                    Based in <strong className="text-white">Los Angeles, California</strong>, our mission is simple: to empower organizations to achieve exponential efficiency. We believe that the future of work is not about replacing humans, but about elevating human potential by automating the mundane and augmenting decision-making with superior intelligence.
                </p>

                <h2 className="text-2xl font-bold text-white mt-12 mb-4">Our Philosophy</h2>
                <p>
                    We reject the "AI for AI's sake" hype. Every solution we design is rooted in measurable ROI. If it doesn't save time, reduce cost, or generate revenue, it doesn't belong in your tech stack. We specialize in high-impact integrations using tools like OpenAI, Anthropic, ElevenLabs, and n8n to build systems that are robust, secure, and scalable.
                </p>

                 <h2 className="text-2xl font-bold text-white mt-12 mb-4">The Team</h2>
                <p>
                    Led by Johnathan Scott, we are a collective of engineers, strategists, and system architects who have spent years building at the intersection of software and operations. We don't just write code; we design workflows that work for people.
                </p>
            </div>
        </motion.div>
      </div>
    </div>
    </>
  );
};
