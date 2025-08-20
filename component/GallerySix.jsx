// "use client";

// import { useState, useRef, useEffect } from "react";
// import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";

// export default function GalleryReactImage() {
//   const galleryRef = useRef(null);
//   const [isOpen, setIsOpen] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isFullScreen, setIsFullScreen] = useState(false);

//   const images = [
//     { original: "/images/img1.png", thumbnail: "/images/img1.png" },
//     { original: "/images/img2.jpg", thumbnail: "/images/img2.jpg" },
//     { original: "/images/img3.jpg", thumbnail: "/images/img3.jpg" },
//     { original: "/images/img4.jpg", thumbnail: "/images/img4.jpg" },
//   ];

//   const openGalleryAt = (index) => {
//     setIsOpen(true);
//     setTimeout(() => {
//       if (galleryRef.current?.slideToIndex) {
//         galleryRef.current.slideToIndex(index);
//       }
//     }, 50);
//   };

//   const handlePlayPause = () => {
//     debugger
//     if (!galleryRef.current) return;
    
//     if (isPlaying) {
//       galleryRef.current.pause();
//     } else {
//       galleryRef.current.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleFullScreenToggle = () => {
//     if (!galleryRef.current) return;
    
//     if (document.fullscreenElement) {
//       document.exitFullscreen();
//     } else {
//       galleryRef.current.getModal().requestFullscreen();
//     }
//     setIsFullScreen(!isFullScreen);
//   };

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setIsFullScreen(!!document.fullscreenElement);
//     };

//     document.addEventListener('fullscreenchange', handleFullscreenChange);
//     return () => {
//       document.removeEventListener('fullscreenchange', handleFullscreenChange);
//     };
//   }, []);

//   return (
//     <div className="p-4">
//       {/* Thumbnails */}
//       <div className="grid grid-cols-2 gap-4">
//         {images.map((img, index) => (
//           <img
//             key={index}
//             src={img.thumbnail}
//             alt={`Image ${index + 1}`}
//             className="cursor-pointer rounded shadow-md hover:scale-105 transition-transform"
//             onClick={() => openGalleryAt(index)}
//           />
//         ))}
//       </div>

//       {/* Fullscreen Gallery */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-black z-50">
//           <ImageGallery
//             ref={galleryRef}
//             items={images}
//             showThumbnails={true}
//             showNav={true}
//             showPlayButton={false}
//             showFullscreenButton={false}
//             onPlay={() => setIsPlaying(true)}
//             onPause={() => setIsPlaying(false)}
//             renderCustomControls={() => (
//               <div className="absolute top-4 right-4 flex gap-3 text-white text-2xl">
//                 {/* Play/Pause Button */}
//                 <button
//                   onClick={()=>{
//                     alert("hello Prince")
//                     handlePlayPause
//                 }}
//                   className="hover:scale-110 transition-transform"
//                 >
//                   {isPlaying ? "⏸" : "▶"}
//                 </button>

//                 {/* Fullscreen Toggle Button */}
//                 <button
//                   onClick={handleFullScreenToggle}
//                   className="hover:scale-110 transition-transform"
//                 >
//                   {isFullScreen ? "🗗" : "⛶"}
//                 </button>

//                 {/* Close Button */}
//                 <button
//                   onClick={() => {
//                     if (isPlaying) galleryRef.current?.pause();
//                     if (isFullScreen) document.exitFullscreen();
//                     setIsOpen(false);
//                     setIsPlaying(false);
//                     setIsFullScreen(false);
//                   }}
//                   className="hover:scale-110 transition-transform"
//                 >
//                   ✕
//                 </button>
//               </div>
//             )}
//           />
//         </div>
//       )}
//     </div>
//   );
// }










"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// Icons
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
  const intervalRef = useRef(null);

  const images = [
    { original: "/images/img1.png", thumbnail: "/images/img1.png" },
    { original: "/images/img2.jpg", thumbnail: "/images/img2.jpg" },
    { original: "/images/img3.jpg", thumbnail: "/images/img3.jpg" },
    { original: "/images/img4.jpg", thumbnail: "/images/img4.jpg" },
    { original: "/images/butterfly.jpg", thumbnail: "/images/butterfly.jpg" },
    { original: "/images/animet.png", thumbnail: "/images/animet.png" },
    { original: "/images/cat.gif", thumbnail: "/images/cat.gif" },
    { original: "/images/cat.png", thumbnail: "/images/cat.png" },
  ];

  // Show only first 4 images as thumbnails
  const visibleThumbnails = images.slice(0, 4);
  const hiddenImagesCount = images.length - 4;

  const openGalleryAt = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, 3000);
    }
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsPlaying(false);
    clearInterval(intervalRef.current);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === ' ') {
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isPlaying]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Image Gallery</h1>
      
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {visibleThumbnails.map((img, index) => (
          <div 
            key={index} 
            className="relative aspect-square overflow-hidden rounded-lg shadow-md cursor-pointer group"
            onClick={() => openGalleryAt(index)}
          >
            <Image
              src={img.thumbnail}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
        
        {/* View More Button */}
        {/* {hiddenImagesCount > 0 && (
          <div 
            className="relative aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg shadow-md flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 group"
            onClick={() => openGalleryAt(4)}
          >
            <div className="text-4xl font-bold text-white transition-transform duration-300 group-hover:scale-110">+{hiddenImagesCount}</div>
            <div className="text-white mt-2 transition-transform duration-300 group-hover:scale-105">View More</div>
          </div>
        )} */}
      </div>

      {/* Fullscreen Gallery Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex flex-col">
          {/* Top Controls */}
          <div className="flex justify-between items-center p-4 bg-black bg-opacity-70 text-white">
            <div className="text-lg">
              {currentIndex + 1} / {images.length}
            </div>
            <div className="flex gap-2">
              <button
                onClick={togglePlayPause}
                className="w-10 h-10 flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 rounded focus:outline-none transition-all duration-200 hover:scale-110"
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="w-10 h-10 flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 rounded focus:outline-none transition-all duration-200 hover:scale-110"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
              </button>
              
              <button
                onClick={handleClose}
                className="w-10 h-10 flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 rounded focus:outline-none transition-all duration-200 hover:scale-110"
                aria-label="Close gallery"
              >
                <CloseIcon />
              </button>
            </div>
          </div>

          {/* Main Image */}
          <div className="flex-grow flex items-center justify-center relative">
            <button
              onClick={goToPrev}
              className="absolute left-4 z-10 w-10 h-10 flex items-center justify-center text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 focus:outline-none transition-all duration-200 hover:scale-110"
              aria-label="Previous image"
            >
              <PrevIcon />
            </button>
            
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={images[currentIndex].original}
                alt={`Image ${currentIndex + 1}`}
                fill
                className="object-contain transition-transform duration-300"
                priority
              />
            </div>
            
            <button
              onClick={goToNext}
              className="absolute right-4 z-10 w-10 h-10 flex items-center justify-center text-white bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 focus:outline-none transition-all duration-200 hover:scale-110"
              aria-label="Next image"
            >
              <NextIcon />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="p-4 bg-black bg-opacity-70 overflow-x-auto">
            <div className="flex gap-2 justify-center">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`relative w-16 h-16 flex-shrink-0 cursor-pointer border-2 transition-all duration-200 ${index === currentIndex ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`}
                  onClick={() => setCurrentIndex(index)}
                >
                  <Image
                    src={img.thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}