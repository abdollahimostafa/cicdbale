"use client";

import { motion } from "framer-motion";

export default function LoadingFlip() {
  const boxes = [1, 2, 3, 4];

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-12 gap-6">
      
      {/* Flipping gray boxes */}
      <div className="flex gap-2">
        {boxes.map((i) => (
          <motion.div
            key={i}
            initial={{ rotateX: 0, opacity: 0.5 }}
            animate={{ rotateX: 180, opacity: 1 }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              repeatType: "reverse",
              delay: i * 0.15,
              ease: "easeInOut",
            }}
            className="w-4 h-4 bg-gray-300 rounded-md"
          />
        ))}
      </div>

      {/* Loading text */}
      <motion.div className="text-lg text-center font-semibold text-gray-700">
        در حال بارگذاری
        <span className="block font-medium text-xs mt-1">
          سامانه هوشمند خدمات درمانی مدی مدیا
        </span>
      </motion.div>
    </div>
  );
}
