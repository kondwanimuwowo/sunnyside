import React, { useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Modal from "../common/Modal";

const TestimonialsSection = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const testimonials = [
    {
      name: "Maraka Markubinno",
      role: "Parent of a 7-year-old girl",
      text: `For years after our daughter’s diagnosis of childhood autism at age 3, we lived in a state of total heartbreak and despair. We moved from one therapy center to another, but instead of progress, we only saw her condition worsen. We felt lost until we found Sunnyside Therapy Center.

Today, after only 12 months at Sunnyside, the change is breathtaking. Our daughter, who once struggled with severe language delays and social isolation, is now communicating with words and playing joyfully with other children. She has mastered her daily routines, follows instructions, and no longer suffers from the meltdowns or food selectivity that once overwhelmed our lives. She sleeps peacefully through the night and surprises us every day by repeating the lessons she learns. It feels like Sunnyside is finally 'unwrapping' the genius that was hidden inside her. They taught us that with patience, love, and guidance, real progress is possible.`,
      child: "Age 7, Autism Spectrum Disorder",
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

  return (
    <section className="pt-16 pb-6 px-4 sm:px-6 lg:px-8 bg-gray-50">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative h-full"
            >
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col relative">
                <Quote className="w-12 h-12 text-[#32cd32]/30 mb-6 absolute -top-2 -left-2" />

                <div className="flex-1 mb-6">
                  <p className="text-gray-700 leading-relaxed text-lg">
                    "{truncateText(testimonial.text, 200)}"
                  </p>
                  {testimonial.text.length > 200 && (
                    <button
                      onClick={() => setSelectedTestimonial(testimonial)}
                      className="text-[#32cd32] font-semibold mt-2 hover:underline focus:outline-none"
                    >
                      Read full story
                    </button>
                  )}
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
            </motion.div>
          ))}
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
