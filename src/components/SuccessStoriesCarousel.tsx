import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { ArrowRight, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CASE_STUDIES } from '../data/caseStudies';

// Custom arrow components
function NextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "-10px", zIndex: 10 }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "-10px", zIndex: 10 }}
      onClick={onClick}
    />
  );
}

export const SuccessStoriesCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = React.useRef<Slider>(null);

  useEffect(() => {
    // Dynamically inject Slick Carousel CSS from CDN to avoid build errors with fonts/gifs
    const slickCss = document.createElement("link");
    slickCss.rel = "stylesheet";
    slickCss.href = "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css";
    document.head.appendChild(slickCss);

    const slickThemeCss = document.createElement("link");
    slickThemeCss.rel = "stylesheet";
    slickThemeCss.href = "https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css";
    document.head.appendChild(slickThemeCss);

    return () => {
      document.head.removeChild(slickCss);
      document.head.removeChild(slickThemeCss);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ],
    beforeChange: () => setIsPaused(false), // Optional: handle state if needed
  };

  const togglePause = () => {
    if (isPaused) {
      sliderRef.current?.slickPlay();
    } else {
      sliderRef.current?.slickPause();
    }
    setIsPaused(!isPaused);
  };

  return (
    <div className="relative">
      {/* Pause Control */}
      <button 
        onClick={togglePause}
        className="absolute -top-12 right-0 z-10 p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-all"
        title={isPaused ? "Play" : "Pause"}
      >
        {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
      </button>

      <Slider ref={sliderRef} {...settings} className="case-study-slider -mx-4">
        {CASE_STUDIES.map((story) => (
          <div key={story.id} className="px-4 h-full">
            <div className="h-full flex flex-col rounded-3xl bg-[#0A0A0F] border border-white/10 overflow-hidden group hover:border-indigo-500/50 transition-all duration-500">
              {/* Image Header */}
              <div className="h-48 relative overflow-hidden">
                <ImageWithFallback 
                  src={story.image} 
                  alt={story.client}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
                  {story.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 leading-tight min-h-[3.5rem]">
                  {story.headline}
                </h3>
                
                <div className="space-y-4 mb-6 flex-grow">
                  <div>
                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Challenge</div>
                    <p className="text-sm text-zinc-400 line-clamp-2">{story.challenge}</p>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Result</div>
                    <p className="text-sm text-white font-medium line-clamp-2">{story.results}</p>
                  </div>
                </div>

                <Link 
                  to={`/case-studies/${story.id}`}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-indigo-600 hover:text-white text-zinc-300 text-sm font-bold transition-all flex items-center justify-center gap-2 group/btn"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};
