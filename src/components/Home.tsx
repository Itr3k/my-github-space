import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Hero } from './Hero';
import { WhoThisIsFor } from './WhoThisIsFor';
import { WhyAIStalls } from './WhyAIStalls';
import { TrustBar } from './TrustBar';
import { Services } from './Services';
import { WhyUs } from './WhyUs';
import { Methodology } from './Methodology';
import { HomeCaseStudyCarousel } from './HomeCaseStudyCarousel';
import { FAQ } from './FAQ';

export const Home = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Elevated AI",
    "alternateName": "ElevatedAI",
    "url": "https://elevatedai.co",
    "logo": "https://elevatedai.co/logo.png",
    "description": "Enterprise AI consulting firm specializing in AI transformation, voice AI, governance, and automation solutions.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "sameAs": [
      "https://www.linkedin.com/company/elevatedai",
      "https://elevatedai.substack.com"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-424-484-3844",
      "contactType": "sales",
      "areaServed": "US",
      "availableLanguage": "English"
    }
  };

  return (
    <>
      <Helmet>
        <title>Elevated AI | Enterprise AI Consulting & Transformation Services</title>
        <meta name="description" content="Elevated AI is a premier enterprise AI consulting firm specializing in AI transformation, voice AI solutions, governance frameworks, and workflow automation. Transform your business with expert AI implementation." />
        <meta name="keywords" content="Elevated AI, ElevatedAI, Enterprise AI Consulting, AI Transformation Consulting, AI Automation Services, Voice AI Solutions, AI Governance, AI Strategy Consulting" />
        <link rel="canonical" href="https://elevatedai.co" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Elevated AI | Enterprise AI Consulting & Transformation" />
        <meta property="og:description" content="Transform your enterprise with AI. Expert consulting for AI transformation, voice AI, governance, and automation solutions." />
        <meta property="og:url" content="https://elevatedai.co" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://elevatedai.co/og-image.png" />
        <meta property="og:site_name" content="Elevated AI" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Elevated AI | Enterprise AI Consulting" />
        <meta name="twitter:description" content="Transform your enterprise with AI. Expert consulting for AI transformation, voice AI, governance, and automation." />
        <meta name="twitter:image" content="https://elevatedai.co/og-image.png" />
        
        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
      <Hero />
      <WhoThisIsFor />
      <WhyAIStalls />
      <TrustBar />
      <Services />
      <WhyUs />
      <Methodology />
      <HomeCaseStudyCarousel />
      <FAQ />
    </>
  );
};
