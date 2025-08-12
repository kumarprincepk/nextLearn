"use client";

import { useEffect, useRef } from "react";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";

export default function GalleryTwo() {
  const lightboxRef = useRef(null);

  useEffect(() => {
    lightboxRef.current = GLightbox({
      selector: ".glightbox",
      autoplayVideos: true,
      loop: true,
      openEffect: "zoom",
      closeEffect: "fade",
      slideShow: true,
      touchNavigation: true,
    });

    // Add custom fullscreen button when lightbox opens
    lightboxRef.current.on("open", () => {
      const toolbar = document.querySelector(".gslide-media");
      if (toolbar && !document.getElementById("fullscreenBtn")) {
        const btn = document.createElement("button");
        btn.id = "fullscreenBtn";
        btn.innerText = "⛶"; // fullscreen icon
        btn.style.position = "absolute";
        btn.style.top = "10px";
        btn.style.right = "10px";
        btn.style.zIndex = "9999";
        btn.style.background = "rgba(0,0,0,0.5)";
        btn.style.color = "#fff";
        btn.style.border = "none";
        btn.style.padding = "6px 10px";
        btn.style.cursor = "pointer";
        btn.style.fontSize = "18px";
        btn.style.borderRadius = "4px";

        btn.onclick = () => {
          if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        };

        toolbar.appendChild(btn);
      }
    });

    return () => {
      lightboxRef.current.destroy();
    };
  }, []);

  const startSlideshow = () => {
    if (lightboxRef.current) {
      // Request fullscreen before starting slideshow
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }

      lightboxRef.current.open();
      lightboxRef.current.playSlideShow(); // autoplay
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={startSlideshow}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Start Slideshow (Fullscreen)
      </button>

      <div className="grid grid-cols-2 gap-4">
        <a href="/images/img1.png" className="glightbox" data-gallery="gallery1">
          <img src="/images/img1.png" alt="Image 1" className="rounded" />
        </a>
        <a href="/images/img2.jpg" className="glightbox" data-gallery="gallery1">
          <img src="/images/img2.jpg" alt="Image 2" className="rounded" />
        </a>
        <a href="/images/img3.jpg" className="glightbox" data-gallery="gallery1">
          <img src="/images/img3.jpg" alt="Image 3" className="rounded" />
        </a>
        <a href="/images/img4.jpg" className="glightbox" data-gallery="gallery1">
          <img src="/images/img4.jpg" alt="Image 4" className="rounded" />
        </a>
      </div>
    </div>
  );
}
