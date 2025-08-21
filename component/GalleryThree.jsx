"use client"; // Needed in App Router

import { useEffect, useRef } from "react";
import lightGallery from "lightgallery";

// Plugins
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgFullscreen from "lightgallery/plugins/fullscreen";

// Styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-fullscreen.css";

export default function GalleryThree() {
  const galleryRef = useRef(null);

  useEffect(() => {
    if (galleryRef.current) {
      const galleryInstance = lightGallery(galleryRef.current, {
        plugins: [lgZoom, lgThumbnail, lgFullscreen],
        speed: 500,
      });

      return () => {
        galleryInstance.destroy();
      };
    }
  }, []);

  return (
    <div ref={galleryRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      <a href="/images/img1.png" data-sub-html="<h4>Photo 1</h4><p>Description here</p>">
        <img src="/images/img1.png" alt="Photo 1" className="rounded" />
      </a>
      <a href="/images/img2.jpg" data-sub-html="<h4>Photo 2</h4><p>Description here</p>">
        <img src="/images/img2.jpg" alt="Photo 2" className="rounded" />
      </a>
      <a href="/images/img3.jpg" data-sub-html="<h4>Photo 3</h4><p>Description here</p>">
        <img src="/images/img3.jpg" alt="Photo 3" className="rounded" />
      </a>
      <a href="/images/img4.jpg" data-sub-html="<h4>Photo 4</h4><p>Description here</p>">
        <img src="/images/img4.jpg" alt="Photo 4" className="rounded" />
      </a>
    </div>
  );
}
































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
