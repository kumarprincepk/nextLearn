'use client';
import React, { useEffect } from 'react';
import { initLightboxJS } from 'lightbox.js';
import 'lightbox.js-react/dist/index.css';

const ImageGallery = () => {
  const images = [
    '/images/img1.png',
    '/images/img2.jpg',
    '/images/img3.jpg',
    '/images/img4.jpg',
  ];

  useEffect(() => {
    initLightboxJS("unique-gallery-id", {
      // Optional settings
      licenseKey: 'your_license_key_if_any',
      showDownloadButton: true,
    });
  }, []);

  return (
    <div className="lbx-gallery" data-lightboxjs="unique-gallery-id">
      {images.map((src, index) => (
        <a
          href={src}
          data-lightboxjs-id="gallery"
          key={index}
          style={{
            display: 'inline-block',
            margin: '10px',
          }}
        >
          <img
            src={src}
            alt={`Gallery image ${index + 1}`}
            style={{
              width: '200px',
              height: '150px',
              objectFit: 'cover',
              borderRadius: '6px',
              cursor: 'pointer',
            }}
          />
        </a>
      ))}
    </div>
  );
};

export default ImageGallery;
