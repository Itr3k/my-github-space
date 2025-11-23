import React from 'react';
import { Hero } from './Hero';
import { TrustBar } from './TrustBar';
import { Services } from './Services';
import { WhyUs } from './WhyUs';
import { Methodology } from './Methodology';
import { HomeCaseStudyCarousel } from './HomeCaseStudyCarousel';
import { FAQ } from './FAQ';

export const Home = () => {
  return (
    <>
      <Hero />
      <TrustBar />
      <Services />
      <WhyUs />
      <Methodology />
      <HomeCaseStudyCarousel />
      <FAQ />
    </>
  );
};
