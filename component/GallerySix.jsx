"use client";

import { useState, useRef, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function GalleryReactImage() {
  const galleryRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const images = [
    { original: "/images/img1.png", thumbnail: "/images/img1.png" },
    { original: "/images/img2.jpg", thumbnail: "/images/img2.jpg" },
    { original: "/images/img3.jpg", thumbnail: "/images/img3.jpg" },
    { original: "/images/img4.jpg", thumbnail: "/images/img4.jpg" },
  ];

  const openGalleryAt = (index) => {
    setIsOpen(true);
    setTimeout(() => {
      if (galleryRef.current?.slideToIndex) {
        galleryRef.current.slideToIndex(index);
      }
    }, 50);
  };

  const handlePlayPause = () => {
    debugger
    if (!galleryRef.current) return;
    
    if (isPlaying) {
      galleryRef.current.pause();
    } else {
      galleryRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleFullScreenToggle = () => {
    if (!galleryRef.current) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      galleryRef.current.getModal().requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div className="p-4">
      {/* Thumbnails */}
      <div className="grid grid-cols-2 gap-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.thumbnail}
            alt={`Image ${index + 1}`}
            className="cursor-pointer rounded shadow-md hover:scale-105 transition-transform"
            onClick={() => openGalleryAt(index)}
          />
        ))}
      </div>

      {/* Fullscreen Gallery */}
      {isOpen && (
        <div className="fixed inset-0 bg-black z-50">
          <ImageGallery
            ref={galleryRef}
            items={images}
            showThumbnails={true}
            showNav={true}
            showPlayButton={false}
            showFullscreenButton={false}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            renderCustomControls={() => (
              <div className="absolute top-4 right-4 flex gap-3 text-white text-2xl">
                {/* Play/Pause Button */}
                <button
                  onClick={()=>{
                    alert("hello Prince")
                    handlePlayPause
                }}
                  className="hover:scale-110 transition-transform"
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>

                {/* Fullscreen Toggle Button */}
                <button
                  onClick={handleFullScreenToggle}
                  className="hover:scale-110 transition-transform"
                >
                  {isFullScreen ? "🗗" : "⛶"}
                </button>

                {/* Close Button */}
                <button
                  onClick={() => {
                    if (isPlaying) galleryRef.current?.pause();
                    if (isFullScreen) document.exitFullscreen();
                    setIsOpen(false);
                    setIsPlaying(false);
                    setIsFullScreen(false);
                  }}
                  className="hover:scale-110 transition-transform"
                >
                  ✕
                </button>
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
}












// "use client";

// import { useState, useRef } from "react";
// import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";

// export default function GalleryReactImage() {
//   const galleryRef = useRef(null);
//   const [isOpen, setIsOpen] = useState(false);

//   const images = [
//     { original: "/images/img1.png", thumbnail: "/images/img1.png" },
//     { original: "/images/img2.jpg", thumbnail: "/images/img2.jpg" },
//     { original: "/images/img3.jpg", thumbnail: "/images/img3.jpg" },
//     { original: "/images/img4.jpg", thumbnail: "/images/img4.jpg" },
//   ];

//   const openGalleryAt = (index) => {
//     setIsOpen(true);
//     setTimeout(() => {
//       if (galleryRef.current) {
//         galleryRef.current.slideToIndex(index);
//       }
//     }, 50);
//   };

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
//             renderCustomControls={() => (
//               <div className="custom-control-bar">
//                 <button onClick={() => galleryRef.current.play()}>&#9658;</button>
//                 <button onClick={() => galleryRef.current.toggleFullScreen()}>⛶</button>
//                 <button onClick={() => setIsOpen(false)}>✕</button>
//               </div>
//             )}
//           />
//         </div>
//       )}
//     </div>
//   );
// }
