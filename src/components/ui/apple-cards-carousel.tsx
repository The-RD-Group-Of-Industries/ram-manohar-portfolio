"use client";

import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/utils/use-outside-click";
import { getBlogByType } from "@/core/actions/Dashboard/Blog/getBlog";
import { Blog } from "@prisma/client";
import next from "@/resourse/images/Arrow/Next.png";
import pre from "@/resourse/images/Arrow/Previous.png";
import AOS from 'aos';
import Link from "next/link";
import { useRouter } from "next/navigation";

interface CarouselProps {
  items: JSX.Element[];
  initialScroll?: number;
}

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-[95%] overflow-x-scroll overscroll-x-auto py-5 scroll-smooth [scrollbar-width:none]"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"
            )}
          ></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4",
              "w-[95%] mx-auto" // remove max-w-4xl if you want the carousel to span the full width of its container
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="last:pr-[5%] rounded-3xl"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="md:flex hidden justify-end gap-2 mr-10">
        <div className="absolute hidden w-[20vw] md:flex justify-between -bottom-8 left-1/2 transform -translate-x-1/2  space-x-2 z-20">
          <button
            className="bg-blue-700 bg-opacity-30 backdrop-blur-sm border-none w-8 h-10 text-blue-500 hover:border-blue-400 rounded-full disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <Image height={50} width={50} src={pre} alt="" />
          </button>
          <button
            className="bg-blue-700 bg-opacity-30 backdrop-blur-sm border-none w-8 h-10 text-blue-500 hover:border-blue-400 rounded-full disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
              <Image height={50} width={50} src={next} alt="" />
          </button>
        </div>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  id,
  type,
  image,
  index,
  layout = false,
}: {
  id: string ;
  type: string;
  image: any;
  index: number;
  layout?: boolean;
}) => {

  useEffect(() => {
    AOS.init({
      duration: 1200, // Set the default animation duration
    });
  }, []);
  const router = useRouter();

  const clickHandle = () => {
    const queryParams = new URLSearchParams();
    queryParams.append('type', type);
    router.push(`/blog/type?${queryParams.toString()}`);
  };
  return (
    <div onClick={clickHandle}>
      <motion.button
        layoutId={layout ? `card-${type}` : undefined}
        className="rounded-3xl bg-gradient-to-b from-[#1E1E20] to-[#0E0E11] dark:bg-neutral-900 h-40 w-56 md:h-[20rem] md:w-96 overflow-hidden flex flex-col items-start justify-end relative z-10 transition-transform duration-50"
        whileHover={{ scale: 1, x: 0, y: -20 }}  // Adjust the x and y values as needed
        data-aos="fade"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-delay="100"
      >
        <div className="absolute h-full top-0 inset-x-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-30 pointer-events-none" />
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={layout ? `title-${type}` : undefined}
            className="text-white text-xl md:text-3xl font-semibold max-w-xs text-left [text-wrap:balance] font-sans mt-2"
          >
            {type}
          </motion.p>
        </div>
        <BlurImage
          src={image}
          alt={type}
          fill
          className="object-cover absolute z-10 inset-0"
        />
      </motion.button>
    </div>
  );
};


export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: ImageProps) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300 w-1/2 h-[300px]",
        isLoading ? "blur-sm" : "blur-0",
        className
      )}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={typeof src === "string" ? src : undefined}
      alt={alt ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
