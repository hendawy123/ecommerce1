"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { categorise } from "@/type/caticorise.type";

export default function CategorySlider({ data }: { data: categorise[] }) {
  return (
    <div className="py-12 px-2 sm:px-8">
      <Swiper
        spaceBetween={30}
        modules={[Autoplay]}
        autoplay={{ delay: 2200, disableOnInteraction: false }}
        loop={true}
        className=""
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
          1536: { slidesPerView: 7 },
        }}
      >
        {data.map((category : categorise) => (
          <SwiperSlide key={category._id}>
            <div
              className="flex flex-col items-center justify-center 
              w-44 h-52 sm:w-56 sm:h-60 
              bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 rounded-2xl shadow-lg border border-pink-200 
              hover:shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer"
            >
              <div className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-3">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={128}
                  height={128}
                  className="object-contain drop-shadow-lg"
                />
              </div>
              <h3 className="text-center text-pink-700 pt-5 font-bold text-base sm:text-lg">
                {category.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
