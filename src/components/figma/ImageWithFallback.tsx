import React, { useState, useEffect } from 'react';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

// Low quality placeholder for blur-up effect
const generatePlaceholder = (width: number = 20): string => {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${Math.round(width * 0.5625)}'%3E%3Crect fill='%230a0a0f' width='100%25' height='100%25'/%3E%3C/svg%3E`;
};

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  priority?: boolean;
  aspectRatio?: string;
}

const optimizeUnsplashUrl = (src: string | undefined, width: number = 800): string => {
  if (!src || !src.includes('unsplash.com')) return src || '';
  
  try {
    const url = new URL(src);
    url.searchParams.set('w', width.toString());
    url.searchParams.set('q', '75');
    url.searchParams.set('fm', 'webp');
    url.searchParams.set('auto', 'format');
    return url.toString();
  } catch {
    return src;
  }
};

const generateSrcSet = (src: string | undefined): string | undefined => {
  if (!src || !src.includes('unsplash.com')) return undefined;
  
  const widths = [480, 640, 800, 1080, 1280];
  return widths
    .map((w) => `${optimizeUnsplashUrl(src, w)} ${w}w`)
    .join(', ');
};

export function ImageWithFallback({ 
  priority = false, 
  aspectRatio,
  ...props 
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const { src, alt, style, className, loading, width, height, ...rest } = props;
  
  const optimizedSrc = optimizeUnsplashUrl(src);
  const srcSet = !didError ? generateSrcSet(src) : undefined;
  const sizes = srcSet ? '(max-width: 640px) 480px, (max-width: 1024px) 800px, 1080px' : undefined;

  // CLS prevention: always use aspect-ratio or explicit dimensions
  const containerStyle: React.CSSProperties = {
    ...style,
    aspectRatio: aspectRatio || (width && height ? `${width}/${height}` : undefined),
    backgroundColor: '#0a0a0f', // Placeholder color
  };

  return didError ? (
    <div
      className={`inline-block bg-zinc-900 text-center align-middle ${className ?? ''}`}
      style={containerStyle}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img
      src={optimizedSrc}
      alt={alt}
      className={`${className ?? ''} ${!isLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      style={containerStyle}
      loading={priority ? 'eager' : (loading || 'lazy')}
      decoding={priority ? 'sync' : 'async'}
      srcSet={srcSet}
      sizes={sizes}
      width={width}
      height={height}
      fetchPriority={priority ? 'high' : 'auto'}
      onError={handleError}
      onLoad={handleLoad}
      {...rest}
    />
  );
}

export default ImageWithFallback;
