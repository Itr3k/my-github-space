import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { motion } from 'motion/react';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from 'react-router-dom';

import { getCaseStudies } from '../services/api';
import { CaseStudy } from '../types';

// Custom Arrow Components (Hidden but needed for ref usage if we wanted them)
function EmptyArrow(props: any) { return null; }

export const HomeCaseStudyCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getCaseStudies();
        setCaseStudies(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);



  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, // Slow fade transition
    fade: true, // Fade effect
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000, // 6 seconds per slide
    pauseOnHover: true,
    arrows: false,
    beforeChange: (_: number, newIndex: number) => {
      setIsPaused(false);
      setCurrentSlide(newIndex);
    },
    appendDots: (dots: React.ReactNode) => (
      <div style={{ bottom: "24px", left: "24px", width: "auto", right: "auto" }}>
        <ul style={{ margin: "0px", padding: "0px", display: "flex", gap: "8px" }}>
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        className={`h-1 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-white w-8' : 'bg-white/20 w-4 hover:bg-white/40'}`}
      />
    )
  };

  const togglePause = () => {
    if (isPaused) {
      sliderRef.current?.slickPlay();
    } else {
      sliderRef.current?.slickPause();
    }
    setIsPaused(!isPaused);
  };

  if (isLoading) {
    return <div className="py-24 px-6 bg-[#0A0A0F] min-h-[600px] flex items-center justify-center text-white/50">Loading stories...</div>;
  }

  return (
    <section className="py-24 px-6 bg-[#0A0A0F] relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[128px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Success Stories</h2>
            <p className="text-zinc-400 text-lg font-light">Real results from organizations that transformed with AI</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-white/10 bg-[#0F0F16] overflow-hidden shadow-2xl relative group min-h-[700px] md:min-h-[600px]"
        >
          {/* Pause Button */}
          <button
            onClick={togglePause}
            className="absolute top-6 right-6 z-20 p-3 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-white transition-all"
            title={isPaused ? "Play" : "Pause"}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>

          <Slider ref={sliderRef} {...settings} className="h-full">
            {caseStudies.map((story) => (
              <div key={story.id} className="outline-none h-full relative">
                <div className="relative w-full h-[700px] md:h-[600px] overflow-hidden">

                  {/* Full Background Image */}
                  <div className="absolute inset-0">
                    <ImageWithFallback
                      src={story.image}
                      alt={story.client}
                      className="w-full h-full object-cover transition-transform duration-[10000ms] ease-linear scale-100 group-hover:scale-105"
                    />
                    {/* Overlay to ensure text contrast if needed, mostly for the right side on desktop */}
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  {/* Content Overlay Container */}
                  {/* Desktop: Left Side Panel | Mobile: Bottom Sheet */}
                  <div
                    className={`
                        absolute z-10 flex flex-col justify-center
                        /* Mobile Styles */
                        inset-x-0 bottom-0 pt-32 pb-12 px-6
                        bg-gradient-to-t from-black via-black/90 to-transparent
                        
                        /* Desktop Styles */
                        md:inset-y-0 md:left-0 md:right-auto md:w-[500px] md:pt-12 md:pb-12 md:px-12
                        md:bg-black/40 md:backdrop-blur-xl md:border-r md:border-white/10 md:bg-none
                      `}
                  >
                    {/* Mobile Blur Mask (Optional enhancement for mobile text readability) */}
                    <div className="md:hidden absolute inset-0 backdrop-blur-md -z-10" style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)' }} />

                    <div className="relative">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold text-white mb-6 uppercase tracking-widest backdrop-blur-md">
                        {story.category}
                      </div>

                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                        {story.client}
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                      </h3>

                      {/* Challenge & Solution */}
                      <div className="mt-8 space-y-8">
                        <div className="relative pl-4 border-l-2 border-indigo-500/50">
                          <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-1">Challenge</h4>
                          <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3 md:line-clamp-none">
                            {story.challenge}
                          </p>
                        </div>

                        <div className="relative pl-4 border-l-2 border-emerald-500/50 hidden sm:block">
                          <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-widest mb-1">Solution</h4>
                          <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3 md:line-clamp-none">
                            {story.solution}
                          </p>
                        </div>
                      </div>

                      {/* Stats & Action */}
                      <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap items-center gap-6">
                        <div className="flex gap-6">
                          {story.stats?.slice(0, 2).map((stat, idx) => (
                            <div key={idx}>
                              <div className="text-[10px] uppercase tracking-widest text-zinc-400 mb-1">{stat.label}</div>
                              <div className="text-xl font-bold text-white font-mono">{stat.value}</div>
                            </div>
                          ))}
                        </div>

                        <Link
                          to={`/case-studies/${story.id}`}
                          className="ml-auto w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </motion.div>
      </div>
    </section>
  );
};
