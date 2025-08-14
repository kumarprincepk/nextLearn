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
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

// Icons (you can replace with your preferred icon library)
const PlayIcon = () => <span aria-hidden="true">▶</span>;
const PauseIcon = () => <span aria-hidden="true">⏸</span>;
const FullscreenIcon = () => <span aria-hidden="true">⛶</span>;
const ExitFullscreenIcon = () => <span aria-hidden="true">⛶</span>;
const CloseIcon = () => <span aria-hidden="true">×</span>;

export default function GalleryReactImage() {
  const galleryRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { original: "/images/img1.png", thumbnail: "/images/img1.png" },
    { original: "/images/img2.jpg", thumbnail: "/images/img2.jpg" },
    { original: "/images/img3.jpg", thumbnail: "/images/img3.jpg" },
    { original: "/images/img4.jpg", thumbnail: "/images/img4.jpg" },
  ];

  const openGalleryAt = (index) => {
    setIsOpen(true);
    setTimeout(() => {
      if (galleryRef.current) {
        galleryRef.current.slideToIndex(index);
      }
    }, 50);
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      galleryRef.current?.pause();
    } else {
      galleryRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleFullscreen = () => {
    if (isFullscreen) {
      // Try to use gallery's exit method first
      if (galleryRef.current?.exitFullScreen) {
        galleryRef.current.exitFullScreen();
      } else {
        // Fallback to browser API
        document.exitFullscreen?.() || 
        document.webkitExitFullscreen?.();
      }
    } else {
      // Try to use gallery's method first
      if (galleryRef.current?.fullScreen) {
        galleryRef.current.fullScreen();
      } else {
        // Fallback to browser API
        const galleryElement = galleryRef.current?.getElement();
        galleryElement?.requestFullscreen?.() || 
        galleryElement?.webkitRequestFullscreen?.();
      }
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsPlaying(false);
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement || !!document.webkitFullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
    };
  }, []);

  const renderCustomControls = () => {
    return (
      <div className="absolute top-4 right-4 z-10 flex gap-2 p-2 bg-black bg-opacity-70 rounded-lg shadow-lg">
        <button
          onClick={togglePlayPause}
          className="w-10 h-10 flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 rounded focus:outline-none focus:ring-2 focus:ring-white"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        
        <button
          onClick={toggleFullscreen}
          className="w-10 h-10 flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 rounded focus:outline-none focus:ring-2 focus:ring-white"
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
        </button>
        
        <button
          onClick={handleClose}
          className="w-10 h-10 flex items-center justify-center text-white hover:bg-white hover:bg-opacity-20 rounded focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close gallery"
          title="Close"
        >
          <CloseIcon />
        </button>
      </div>
    );
  };

  const renderItem = (item) => {
    return (
      <div className="image-gallery-image flex items-center justify-center h-full w-full">
        <img
          src={item.original}
          alt={item.originalAlt || item.alt || ""}
          className="max-w-[90vw] max-h-[80vh] object-contain"
         style={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain'
          }}
        />
      </div>
    );
  };

  return (
    <div className="p-4">
      {/* Thumbnails */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.thumbnail}
            alt={`Image ${index + 1}`}
            className="cursor-pointer rounded shadow-md hover:scale-105 transition-transform w-full h-auto"
            onClick={() => openGalleryAt(index)}
          />
        ))}
      </div>

      {/* Fullscreen Gallery */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
          <div className="flex-grow flex items-center justify-center">
            <ImageGallery
              ref={galleryRef}
              items={images}
              showThumbnails={true}
              showNav={true}
              showPlayButton={false}
              showFullscreenButton={false}
              useTranslate3D={true}
              onSlide={(index) => setCurrentIndex(index)}
              renderItem={renderItem}
              renderCustomControls={renderCustomControls}
              additionalClass="h-full w-full"
              thumbnailPosition="bottom"
            />
          </div>
        </div>
      )}
    </div>
  );
}