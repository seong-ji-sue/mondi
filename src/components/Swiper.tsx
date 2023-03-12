import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { Swiper as SwiperSlideContainer, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const Container = styled.div`
  width: 100%;
  margin-bottom: 60px;
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const PaginationContainer = styled.div`
  display: flex;
`;

const PaginationDotContainer = styled.div<{ isActive: boolean; isLast: boolean }>`
  ${({ isActive }) => isActive ? `
    width: 30px;
    height: 12px;
    background-color: #222;
  ` : `
    width: 12px;
    height: 12px;
    background-color: #d1d1d1;
  `}
  margin-right: ${({ isLast }) => isLast ? 0 : 10}px;
  border-radius: 50px;
`;

const Swiper = ({
  type,
  sliders
}: {
  type: string;
  sliders: ReactElement[];
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <>
    <Container>
      <SwiperSlideContainer
        onActiveIndexChange={swiper => setActiveIndex(swiper.realIndex)}
        loop
      >
        {sliders.map((slider, index) => {
          return (
            <SwiperSlide key={`slider_${type}_${index}`}>
              <SliderContainer>
                {slider}
              </SliderContainer>
            </SwiperSlide>
          )
        })}
      </SwiperSlideContainer>
    </Container>
      <PaginationContainer>
        {sliders.map((_, index) => {
          return (
            <PaginationDotContainer
              key={`pagination_${type}_${index}`}
              isActive={index === activeIndex}
              isLast={index === sliders.length - 1}
            />
          )
        })}
      </PaginationContainer>
    </>
  )
}

export default Swiper;