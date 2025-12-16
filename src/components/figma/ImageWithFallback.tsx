import React, { useState } from 'react';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  priority?: boolean;
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

export function ImageWithFallback({ priority = false, ...props }: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);

  const handleError = () => {
    setDidError(true);
  };

  const { src, alt, style, className, loading, ...rest } = props;
  
  const optimizedSrc = optimizeUnsplashUrl(src);
  const srcSet = !didError ? generateSrcSet(src) : undefined;
  const sizes = srcSet ? '(max-width: 640px) 480px, (max-width: 1024px) 800px, 1080px' : undefined;

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img
      src={optimizedSrc}
      alt={alt}
      className={className}
      style={style}
      loading={priority ? 'eager' : (loading || 'lazy')}
      decoding={priority ? 'sync' : 'async'}
      srcSet={srcSet}
      sizes={sizes}
      fetchPriority={priority ? 'high' : 'auto'}
      onError={handleError}
      {...rest}
    />
  );
}

export default ImageWithFallback;
