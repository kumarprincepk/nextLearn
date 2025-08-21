"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

/** Simple icon fallbacks; replace with SVGs if you like */
const PlayIcon = () => <span aria-hidden="true">▶</span>;
const PauseIcon = () => <span aria-hidden="true">⏸</span>;
const FullscreenIcon = () => <span aria-hidden="true">⛶</span>;
const ExitFullscreenIcon = () => <span aria-hidden="true">⛶</span>;
const CloseIcon = () => <span aria-hidden="true">×</span>;
const PrevIcon = () => <span aria-hidden="true">◀</span>;
const NextIcon = () => <span aria-hidden="true">▶</span>;

export default function ResponsiveImageGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState(null);
  const [key, setKey] = useState(0);

  const overlayRef = useRef(null);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  /** Add as many as you want here; UI shows only 6 tiles by default */
  const images = [
    { original: "/images/img1.png", thumbnail: "/images/img1.png" },
    { original: "/images/img2.jpg", thumbnail: "/images/img2.jpg" },
    { original: "/images/img3.jpg", thumbnail: "/images/img3.jpg" },
    { original: "/images/img4.jpg", thumbnail: "/images/img4.jpg" },
    { original: "/images/butterfly.jpg", thumbnail: "/images/butterfly.jpg" },
    { original: "/images/animet.png", thumbnail: "/images/animet.png" },
    { original: "/images/cat.gif", thumbnail: "/images/cat.gif" },
    { original: "/images/cat.png", thumbnail: "/images/cat.png" },
    // ...keep adding if needed
  ];

  const MAX_VISIBLE = 6; // show exactly 6 tiles like the attached UI
  const visibleThumbnails = images.slice(0, MAX_VISIBLE);
  const hiddenImagesCount = Math.max(0, images.length - MAX_VISIBLE);

  const openGalleryAt = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
    setSlideDirection("right");
  };

  /** Touch handlers for swipe */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current == null || touchEndX.current == null) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        setSlideDirection("left");
        goToNext();
      } else {
        setSlideDirection("right");
        goToPrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  /** Autoplay toggle */
  const togglePlayPause = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setSlideDirection("left");
        goToNext();
      }, 3000);
    }
    setIsPlaying((p) => !p);
  };

  /** Use overlay for fullscreen so controls stay in scope */
  const toggleFullscreen = () => {
    const el = overlayRef.current || document.documentElement;
    if (!document.fullscreenElement) {
      el
        .requestFullscreen?.()
        .then(() => setIsFullscreen(true))
        .catch((err) =>
          console.error(`Error enabling fullscreen: ${err?.message || err}`)
        );
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false));
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  };

  const goToPrev = () => {
    setSlideDirection("right");
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setKey((prev) => prev + 1);
  };

  const goToNext = () => {
    setSlideDirection("left");
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setKey((prev) => prev + 1);
  };

  /** Keyboard support */
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        handleClose();
      } else if (e.key === "ArrowLeft") {
        setSlideDirection("right");
        goToPrev();
      } else if (e.key === "ArrowRight") {
        setSlideDirection("left");
        goToNext();
      } else if (e.code === "Space") {
        e.preventDefault(); // prevent page scroll
        togglePlayPause();
      }
    };
    window.addEventListener("keydown", handleKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isPlaying, images.length]);

  /** Sync fullscreen state when changed externally */
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  /** Cleanup autoplay on unmount */
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
    
      {/* Thumbnail Grid (shows exactly 6 tiles like the reference) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {visibleThumbnails.map((img, index) => (
          <button
            key={index}
            type="button"
            className="relative aspect-square overflow-hidden rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-black/30 group"
            onClick={() => openGalleryAt(index)}
            aria-label={`Open image ${index + 1}`}
          >
            <Image
              src={img.thumbnail}
              alt={`Thumbnail ${index + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={index < 2}
            />
          </button>
        ))}

        {/* "+N View More" tile (only if more than 6 images) */}
        {/* {hiddenImagesCount > 0 && (
          <button
            type="button"
            className="relative aspect-square rounded-xl shadow-md bg-gradient-to-br from-blue-500 to-purple-600 text-white flex flex-col items-center justify-center hover:opacity-95 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/50"
            onClick={() => openGalleryAt(MAX_VISIBLE)}
            aria-label={`View ${hiddenImagesCount} more images`}
          >
            <span className="text-3xl md:text-4xl font-bold">
              +{hiddenImagesCount}
            </span>
            <span className="mt-1 md:mt-2 text-xs md:text-sm">View More</span>
          </button>
        )} */}
      </div>

  {/* Heading + Paragraph (like the attached design) */}
      <div className="max-w-3xl mx-auto text-center mb-8 md:mb-10">
        <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
          Our Visual Story
        </h2>
        <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-600">
          Explore a curated selection of our latest shots. Tap any tile to open
          the immersive gallery, swipe or use the arrows to navigate, and hit
          play for a smooth slideshow experience.
        </p>
      </div>

      {/* Fullscreen Gallery Modal */}
      {isOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 bg-black/95 z-50 flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          {/* Top Controls */}
          <div className="flex items-center justify-between p-3 sm:p-4 text-white">
            <div className="text-sm sm:text-base">
              {currentIndex + 1} / {images.length}
            </div>

            <div className="flex gap-2">
              <button
                onClick={togglePlayPause}
                className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded transition-all duration-200 hover:scale-110 focus:outline-none"
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              <button
                onClick={toggleFullscreen}
                className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded transition-all duration-200 hover:scale-110 focus:outline-none"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
              </button>

              <button
                onClick={handleClose}
                className="w-10 h-10 flex items-center justify-center hover:bg-white/20 rounded transition-all duration-200 hover:scale-110 focus:outline-none"
                aria-label="Close gallery"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* Main Image Area */}
          <div
            className="flex-grow flex items-center justify-center relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              onClick={goToPrev}
              className="absolute left-3 sm:left-4 z-10 w-10 h-10 flex items-center justify-center text-white bg-black/50 rounded-full hover:bg-black/70 transition-all duration-200 hover:scale-110 focus:outline-none"
              aria-label="Previous image"
            >
              <PrevIcon />
            </button>

            <div
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              data-direction={slideDirection}
            >
              <Image
                key={key}
                src={images[currentIndex].original}
                alt={`Image ${currentIndex + 1}`}
                fill
                sizes="100vw"
                className={`object-contain transition-transform duration-500 ${
                  slideDirection === "left"
                    ? "animate-slide-left"
                    : slideDirection === "right"
                    ? "animate-slide-right"
                    : "animate-slide-in"
                }`}
                priority
                onTransitionEnd={() => setSlideDirection(null)}
              />
            </div>

            <button
              onClick={goToNext}
              className="absolute right-3 sm:right-4 z-10 w-10 h-10 flex items-center justify-center text-white bg-black/50 rounded-full hover:bg-black/70 transition-all duration-200 hover:scale-110 focus:outline-none"
              aria-label="Next image"
            >
              <NextIcon />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="p-3 sm:p-4 bg-black/70 overflow-x-auto">
            <div className="flex gap-2 sm:gap-3 justify-center">
              {images.map((img, index) => (
                <button
                  key={index}
                  type="button"
                  className={`relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded overflow-hidden border-2 transition-all duration-200 focus:outline-none ${
                    index === currentIndex
                      ? "border-white scale-110"
                      : "border-transparent hover:scale-105"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                >
                  <Image
                    src={img.thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Animations + a few cross-browser fullscreen helpers */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideLeft {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideRight {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }
        .animate-slide-left {
          animation: slideLeft 0.45s ease-out forwards;
        }
        .animate-slide-right {
          animation: slideRight 0.45s ease-out forwards;
        }

        /* Cross-browser fullscreen sizing */
        :-webkit-full-screen {
          width: 100%;
          height: 100%;
        }
        :-moz-full-screen {
          width: 100%;
          height: 100%;
        }
        :-ms-fullscreen {
          width: 100%;
          height: 100%;
        }
        :fullscreen {
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}
