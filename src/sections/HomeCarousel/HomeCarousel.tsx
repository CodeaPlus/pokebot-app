import { FC, useEffect, useState } from 'react'
import Image from 'next/image'
import { MotionContainer } from '@/components/Motion'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { Swiper as SwiperOriginal, Autoplay, Navigation } from "swiper";
import { ProgressSlide } from '@/domain/swiper.interface'
import { LeftSquareFilled, RightSquareFilled } from '@ant-design/icons'
import { PokeUserCard } from '@/domain/pokemon.interface'

interface Props {
  cards: PokeUserCard[]
}

const HomeCarousel: FC<Props> = ({ cards }) => {
  const [swiperEl, setSwiperEl] = useState<HTMLElement>();
  const [swiperWrapper, setSwiperWrapper] = useState<HTMLElement>();

  const pointerDownSlideListener = (event: any) => {
    event.stopImmediatePropagation();
    event.preventDefault();
  };

  useEffect(() => {
    setSwiperEl(document.getElementById("carousel-swiper") || undefined);
    setSwiperWrapper(swiperEl?.querySelector(".swiper-wrapper") as HTMLElement || undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto py-28 overflow-hidden">
      <div className="flex flex-col w-full h-full justify-center items-center">
        <MotionContainer
          className="text-black font-extrabold text-5xl my-8"
          tag="h1"
          animation="fadeIn"
          delay={0.2}
        >
          LATEST CARDS
        </MotionContainer>
        <MotionContainer animation="fadeUp" delay={0.2}>
          <Swiper
            id="carousel-swiper"
            watchSlidesProgress={true}
            loop={true}
            autoplay={{
              delay: 4000
            }}
            loopedSlides={2}
            spaceBetween={10}
            slidesPerView={'auto'}
            centeredSlides={true}
            modules={[Autoplay, Navigation]}
            navigation={{
              nextEl: ".swiper-partner-next",
              prevEl: ".swiper-partner-prev",
            }}
            onBeforeTransitionStart={() => {
              const slideAnchors = swiperWrapper?.querySelectorAll("a") as NodeListOf<HTMLAnchorElement>;
              for (let i = 0; i < slideAnchors?.length; i++) {
                const slideAnchor = slideAnchors[i];
                slideAnchor.removeEventListener(
                  "pointerdown",
                  pointerDownSlideListener,
                  true
                );
                slideAnchor.addEventListener(
                  "pointerdown",
                  pointerDownSlideListener,
                  true
                );
              }
            }}
            onSetTransition={(swiper: SwiperOriginal, duration: number) => {
              for (let i = 0; i < swiper.slides.length; i += 1) {
                const slideEl = swiper.slides[i] as HTMLElement;
                const opacityEls = slideEl.querySelectorAll(
                  ".carousel-slider-animate-opacity"
                ) as NodeListOf<HTMLElement>;
                slideEl.style.transitionDuration = `${duration}ms`;
                opacityEls.forEach((opacityEl) => {
                  opacityEl.style.transitionDuration = `${duration}ms`;
                });
              }
            }}
            onProgress={(swiper: SwiperOriginal) => {
              const scaleStep = 0.21;
              const getSlideScale = (progress: number) => {
                return 1 - Math.abs(progress) * scaleStep;
              }

              const getTranslateOffsetStep = (progress: number): number => {
                if (progress < 1) {
                  return 0;
                }
                return 1 - getSlideScale(progress) + getTranslateOffsetStep(progress - 1);
              }

              const getTranslateOffset = (progress: number): number => {
                // Can get non-integer values on first render
                if (progress < 1) {
                  return 0;
                }
                return (
                  (1 - getSlideScale(progress)) * 0.5 + getTranslateOffsetStep(progress - 1)
                );
              }

              const zIndexMax = swiper.slides.length;
              for (let i = 0; i < swiper.slides.length; i += 1) {
                const slideEl = swiper.slides[i] as ProgressSlide;
                const slideProgress = slideEl.progress as number;
                const absProgress = Math.abs(slideProgress);
                const progressSign = absProgress === 0 ? 0 : slideProgress / absProgress;
                const opacityEls = slideEl.querySelectorAll(
                  '.carousel-slider-animate-opacity',
                ) as NodeListOf<HTMLElement>;
                const translate = `${progressSign * getTranslateOffset(absProgress) * 100}%`;
                const scale = getSlideScale(slideProgress) as number;
                const zIndex = zIndexMax - Math.abs(Math.round(slideProgress));
                slideEl.style.transform = `translateX(${translate}) scale(${scale})`;
                slideEl.style.zIndex = String(zIndex);
                if (absProgress > 3) {
                  slideEl.style.opacity = String(0);
                } else {
                  slideEl.style.opacity = String(1);
                }

                opacityEls.forEach((opacityEl) => {
                  opacityEl.style.opacity = (1 - absProgress / 3).toString();
                });
              }
            }}
          >
            {cards?.map((card: PokeUserCard) => {
              return (
                <SwiperSlide
                  key={card.attachmentId}
                  className="border-[1px] border-juice-gray-100 overflow-hidden rounded-2xl"
                >
                  <Image src={card.image || ''} alt="Pokemon Card" width={500} height={250} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </MotionContainer>
        <div className="flex justify-between w-[5rem] mt-4 mx-auto z-50">
          <LeftSquareFilled className='swiper-partner-prev hover:opacity-60 text-5xl cursor-pointer' />
          <RightSquareFilled className='swiper-partner-next hover:opacity-60 text-5xl cursor-pointer' />
        </div>
      </div>
    </div>
  )
}

export default HomeCarousel;