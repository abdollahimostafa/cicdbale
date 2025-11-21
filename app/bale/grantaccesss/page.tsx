"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function GrantAccess() {
  const swiperRef = useRef<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const slidesCount = 3; // Total number of slides

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === slidesCount - 1;

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center">
      {/* White App Container */}
      <div className="bg-white w-full max-w-md min-h-screen md:min-h-[650px] overflow-hidden md:shadow-xl flex flex-col justify-center relative">

        {/* ---- Navigation Buttons ---- */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={isFirst}
          className={`absolute flex left-10 bottom-24 text-sm z-20 bg-black/30 text-white px-3 py-1 rounded-full backdrop-blur-md transition items-center gap-1
            ${isFirst ? "opacity-0 cursor-not-allowed" : "hover:bg-black/50 "}
          `}
        >
          <ChevronLeft size={20} />
          قبلی
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          disabled={isLast}
          className={`absolute flex right-10 bottom-24 text-sm z-20 bg-black/50 text-white px-3 py-1 rounded-full backdrop-blur-md transition items-center gap-1
            ${isLast ? "opacity-0 cursor-not-allowed" : "hover:bg-black/50"}
          `}
        >
          بعدی
          <ChevronRight size={20} />
        </button>

        {/* ---- SWIPER ---- */}
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full custom-swiper"
        >
          {/* ---------- Slide 1 ---------- */}
          <SwiperSlide>
            <div className="relative px-6 flex flex-col items-center justify-center text-center gap-5 min-h-screen py-16">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-md" />
              <div className="relative z-10 max-w-md px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-2xl font-bold text-gray-800"
                >
                  <Image src="/balemale.png" className="mx-auto mb-10 w-25" width={500} height={500} alt="logo" />
                  !به <span className="text-[#155dfc]">مدی مدیا</span> خوش آمدید
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay:0.2 }}

                >              <p className="text-gray-700 leading-7 text-sm mt-4">
انجام طیف وسیعی از خدمات در سامانه سلامت ما با چند لمس ساده                </p>
                <p className=" relative leading-7 text-sm mt-1 bg-blue-600 text-white rounded-xl px-1">
از ویزیت تا ثبت نسخ و دریافت مشاوره های روانشاسی             

<Image src="/pointinghand.svg" width={100} height={100} alt="pointer" className=" absolute w-15 h-15 -left-2 top-1 -rotate-10"/>
    </p></motion.div>
  

              </div>
            </div>
          </SwiperSlide>
 {/* ---------- Slide 2 ---------- */}
          <SwiperSlide>
            <div className="relative px-6 flex flex-col items-center justify-center text-center gap-5 min-h-screen py-16">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-md" />
              <div className="relative z-10 max-w-md px-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-2xl font-bold text-gray-800"
                >
                  سامانه خدمات درمانی
                </motion.div>
                <p className="text-gray-700 leading-7 text-sm mt-4">
                  با استفاده از این سامانه شما می‌توانید به صورت هوشمند
                  خدمات پزشکی، مدیریت پرونده، ثبت درخواست‌ها و پیگیری وضعیت درمان
                  را انجام دهید.
                </p>
              </div>
            </div>
          </SwiperSlide>
          {/* ---------- Slide 2 ---------- */}
          <SwiperSlide>
            <div className="px-6 flex flex-col min-h-screen items-center justify-center text-center gap-6 py-16 min-h-[500px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-xl font-semibold text-gray-800"
              >
                آماده شروع هستید؟
              </motion.div>

              <Link
                href="/register"
                className="bg-blue-600 text-white w-full py-3 rounded-xl text-center text-base font-medium hover:bg-blue-700 transition"
              >
                ورود به سامانه
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
