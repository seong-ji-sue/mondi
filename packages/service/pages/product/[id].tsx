import React, { useEffect, useRef, useState } from "react";
import Head from 'next/head'
import { useRouter } from "next/router";
import axios from "axios";
import { DetailHeader } from "@components/Header";
import styled from "styled-components";
import { productStateToButtonText, productStateToImgMessage, productStateToMessage, regionToregionName, wonComma } from "@utils/string";
import { ArrowUp, CompanyMap, Map, Money, User } from "@components/Icon";
import Color from "@utils/color";
import FloatingButton from "@components/FloatingButton";
import useAppStore from "@stores/app";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100% - 120px);
  padding: 50px 0 70px 0;
  background-color: #fff;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
`;

const ColumnContainer = styled.div<{ containerStyle?: string }>`
  display: flex;
  flex-direction: column;
  ${({ containerStyle }) => containerStyle};
`;

const RowContainer = styled.div<{ containerStyle?: string }>`
  display: flex;
  align-items: center;
  ${({ containerStyle }) => containerStyle};
`;

const Text = styled.span<{ textStyle?: string }>`
  ${({ textStyle }) => textStyle};
`;

const TextDivision = styled.div`
  margin: 0 10px;
  width: 1px;
  height: 10px;
  background-color: #D6D6D6
`;

const ImageContainer = styled.div`
  position: relative;
  width: 86px;
  height: 86px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px;
`;

const ImageOverlayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  white-space: pre-line;
`;

const DivisionContainer = styled.div`
  width: 100%;
  height: 6px;
  background-color: #E9E9E9;
`;

const ContentSelectContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: #fff;
`;

const ContentSelector = styled.div<{ selected: boolean }>`
  flex: 1;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  ${({ selected }) => selected ? `
    color: #000;
    border-bottom: 2px solid #000;
  ` : `
    color: #666;
    border-bottom: 1px solid #E1E1E1;
    cursor: pointer;
  `}
`;

const DetailContentContainer = styled.div`
  padding: 40px 20px;
  white-space: pre-wrap;
  word-break: keep-all;
  font-size: 14px;
`;

const CompanyInfoContainer = styled.div`
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
`;

const CompanyMapContainer = styled.div`
  width: fit-content;
  text-decoration: none;
  border: 1px solid #3472F5;
  border-radius: 4px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const CompanyMapButton = styled.span`
  margin-left: 10px;
  color: #2B5BC1;
  font-size: 14px;
`;

const FooterButton = styled.div<{ isRecruit: boolean }>`
  position: fixed;
  bottom: 0;
  ${({ isRecruit }) => isRecruit ? `
    background-color: ${Color.THEME};
    cursor: pointer;
  ` : `
    background-color: #B7B7B7;
  `}
  border-radius: 4px;
  z-index: 100;
  max-width: 640px;
  width: calc(100% - 12px);
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  border: 6px solid #eee;
`;

