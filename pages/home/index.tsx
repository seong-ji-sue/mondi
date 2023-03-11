import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Product from "@components/Product";
import styled from "styled-components";
import { HomeHeader } from "@components/Header";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { ArrowUp, Check } from "@components/Icon";
import InfiniteScroll from "react-infinite-scroll-component";
import useProductStore, { defaultCategories } from "@stores/product";
import Color from "@utils/color";
import FloatingButton from "@components/FloatingButton";

SwiperCore.use([Autoplay]);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100% - 67px);
  padding-top: 67px;
  background-color: #fff;
`;

const BannerSwiperContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;
`;

const BannerContainer = styled.div`
  position: relative;
  ::after {
    display: block;
    content: "";
    padding-bottom: 31.25%;
  }
  background-color: #D9D9D9;
  border-radius: 10px;
`;

const BannerImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
`;

const BannerPaginationContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 50px;
  z-index: 10;
  padding: 6px 12px;
  font-family: Roboto;
  font-weight: 700;
  font-size: 10px;
  color: #fff;
`;

const BannerPageTotalText = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
`;

const ProductTitleText = styled.span`
  font-weight: 700;
  font-size: 14px;
  color: #20170D;
  margin-bottom: 12px;
  padding: 0 20px;
`;

const CategoryContainer = styled.div`
  display: flex;
  white-space: nowrap;
  overflow: scroll;
  padding: 0 20px 17px 20px;
  max-width: calc(640px - 40px);
  width: calc(100% - 40px);
  background-color: #fff;
  border-bottom: 1px solid #fff;
`;

const CategoryItem = styled.div<{ selected: boolean, isLast: boolean }>`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 12px;
  ${({ selected }) => selected ? `
    color: #fff;
    font-weight: 500;
    background-color: ${Color.THEME};
  ` : `
    color: #666;
    background-color: #fff;
    border: 1px solid #E3E3E3;
    cursor: pointer;
  `}
  margin-right: ${({ isLast }) => isLast ? 0 : 6}px;
  border-radius: 50px;
`;

const CategoryItemIcon = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 4px;
`;

const FilterRecruitContainer = styled.div`
  position: relative;
  width: fit-content;
  display: flex;
  font-size: 12px;
  color: #666;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;
  margin-top: 18px;
`;

const FilterRecruitIconContainer = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  background-color: ${({ checked }) => checked ? "#1A5AFF" : "#fff"};
  border: 1px solid ${({ checked }) => checked ? "#1A5AFF" : "#999"};
  border-radius: 2px;
  margin-right: 6px;
`;

const EmptyContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 15px;
  color: #20170D;
`;

const Home = () => {
  const router = useRouter();
  const banners = useProductStore(state => state.banners);
  const selectedRegion = useProductStore(state => state.selectedRegion);
  const categories = useProductStore(state => state.categories);
  const selectedCategory = useProductStore(state => state.selectedCategory);
  const products = useProductStore(state => state.products);
  const recruitChecked = useProductStore(state => state.recruitChecked);
  const [bannerActiveIndex, setBannerActiveIndex] = useState<number>(0);
  const containerElement = useRef<HTMLDivElement>(null);
  const categoryElement = useRef<HTMLDivElement>(null);
  const categorySticky = useRef<number>(0);


  useEffect(() => {
    axios.get("/api/banner")
      .then(res => {
        useProductStore.setState({ banners: res.data.banners });
      })
      .catch(() => {});
    axios.get("/api/category")
      .then(res => {
        useProductStore.setState({
          categories: [
            ...defaultCategories,
            ...res.data.categories
          ]
        });
      })
      .catch(() => {});
  }, []);
  
  useEffect(() => {
    const onResize = () => {
      if (categoryElement.current?.offsetTop && categoryElement.current.offsetTop > 67) {
        categorySticky.current = categoryElement.current.offsetTop;
      }
    }
    onResize();
    window.addEventListener("resize", onResize);

    const onScroll = () => {
      if (window.pageYOffset > categorySticky.current - 67) {
        categoryElement.current?.setAttribute("style", "position:fixed;top:67px;z-index:100;border-bottom:1px solid #E6E6E6;");
        containerElement.current?.setAttribute("style", "padding-top:calc(67px + 53.5px);");
      } else {
        categoryElement.current?.removeAttribute("style");
        containerElement.current?.removeAttribute("style");
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    }
  }, [banners]);

  useEffect(() => {
    if (selectedRegion === undefined || selectedCategory === undefined) {
      return;
    }
    axios.get("/api/product", {
      params: {
        regionId: selectedRegion?.id,
        categoryId: selectedCategory?.id,
        recruitChecked
      }
    })
    .then(res => {
      useProductStore.setState({
        products: res.data.products
      });
    })
    .catch(() => {});
  }, [selectedRegion?.id, selectedCategory?.id, recruitChecked]);

  return (
    <>
      <HomeHeader />
      <Container ref={containerElement}>
        {banners.length > 0 &&
          <BannerSwiperContainer>
            {banners.length > 1 ?
              <Swiper
                onActiveIndexChange={swiper => setBannerActiveIndex(swiper.realIndex)}
                loop
                autoplay={{ delay: 5000, disableOnInteraction: false }}
              >
                {banners.map((banner, index) => {
                  return (
                    <SwiperSlide key={`banner_${index}`}>
                      <BannerContainer>
                        <BannerImage src={banner.url} />
                      </BannerContainer>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
              :
              <BannerContainer>
                <BannerImage src={banners?.[0]?.url} />
              </BannerContainer>
            }
            <BannerPaginationContainer>
              {bannerActiveIndex + 1}<BannerPageTotalText>
              {` / ${banners.length}`}</BannerPageTotalText>
            </BannerPaginationContainer>
          </BannerSwiperContainer>
        }
        <ProductTitleText>같이 구매할 상품</ProductTitleText>
        <CategoryContainer ref={categoryElement}>
          {categories.map((category, index) => {
            return (
              <CategoryItem
                key={`category_${index}`}
                selected={category.id === selectedCategory.id}
                isLast={index === categories.length - 1}
                onClick={() => useProductStore.setState({ selectedCategory: category })}
              >
                {category.imgUrl && <CategoryItemIcon src={category.imgUrl} />}
                {category.name}
              </CategoryItem>
            )
          })}
        </CategoryContainer>
        <FilterRecruitContainer
          onClick={() => {
            useProductStore.setState(state => ({
              recruitChecked: !state.recruitChecked
            }));
          }}
        >
          <FilterRecruitIconContainer checked={recruitChecked}>
            <Check />
          </FilterRecruitIconContainer>
          모집중인 글만 볼래요
        </FilterRecruitContainer>
        {products.length > 0 ?
          <InfiniteScroll
            hasMore={false}
            dataLength={products.length} 
            next={() => {}}
            loader={null}
          >
            {products.map((product, index) => {
              return (
                <Product
                  key={`product_${index}`}
                  product={product}
                  onClick={() => {
                    router.push(`/product/${product.id}`)
                  }}
                />
              )
            })}
          </InfiniteScroll>
          :
          <EmptyContainer>상품을 준비 중 입니다.</EmptyContainer>
        }
        <FloatingButton
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          element={<ArrowUp />}
        />
      </Container>
    </>
  )
}

export default Home;