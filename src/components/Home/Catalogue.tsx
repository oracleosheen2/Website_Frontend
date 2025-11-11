"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodiacData } from "@/utils/AstroData";

const SliderRow = ({ rowData }: { rowData: typeof zodiacData }) => {
  const [index, setIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const fullData = [...rowData, ...rowData, ...rowData];

  useEffect(() => {
    const update = () => {
      if (containerRef.current) {
        const firstCard = containerRef.current.querySelector(".card");
        if (firstCard) {
          const gap = 24; // gap-6
          setCardWidth((firstCard as HTMLElement).offsetWidth + gap);
        }
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleNext = () => setIndex((prev) => prev + 1);
  const handlePrev = () => setIndex((prev) => prev - 1);

  useEffect(() => {
    const total = rowData.length;
    if (index < 0) {
      setTimeout(() => setIndex(total - 1), 0);
    } else if (index >= total * 2) {
      setTimeout(() => setIndex(total), 0);
    }
  }, [index, rowData.length]);

  return (
    <div className="relative select-none">
      {/* Controls */}
      <div className="absolute -top-10 right-3 z-30 flex items-center gap-2">
        <button
          onClick={handlePrev}
          className="p-2 shadow rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          className="p-2 shadow rounded-full hover:bg-gray-100"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Slider */}
      <div ref={containerRef} className="overflow-hidden w-full">
        <motion.div
          className="flex gap-6 py-2 cursor-grab active:cursor-grabbing"
          animate={{ x: -index * cardWidth }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
          style={{ width: "max-content" }}
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, info) => {
            const threshold = 80;
            if (info.offset.x < -threshold) handleNext();
            else if (info.offset.x > threshold) handlePrev();
          }}
        >
          {fullData.map((zodiac, i) => (
            <div
              key={i}
              className="card flex-shrink-0 rounded-2xl transition-all w-[260px] bg-white overflow-hidden shadow-md hover:shadow-xl duration-300"
            >
              {/* Image with hover zoom */}
              <div className="relative w-full h-[330px] overflow-hidden">
                <Image
                  src={zodiac.image}
                  alt={zodiac.name}
                  fill
                  className="object-cover transform transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Text */}
              <div className="text-center py-6 px-4">
                <h3
                  className="text-xl font-semibold text-[#3D2E4F]"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {zodiac.name} Reading
                </h3>

                <p className="mt-3 text-sm text-gray-600">
                  {zodiac.description}
                </p>

                <button
                  onClick={() => router.push(`/booking/${zodiac.id}`)}
                  className="mt-5 bg-black text-white text-sm font-medium py-2 px-6 rounded-full hover:bg-gray-800 transition-all cursor-pointer"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const Catalogue = () => {
  const half = Math.ceil(zodiacData.length / 2);
  const firstRow = zodiacData.slice(0, half);
  const secondRow = zodiacData.slice(half);
  const router = useRouter();

  return (
    <div
      className="py-16 px-4 sm:px-6 lg:px-10"
      style={{ fontFamily: "var(--font-montserrat)" }}
    >
      <div className="text-center mb-10 max-w-3xl mx-auto">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl pb-4 text-[#3D2E4F]"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Catalogue
        </h2>
        <p
          className="text-[#3D2E4F] text-base sm:text-lg leading-relaxed"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Astrology merely guides us toward reality.
        </p>
        <p
          className="text-[#3D2E4F] text-base sm:text-lg leading-relaxed"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          Explore a range of personalized solutions crafted to inspire, guide,
          and help you achieve your goals.
        </p>
      </div>
      {/* <button
        onClick={() => router.push("/cataloguedetails")}
        className="relative text-gray-700 font-medium transition-all duration-300 group cursor-pointer hover:text-sky-500 hover:-translate-y-0.5"
      >
        View All
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
      </button> */}
      <button
        onClick={() => router.push("/cataloguedetails")}
        className="relative text-gray-700 font-medium transition-all duration-300 group cursor-pointer hover:text-sky-500 hover:-translate-y-0.5 mb-8"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        View All
        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
      </button>

      <div className="space-y-16">
        <SliderRow rowData={firstRow} />
        {/* <SliderRow rowData={secondRow} /> */}
      </div>
    </div>
  );
};

export default Catalogue;
