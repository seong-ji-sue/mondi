import React, { ReactElement } from "react";
import Color from "src/utils/color";
import { wonComma } from "src/utils/string";
import styled from "styled-components";

const Container = styled.div<{ containerStyle?: string }>`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  ${({ containerStyle }) => containerStyle};
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 148px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F5F5F7;
`;

const Image = styled.img<{ imageStyle?: string }>`
  object-fit: contain;
  ${({ imageStyle }) => imageStyle};
`;

const DescContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #E5E5EA;
`;

const BenefitIcon =  styled.span`
  background: #fff;
  border: 0.5px solid rgba(0, 161, 44, 0.43);
  border-radius: 6px;
  font-weight: 500;
  font-size: 10px;
  @media all and (max-width: 359px) { zoom: 0.8; }
  zoom: 0.9;
  color: ${Color.THEME};
  padding: 4px 6px;
`;

const ContentContainer = styled.div`
  flex: 1;
  padding: 16px;
`;

const TextContainer = styled.div<{ containerStyle?: string }>`
  display: flex;
  align-items: center;
  ${({ containerStyle }) => containerStyle};
`

const Text = styled.div<{ textStyle?: string }>`
  font-size: 12px;
  font-weight: 400;
  ${({ textStyle }) => textStyle};
`;

const Button = styled.div<{ disable: boolean }>`
  display: flex;
  justify-content: center;
  padding: 16px;
  margin-top: 8px;
  font-size: 15px;
  font-weight: 500;
  color: #fff;
  background: ${({ disable }) => disable ?  "#414141" : Color.THEME};
`;

const MainProduct = ({
  containerStyle,
  imageSrc,
  imageStyle,
  message,
  benefitCount,
  name,
  spec,
  originPrice,
  priceTitle,
  price,
  buttonText,
  buttonDisable
}: {
  containerStyle: string;
  imageSrc: string;
  imageStyle?: string;
  message: ReactElement;
  benefitCount: number;
  name: string;
  spec: string;
  originPrice: number;
  priceTitle: string;
  price: number;
  buttonText: string;
  buttonDisable: boolean;
}) => {
  const discountPercent = Math.floor((1 - price / originPrice) * 100);

  return (
    <Container containerStyle={containerStyle}>
      <ImageContainer><Image alt="" src={imageSrc} imageStyle={imageStyle} /></ImageContainer>
      <DescContainer>
        {message}
        <BenefitIcon>{`추가혜택+${benefitCount}`}</BenefitIcon>
      </DescContainer>
      <ContentContainer>
        <Text textStyle="font-weight: 700; font-size: 16px; color: #000; margin-bottom: 10px;">{name}</Text>
        <Text textStyle="color: #808182; margin-bottom: 19px; @media all and (max-width: 359px) { font-size: 10px; } ">{spec}</Text>
        <TextContainer containerStyle="margin-bottom: 6px;">
          <Text textStyle="color: #808182; margin-right: 15px;">정상가</Text>
          <Text textStyle="color: #B0B0B9;">{wonComma(originPrice)}원</Text>
        </TextContainer>
        <TextContainer>
          <Text textStyle={`color: ${Color.THEME}; margin-right: 15px;`}>{priceTitle}</Text>
          <Text textStyle="font-size: 16px; color: #3E3E46; font-weight: 700; margin-right: 7px;">{wonComma(price)}원</Text>
          <Text textStyle={`font-size: 16px; font-weight: 700; color: ${Color.THEME};`}>{discountPercent}%</Text>
        </TextContainer>
      </ContentContainer>
      <Button disable={buttonDisable}>{buttonText}</Button>
    </Container>
  )
}

export default MainProduct;