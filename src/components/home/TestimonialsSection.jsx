import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Modal from "../common/Modal";

const TestimonialsSection = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const isModalOpen = !!selectedTestimonial;

  const testimonials = [
    {
      name: "Maraka Markubinno",
      role: "Parent of a 7-year-old girl",
      text: `For years after our daughter’s diagnosis of childhood autism at age 3, we lived in a state of total heartbreak and despair. We moved from one therapy center to another, but instead of progress, we only saw her condition worsen. We felt lost until we found Sunnyside Therapy Center.

Today, after only 12 months at Sunnyside, the change is breathtaking. Our daughter, who once struggled with severe language delays and social isolation, is now communicating with words and playing joyfully with other children. She has mastered her daily routines, follows instructions, and no longer suffers from the meltdowns or food selectivity that once overwhelmed our lives. She sleeps peacefully through the night and surprises us every day by repeating the lessons she learns. It feels like Sunnyside is finally 'unwrapping' the genius that was hidden inside her. They taught us that with patience, love, and guidance, real progress is possible.`,
      child: "Age 7, Autism Spectrum Disorder",
    },
    {
      name: "Emma Chibale",
      role: "Parent of a child with sensory integration disorder",
      text: `Before Sunnyside, I was deeply worried about my son's development. He was unable to sit in one place for a long time, could not sense danger, and was unable to identify unhygienic things. Simple daily routines felt overwhelming, and as his parents, we often felt helpless.

From the moment we were introduced to Sunnyside, I felt hope return to my heart. The teachers see beyond limitations and never judge any child. Instead, they treat every challenge as an opportunity to help a child grow and learn how to live a more independent and fulfilling life.

Today, I am incredibly grateful for the progress my son has made. He is now able to identify danger, avoid dirty food, and wash his hands before eating. These may seem like small steps to some, but to me, they mean everything.

I was ashamed to move with him in public places, but now I can confidently walk anywhere with him and feel a sense of pride within me. Thank you so much Sunnyside!`,
      child: "Age 6, Autism Spectrum Disorder",
    },
    {
      name: "Mukaya M.",
      role: "Parent of child with Language Delay",
      text: `"When I discovered that my 3-year-old was not progressing verbally, I went into overdrive trying to get any form of help. I visited a number of recommended places but when I finally got to Sunnyside, it was an answered prayer. I saw tremendous changes from speech improvement, motor skills, and independence in his personal space. It's been an amazing journey of progression ever since."`,
      child: "Age 5, Autism Spectrum Disorder",
    },
    {
      name: "Yande and Becky M.",
      role: "Parents",
      text: `As a first-time parent, it’s easy to take things for granted and assume your child will meet all their milestones without much difficulty. Autism was the last thing that you expect to be confronted with. Our son was verbal until he wasn’t at 18 months; he isolated himself among friends and was very sensitive to textures and loud noises. His motor skills were also under development, so we battled with fear of the unknown, but we were hopeful and determined to get as much help for him as he needed.

We are so grateful to God for bringing Mr. Ben and Ms. Elizabeth into our lives because through them and their learning institution, Sunnyside, we learnt how best to communicate with our son. More importantly, our son can now communicate with us and those around him verbally. He can also read and write well and he can recite a few lines from memory. His social and motor skills are beyond amazing.`,
      child: "Autism Support",
    },
    {
      name: "Andrew Chibale",
      role: "Parent of a 6-year-old boy",
      text: `Before Sunnyside, we feared Donel’s inability to use the toilet by himself and his difficulty interacting with us, his parents. He used to speak in cartoon characters and preferred to play alone, unwilling to share toys.

However, after we were introduced to Sunnyside, we felt a renewed sense of hope for Donel’s future. The fact that they do not judge any child and instead see every inability as an opportunity to develop a child’s ability to live a normal life is the most amazing thing about the teachers at Sunnyside.

I must say, you gave my wife and me hope for our son. Donel can now politely request the things he wants, use the toilet independently, and even write and identify colors and objects seamlessly. All thanks to Sunnyside. Mr. Ben and your team are truly amazing to us and to Donel. We love you guys!`,
      child: "Age 6, Language Delay",
    },
  ];

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength).trim() + "...";
  };

  const getScrollAmount = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return 0;
    const firstCard = container.firstElementChild;
    if (!firstCard) return container.offsetWidth;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(container).columnGap || "0");
    return cardWidth + gap;
  }, []);

  const loopedTestimonials = useMemo(
    () => [...testimonials, ...testimonials],
    [testimonials]
  );

  const normalizeScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    const step = getScrollAmount();
    if (!step) return;
    const cycleWidth = step * testimonials.length;

    if (container.scrollLeft >= cycleWidth) {
      container.scrollLeft -= cycleWidth;
    } else if (container.scrollLeft < 0) {
      container.scrollLeft += cycleWidth;
    }
  }, [getScrollAmount, testimonials.length]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const onScroll = () => normalizeScroll();
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, [normalizeScroll]);

  const scroll = useCallback(
    (direction) => {
      const container = scrollRef.current;
      if (!container) return;
      const scrollAmount = getScrollAmount();
      container.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    },
    [getScrollAmount]
  );

  useEffect(() => {
    if (isPaused || isModalOpen) return;
    const timer = setInterval(() => scroll("next"), 5000);
    return () => clearInterval(timer);
  }, [isPaused, isModalOpen, scroll]);

  return (
    <section className="pt-16 pb-6 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 leading-normal">
            Stories of Transformation
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real families. Real progress. Hear from parents whose children have
            found their path at Sunnyside.
          </p>
        </motion.div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {loopedTestimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="snap-start bg-white p-8 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between shrink-0 overflow-hidden w-[85%] md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <Quote className="w-10 h-10 text-[#32cd32]/30 mb-6" />

              <div className="flex-1 mb-6">
                <p
                  className="text-gray-700 leading-relaxed text-lg"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    minHeight: "9.5rem",
                  }}
                >
                  "{truncateText(testimonial.text, 200)}"
                </p>
                <button
                  onClick={() => setSelectedTestimonial(testimonial)}
                  className="text-[#32cd32] font-semibold mt-3 hover:underline focus:outline-none"
                >
                  Read full story
                </button>
              </div>

              <div className="pt-6 border-t border-gray-100 mt-auto">
                <div className="mb-2">
                  <p className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-600">{testimonial.role}</p>
                </div>
                <div className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg inline-block">
                  {testimonial.child}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={() => scroll("prev")}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
            aria-label="Previous testimonials"
            type="button"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={() => scroll("next")}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
            aria-label="Next testimonials"
            type="button"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center space-x-4 text-gray-600">
            <div className="w-2 h-2 bg-[#32cd32] rounded-full"></div>
            <div className="text-sm">
              All testimonials used with family permission
            </div>
            <div className="w-2 h-2 bg-[#32cd32] rounded-full"></div>
          </div>
        </motion.div>
      </div>

      <Modal
        isOpen={!!selectedTestimonial}
        onClose={() => setSelectedTestimonial(null)}
        title={selectedTestimonial ? `Story from ${selectedTestimonial.name}` : ""}
        size="lg"
      >
        {selectedTestimonial && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
               <span className="bg-gray-100 px-3 py-1 rounded-full">{selectedTestimonial.role}</span>
               <span className="bg-[#32cd32]/10 text-[#32cd32] px-3 py-1 rounded-full">{selectedTestimonial.child}</span>
            </div>
            {selectedTestimonial.text.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        )}
      </Modal>
    </section>
  );
};

export default TestimonialsSection;
