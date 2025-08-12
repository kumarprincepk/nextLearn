'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ImageSlider = () => {
    const images = [
        '/images/img1.png',
        '/images/img2.jpg',
        '/images/img3.jpg',
        '/images/img4.jpg',
    ];

    return (
        <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            speed={1200} 
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
                // reverseDirection: true,
            }}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            style={{ width: '100%', height: '300px' }}
        >
            {images.map((src, idx) => (
                <SwiperSlide key={idx}>
                    <img
                        src={src}
                        alt={`Slide ${idx + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default ImageSlider;
