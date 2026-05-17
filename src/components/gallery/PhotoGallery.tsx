"use client";
import { useState } from "react";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import galleryData from "@/data/galleryData";

const PER_PAGE = 8;

function PhotoGallery() {
  const [page, setPage] = useState(1);
  const start = (page - 1) * PER_PAGE;
  const currentImages = galleryData.slice(start, start + PER_PAGE);
  const totalPages = Math.ceil(galleryData.length / PER_PAGE);

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-center py-6 text-3xl font-medium">Photo Gallery</h1>

      <LightGallery
        speed={500}
        plugins={[lgZoom, lgThumbnail]}
        elementClassNames="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3"
        mobileSettings={{
          controls: true,
          showCloseIcon: true,
          download: false
        }}
      >
        {currentImages.map(img => (
          <a
            key={img.id}
            href={img.src}
            className="h-[250px] overflow-hidden block"
          >
            <img
              src={img.src}
              data-src={img.src}
              data-lg-size="1600-1067"
              className="w-full h-full object-cover"
              alt="Gallery image"
            />
          </a>
        ))}
      </LightGallery>

      <div className="flex justify-center my-4 gap-1.5">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`flex justify-center items-center w-[30px] h-[30px] rounded bg-white text-sm font-medium shadow-[0_0_3px_3px_rgba(0,0,0,0.05)] transition-colors
              ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  )
}

export default PhotoGallery;