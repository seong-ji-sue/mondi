import React, { MouseEventHandler } from "react";
import { productStateToImgMessage, productStateToMessage, wonComma } from "@utils/string";
import styled from "styled-components";
import Color from "@utils/color";
import { User } from "./Icon";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  background: #FFFFFF;
  border-bottom: 1px solid #D1D1D1;
  cursor: pointer;
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
  white-space: pre-wrap;
`;

const Product = ({
  product,
  onClick
}: {
  product: Client.IProduct;
  onClick?: MouseEventHandler<Element>
}) => {
  return (
    <Container onClick={onClick}>
      <RowContainer containerStyle="margin-bottom:5px;justify-content: space-between;">
        <ColumnContainer>
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
          <RowContainer>
            <User />
            <Text textStyle="color:#222;font-family:Roboto;font-size:12px;font-weight:700;margin-left:4px;">{product.numOfPeople}</Text>
            <Text textStyle="color:#000;font-size:12px;">명 같이</Text>
          </RowContainer>
        </ColumnContainer>
        <ImageContainer>
          <Image src={product.images?.[0]?.url ?? ""} />
          {product.state !== 1 && <ImageOverlayContainer>{productStateToImgMessage(product.state)}</ImageOverlayContainer>}
        </ImageContainer>
      </RowContainer>
      <RowContainer containerStyle="align-items:flex-end;">
        <Text textStyle="color:#FF301D;font-family:Roboto;font-size:18px;font-weight:700;">
          {100 - Math.ceil(product.discountCost / product.cost * 100)}%
        </Text>
        <Text textStyle="margin-left:4px;font-family:Roboto;color:#C0C0C0;font-size:14px;text-decoration:line-through">
          {wonComma(product.cost)}
        </Text>
        <Text textStyle="margin-left:8px;font-family:Roboto;color:#000;font-size:16px;font-weight:700;">
          {wonComma(product.discountCost)}
        </Text>
        <Text textStyle="margin-left:2px;color:#000;font-size:12px;">원</Text>
      </RowContainer>
    </Container>
  )
}

export default Product;