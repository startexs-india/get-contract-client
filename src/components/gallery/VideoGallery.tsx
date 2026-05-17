"use client";

import LightGallery from "lightgallery/react";
import lgVideo from "lightgallery/plugins/video";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-video.css";

import videoData from "@/data/videoData";

function VideoGallery() {
  return (
    <section className="container mx-auto px-4">
      <h1 className="text-center py-6 text-[2rem] font-medium">Video Gallery</h1>

      <LightGallery
        speed={500}
        plugins={[lgVideo]}
        elementClassNames="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3 mb-8"
      >
        {videoData.map((video) => (
          <a
            key={video.id}
            className="h-[250px] overflow-hidden bg-white p-[10px] shadow-[0_0_4px_4px_rgba(0,0,0,0.05)] block"
            data-poster={video.poster}
            data-lg-size="1280-720"
            data-video={`{"source":[{"src":"${video.src}","type":"video/mp4"}],"attributes":{"controls":true}}`}
          >
            <img
              src={video.poster}
              alt="Video thumbnail"
              className="w-full h-full object-cover bg-white"
            />
          </a>
        ))}
      </LightGallery>
    </section>
  );
}

export default VideoGallery;