/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import HeroCard from '@components/cards/HeroCard';
import HeroCardSkeleton from '@components/cardsSkeleton/HeroCardSkeleton';
import { useAnime } from '@context/animeContext';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

function HeroSection() {
  const { animeData, loading, error } = useAnime();
  const [spotlights, setSpotlights] = useState();

  const [swiper, setSwiper] = useState();
  useEffect(() => {
    if (animeData?.spotlights) {
      setSpotlights(animeData.spotlights);
    }
  }, [animeData]);

  return (
    <Swiper
      className="mb-7 my-container"
      // modules={[Pagination]}
      modules={[Autoplay]}
      // spaceBetween={50}
      slidesPerView={1}
      autoplay={{
        delay: 3000, // duration between slides
        disableOnInteraction: true, // disable autoplay on user manual slide
      }}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => setSwiper(swiper)}
    >
      {loading ? (
        <SwiperSlide>
          <div className="relative h-[300px] sm:h-[350px] md:h-[450px] lg:h-[600px] w-full rounded-lg overflow-hidden">
            <HeroCardSkeleton />
          </div>
        </SwiperSlide>
      ) : (
        spotlights &&
        spotlights.map((anime, index) => {
          return (
            <SwiperSlide key={anime.id}>
              <div className="relative h-[300px] sm:h-[350px] md:h-[450px] lg:h-[600px] w-full">
                <HeroCard anime={anime} index={index + 1} />
                <div className="absolute bottom-10 right-5 hidden sm:flex flex-col z-2 items-center gap-2">
                  <FaChevronRight
                    className="text-white text-2xl size-12 rounded-xl bg-white/10 backdrop-blur-2xl cursor-pointer p-3 hover:text-black hover:bg-secondary transition-colors duration-300"
                    onClick={() => swiper.slideNext()}
                  />
                  <FaChevronLeft
                    className="text-white text-2xl size-12 rounded-xl bg-white/10 backdrop-blur-2xl cursor-pointer p-3 hover:text-black hover:bg-secondary transition-colors duration-300"
                    onClick={() => swiper.slidePrev()}
                  />
                </div>
              </div>
            </SwiperSlide>
          );
        })
      )}
    </Swiper>
  );
}

export default HeroSection;
