import React from "react";
import SEO from "@components/common/SEO";

const Gallery = () => {
  return (
    <>
      <SEO
        title="Gallery"
        description="Photos and videos from Sunnyside Therapy Center"
      />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-10 text-gray-900 leading-normal">
            Our <span className="text-[#32cd32]">Gallery</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">Coming Soon</p>
        </div>
      </div>
    </>
  );
};

export default Gallery;
