import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Image,
  Brain,
  Palette,
  PartyPopper,
  Building2,
} from "lucide-react";

import SEO from "@components/common/SEO";
import { IMAGES } from "@utils/constants";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [lightboxImage, setLightboxImage] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const categories = [
    {
      id: "all",
      name: "All Photos",
      icon: Image,
    },
    {
      id: "therapy",
      name: "Therapy Sessions",
      icon: Brain,
    },
    {
      id: "activities",
      name: "Activities",
      icon: Palette,
    },
    {
      id: "events",
      name: "Events",
      icon: PartyPopper,
    },
    {
      id: "facilities",
      name: "Our Facilities",
      icon: Building2,
    },
  ];

  const galleryImages = [
    {
      id: 1,
      src: IMAGES.hero,
      title: "Learning Together",
      description: "Children engaged in educational activities",
      category: "activities",
    },
    {
      id: 2,
      src: IMAGES.therapy,
      title: "Therapy Session",
      description: "One-on-one therapy with our specialists",
      category: "therapy",
    },
    {
      id: 3,
      src: IMAGES.classroom,
      title: "Our Classroom",
      description: "Bright, welcoming learning environment",
      category: "facilities",
    },
    {
      id: 4,
      src: IMAGES.children,
      title: "Happy Moments",
      description: "Children enjoying social activities",
      category: "activities",
    },
    {
      id: 5,
      src: IMAGES.learning,
      title: "Focused Learning",
      description: "Individual attention for each child",
      category: "therapy",
    },
    {
      id: 6,
      src: IMAGES.support,
      title: "Caring Support",
      description: "Compassionate guidance from our team",
      category: "therapy",
    },
    {
      id: 7,
      src: IMAGES.education,
      title: "Educational Activities",
      description: "Hands-on learning experiences",
      category: "activities",
    },
    {
      id: 8,
      src: IMAGES.community,
      title: "Community Events",
      description: "Bringing families together",
      category: "events",
    },
    {
      id: 9,
      src: IMAGES.sunnyTwo,
      title: "Group Activities",
      description: "Building social skills together",
      category: "activities",
    },
    {
      id: 10,
      src: IMAGES.sunnysideAbout,
      title: "Our Center",
      description: "Welcome to Sunnyside",
      category: "facilities",
    },
  ];

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (image, index) => {
    setLightboxImage(image);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const nextImage = () => {
    const nextIndex = (lightboxIndex + 1) % filteredImages.length;
    setLightboxIndex(nextIndex);
    setLightboxImage(filteredImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex =
      (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxIndex(prevIndex);
    setLightboxImage(filteredImages[prevIndex]);
  };

  return (
    <>
      <SEO
        title="Photo Gallery"
        description="Explore photos of our therapy sessions, activities, and facilities at Sunnyside Therapy Center"
        keywords="therapy photos, children activities, Sunnyside gallery, therapy center Lusaka"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-10 text-gray-900 leading-normal">
                Our <span className="text-[#32cd32]">Gallery</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Take a glimpse into daily life at Sunnyside Therapy Center -
                where every child thrives
              </p>
            </motion.div>
          </div>
        </section>

        {/* Category Filters */}
        <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-[#32cd32] text-white shadow-sm"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <cat.icon className="w-5 h-5 text-current" />

                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Photo Grid */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredImages.map((image, idx) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-gray-100 cursor-pointer"
                    onClick={() => openLightbox(image, idx)}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                        <h3 className="font-bold text-lg mb-1">
                          {image.title}
                        </h3>
                        <p className="text-sm text-gray-200">
                          {image.description}
                        </p>
                      </div>

                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <ZoomIn className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredImages.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  No photos in this category yet
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>

              {/* Image */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="max-w-6xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={lightboxImage.src}
                  alt={lightboxImage.title}
                  className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                />

                {/* Image Info */}
                <div className="mt-4 text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">
                    {lightboxImage.title}
                  </h3>
                  <p className="text-gray-300">{lightboxImage.description}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    {lightboxIndex + 1} of {filteredImages.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Gallery;
