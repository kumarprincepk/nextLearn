"use client";

import { useEffect } from "react";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export default function GalleryFour() {
  useEffect(() => {
    const lightbox = new SimpleLightbox(".gallery a", {
      captionsData: "alt",
      captionDelay: 250,
      history: false
    });

    return () => {
      lightbox.destroy();
    };
  }, []);

  return (
    <div className="gallery grid grid-cols-2 gap-4 p-4">
      <a href="/images/img1.png">
        <img src="/images/img1.png" alt="Image 1" className="rounded" />
      </a>
      <a href="/images/img2.jpg">
        <img src="/images/img2.jpg" alt="Image 2" className="rounded" />
      </a>
      <a href="/images/img3.jpg">
        <img src="/images/img3.jpg" alt="Image 3" className="rounded" />
      </a>
      <a href="/images/img4.jpg">
        <img src="/images/img4.jpg" alt="Image 4" className="rounded" />
      </a>
    </div>
  );
}
