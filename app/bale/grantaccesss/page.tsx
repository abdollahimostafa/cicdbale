"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Link from "next/link";

export default function GrantAccess() {
  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center">
      {/* White App Container */}
      <div className="bg-white w-full max-w-md min-h-screen md:min-h-[650px]  overflow-hidden md:shadow-xl px-6 flex flex-col justify-center">
        
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: false }}
          direction="horizontal"
          className="w-full custom-swiper"
        >
          {/* ---------------- Slide 1 ---------------- */}
          <SwiperSlide>
            <div className="flex flex-col  min-h-screen items-center justify-center text-center gap-5 py-16 min-h-[500px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-2xl font-bold text-gray-800"
              >
                سامانه خدمات درمانی
              </motion.div>

              <p className="text-gray-600 leading-7 text-sm px-4">
                با استفاده از این سامانه شما می‌توانید به صورت هوشمند
                خدمات پزشکی، مدیریت پرونده، ثبت درخواست‌ها و پیگیری وضعیت درمان 
                را انجام دهید.
              </p>
            </div>
          </SwiperSlide>

          {/* ---------------- Slide 2 ---------------- */}
          <SwiperSlide>
            <div className="flex flex-col min-h-screen items-center justify-center text-center gap-6 py-16 min-h-[500px]">
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
                className="bg-blue-600 text-white w-full py-3 rounded-xl text-center text-base font-semibold hover:bg-blue-700 transition"
              >
                شروع ثبت نام در سامانه
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
