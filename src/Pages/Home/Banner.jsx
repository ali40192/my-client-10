import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import { Link } from "react-router";

const Banner = () => {
  const leftSlides = [
    {
      img: "https://picsum.photos/1200/600?bookA",
      title: "The Silent Reader",
      summary:
        "A detective unravels mysterious coded messages left behind by an unknown observer.",
    },
    {
      img: "https://picsum.photos/1200/600?bookB",
      title: "Shadows of Time",
      summary:
        "A deep emotional journey connecting lost memories across generations.",
    },
    {
      img: "https://picsum.photos/1200/600?bookC",
      title: "Beyond the Horizon",
      summary:
        "A futuristic interstellar adventure filled with discoveries and emotion.",
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={30}
        modules={[Autoplay]}
      >
        {leftSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[600px] flex flex-col justify-end p-4 sm:p-6 md:p-8 bg-gray-100 rounded-xl overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Background Image */}
              <motion.img
                src={slide.img}
                alt="Book"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2 }}
              />

              {/* Overlay for text */}
              <div className="relative z-10 bg-black/40 p-4 sm:p-6 md:p-8 rounded-lg max-w-full md:max-w-xl text-white">
                <motion.h1
                  className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  {slide.title}
                </motion.h1>
                <motion.p
                  className="text-sm sm:text-base md:text-lg mb-3 sm:mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {slide.summary}
                </motion.p>

                {/* Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-2 sm:gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Link
                    to="/allbooks"
                    className="px-4 sm:px-6 py-2 sm:py-3 bg-orange-600 text-white rounded-lg shadow hover:scale-105 duration-300 w-full sm:w-auto"
                  >
                    All Books
                  </Link>
                  <Link
                    to="/addbook"
                    className="px-4 sm:px-6 py-2 sm:py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black duration-300 w-full sm:w-auto"
                  >
                    Create Book
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
