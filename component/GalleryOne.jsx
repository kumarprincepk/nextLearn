"use client"; // Only if using Next.js App Router

import { useEffect } from "react";
import baguetteBox from "baguettebox.js";
import "baguettebox.js/dist/baguetteBox.min.css";

export default function GalleryOne() {
  useEffect(() => {
    baguetteBox.run(".gallery", {
      animation: "fadeIn",
    });
  }, []);

  return (
    <div className="gallery grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      <a href="/images/img1.png" data-caption="Photo 1">
        <img src="/images/img1.png" alt="Photo 1" className="rounded" />
      </a>
      <a href="/images/img2.jpg" data-caption="Photo 2">
        <img src="/images/img2.jpg" alt="Photo 2" className="rounded" />
      </a>
      <a href="/images/img3.jpg" data-caption="Photo 3">
        <img src="/images/img3.jpg" alt="Photo 3" className="rounded" />
      </a>
      <a href="/images/img4.jpg" data-caption="Photo 4">
        <img src="/images/img4.jpg" alt="Photo 4" className="rounded" />
      </a>
    </div>
  );
}
