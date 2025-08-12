import GalleryFive from "@/component/GalleryFive";  //free
import GalleryFour from "@/component/GalleryFour";
import GalleryOne from "@/component/GalleryOne";  //free
import GalleryReactImage from "@/component/GallerySix";
import GalleryThree from "@/component/GalleryThree";
import GalleryTwo from "@/component/GalleryTwo";  // free
import ImageSlider from "@/component/ImageSlider";
import Image from "next/image";
// import dynamic from "next/dynamic"; // ✅ Import dynamic here

// const GalleryFour = dynamic(() => import("./component/GalleryFour"), { ssr: false });


export default function Home() {
  return (
    <div className="mt-5">
      {/* <ImageSlider/> */}
     {/* 1. <GalleryOne/> */}
     {/*2. <GalleryTwo/> */}
      {/*3. <GalleryThree/> */}
      {/*4. <GalleryFour/> */}
      {/* 5. <GalleryFive/> */}
      <GalleryReactImage/>
    </div>
  );
}
