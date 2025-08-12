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