const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Client.IProduct | null>(null);
  const [selectedContent, setSelectedContent] = useState<number>(0);
  const containerElement = useRef<HTMLDivElement>(null);
  const selectContentRef = useRef<HTMLDivElement>(null);
  const selectContentSticky = useRef<number>(0);
  const detailContentRef = useRef<HTMLDivElement>(null);
  const detailContentSticky = useRef<number>(0);
  const companyInfoRef = useRef<HTMLDivElement>(null);
  const companyInfoSticky = useRef<number>(0);

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/product/detail", { params: { id } })
      .then(res => {
        setProduct(res.data.product);
      })
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    if (!product) {
      return;
    }
    selectContentSticky.current = selectContentRef.current?.offsetTop ?? 0;
    detailContentSticky.current = detailContentRef.current?.offsetTop ?? 0;
    companyInfoSticky.current = companyInfoRef.current?.offsetTop ?? 0;
    const onScroll = () => {
      if (window.pageYOffset > selectContentSticky.current - 50) {
        selectContentRef.current?.setAttribute("style", "position:fixed;top:50px;z-index:100;");
        containerElement.current?.setAttribute("style", "padding-top:calc(50px + 40px);");
      } else {
        selectContentRef.current?.removeAttribute("style");
        containerElement.current?.removeAttribute("style");
      }
      if (window.pageYOffset >= companyInfoSticky.current - 90) {
        setSelectedContent(1);
      } else if (window.pageYOffset >= detailContentSticky.current - 90) {
        setSelectedContent(0);
      }
    }
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    }
  }, [product]);

  useEffect(() => {
    switch (product?.state) {
      case 2:
        useAppStore.setState({ alertMessage: "오픈예정이니 조금만 기다려주세요!" });
        break;
      case 3:
        useAppStore.setState({ alertMessage: "마감되었어요 T.T" });
        break;
    }
  }, [product?.state]);

  if (!product) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <DetailHeader />
      <Container ref={containerElement}>
        <ProductContainer>
          <RowContainer containerStyle="justify-content:space-between;">
            <ColumnContainer containerStyle="flex:1;margin-right:20px;">
              <RowContainer containerStyle="margin-bottom:14px;">
                <Text textStyle={`color:${product.state === 1 ? Color.THEME : "#BFBFBF"};font-size:12px;font-weight:700`}>
                  {productStateToMessage(product.state)}
                </Text>
                <TextDivision />
                <Text textStyle="color:#666;font-size:12px;">{product.company?.name}</Text>
                <TextDivision />
                <Text textStyle="color:#666;font-size:12px;">{product.categories?.map(category => category.name)?.join(", ")}</Text>
              </RowContainer>
              <Text textStyle="color:#222;font-size:16px;font-weight:500;margin-bottom:8px;">
                {product.title}
              </Text>
            </ColumnContainer>
            <ImageContainer>
              <Image src={product.images?.[0]?.url ?? ""} />
              {product.state !== 1 && <ImageOverlayContainer>{productStateToImgMessage(product.state)}</ImageOverlayContainer>}
            </ImageContainer>
          </RowContainer>
          <RowContainer>
            <Text textStyle="color:#FF301D;font-family:Roboto;font-size:24px;font-weight:700;">
              {100 - Math.ceil(product.discountCost / product.cost * 100)}%
            </Text>
            <Text textStyle="margin-left:8px;font-family:Roboto;color:#C0C0C0;font-size:14px;text-decoration:line-through">
              {wonComma(product.cost)}
            </Text>
          </RowContainer>
          <RowContainer containerStyle="align-items:flex-end;margin-bottom:24px;">
            <Text textStyle="color:#000;font-family:Roboto;font-size:18px;font-weight:700;">
              {wonComma(product.discountCost)}
            </Text>
            <Text textStyle="margin-left:2px;color:#000;font-size:12px;">원</Text>
          </RowContainer>
          <RowContainer containerStyle="margin-bottom:12px;">
            <User />
            <Text textStyle="color:#222;font-family:Roboto;font-size:12px;font-weight:700;margin-left:4px;">{product.numOfPeople}</Text>
            <Text textStyle="color:#222;font-family:Roboto;font-size:12px;">명 같이</Text>
          </RowContainer>
          <RowContainer containerStyle="margin-bottom:12px;">
            <Map />
            <Text textStyle="color:#222;font-size:12px;margin-left:4px;">
             {product.regionDepth1?.name ? `
              ${product.regionDepth1.name}
              ${product.regionDepth2?.name ? ` ${product.regionDepth2.name}` : ""}
              ${product.regionDepth3?.name ? ` ${product.regionDepth3.name}` : ""}
            ` : "온라인"}
            </Text>
          </RowContainer>
          <RowContainer>
            <Money />
            <Text textStyle="color:#222;font-size:12px;margin-left:4px;">매칭 후 현장에서 직접 결제해요.</Text>
          </RowContainer>
        </ProductContainer>
        <DivisionContainer />
        <ContentSelectContainer ref={selectContentRef}>
          <ContentSelector
            selected={selectedContent === 0}
            onClick={() => {
              window.scrollTo({
                top: detailContentSticky.current - 90,
                behavior: "smooth"
              });
            }}
          >
            상세정보
          </ContentSelector>
          <ContentSelector
            selected={selectedContent === 1}
            onClick={() => {
              window.scrollTo({
                top: companyInfoSticky.current - 90,
                behavior: "smooth"
              });
            }}
          >
            업체정보
          </ContentSelector>
        </ContentSelectContainer>
        <DetailContentContainer ref={detailContentRef}>
          {product.detailContent}
        </DetailContentContainer>
        <DivisionContainer />
        <CompanyInfoContainer ref={companyInfoRef}>
          <Text textStyle="font-size:16px;font-weight:500;margin-bottom:10px;">업체정보</Text>
          <Text textStyle="font-size:14px;font-weight:500;color:#666;margin-bottom:10px;">{product.companyName}</Text>
          <CompanyMapContainer>
            <CompanyMap />
            <CompanyMapButton>지도보기</CompanyMapButton>
          </CompanyMapContainer>
        </CompanyInfoContainer>
      </Container>
      <FloatingButton
        containerStyle="bottom:70px"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        element={<ArrowUp />}
      />
      <FooterButton isRecruit={product.state === 1}>{productStateToButtonText(product.state)}</FooterButton>
    </>
  )
}

export default Product;