"use client";

import { useEffect, useRef } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

export default function GalleryFive() {
    const galleryRef = useRef(null);
  const lightboxRef = useRef(null);
  const images = [
    { src: "/images/img1.png", w: 1200, h: 800, alt: "Image 1" },
    { src: "/images/img2.jpg", w: 1200, h: 800, alt: "Image 2" },
    { src: "/images/img3.jpg", w: 1200, h: 800, alt: "Image 3" },
    { src: "/images/img4.jpg", w: 1200, h: 800, alt: "Image 4" },
  ];

  useEffect(() => {
    const lightbox = new PhotoSwipeLightbox({
      gallery: galleryRef.current,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();
    lightboxRef.current = lightbox;

    return () => {
      lightbox.destroy();
    };
  }, []);

  const startSlideshow = async () => {
    if (!lightboxRef.current) return;

    for (let i = 0; i < images.length; i++) {
      lightboxRef.current.loadAndOpen(i, {
        gallery: galleryRef.current,
        children: "a",
      });

      // Wait 3 seconds before opening the next image
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Close the lightbox between images (optional)
      if (i < images.length - 1) {
        lightboxRef.current.pswp?.close();
      }
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={startSlideshow}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Start Slideshow
      </button>

      <div
        ref={galleryRef}
        className="gallery grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        {images.map((img, idx) => (
          <a
            key={idx}
            href={img.src}
            data-pswp-width={img.w}
            data-pswp-height={img.h}
            target="_blank"
            rel="noreferrer"
          >
            <img src={img.src} alt={img.alt} className="rounded" />
          </a>
        ))}
      </div>
    </div>
  );
}