import axios from "axios";
import React, { useEffect, useState } from "react";
import useProductStore, { defaultRegions } from "@stores/product";
import styled from "styled-components";
import { ArrowDown, ArrowLeft, BI, Check, Share } from "./Icon";
import Modal from "./Modal";
import { useRouter } from "next/router";
import useAppStore from "@stores/app";
import { regionToregionName } from "@utils/string";
import Color from "@utils/color";

const BackgroundContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Container = styled.div<{ containerStyle?: string }>`
  position: fixed;
  background-color: #fff;
  z-index: 100;
  max-width: calc(640px - 40px);
  width: calc(100% - 40px);
  height: 67px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  ${({ containerStyle }) => containerStyle};
`;

export const MainHeader = () => {
  return (
    <BackgroundContainer>
      <Container containerStyle="position:relative;">
        <BI />
      </Container>
    </BackgroundContainer>
    
  );
};

const SelectRegionContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const SelectRegionText = styled.span`
  margin-right: 12px;
  font-size: 15px;
`;

const RegionModalTitle = styled.span`
  font-size: 14px;
  margin: 20px 0;
`;

const RegionModalSelectContainer = styled.div<{ selected: boolean, isLast: boolean }>`
  display: flex;
  align-items: center;
  width: fit-content;  
  padding: 13px 24px;
  ${({ selected }) => selected ? `
    background-color: ${Color.THEME};
    color: #fff;
    font-weight: 500;
  ` : `
    color: #222;
  `}
  font-size: 14px;
  border-radius: 50px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const RegionModalSelectText = styled.span`
  margin-left: 4px;
`;

export const HomeHeader = () => {
  const regions = useProductStore(state => state.regions);
  const selectedRegion = useProductStore(state => state.selectedRegion);
  const [regionModalShow, setRegionModalShow] = useState<boolean>(false);

  useEffect(() => {
    axios.get("/api/region")
      .then(res => {
        useProductStore.setState({
          regions: [
            ...defaultRegions,
            ...res.data.regions
          ]
        });
      })
      .catch(() => {});
  }, []);

  

  return (
    <>
      <Container>
        <BI />
        <SelectRegionContainer onClick={() => setRegionModalShow(true)}>
          <SelectRegionText>{regionToregionName(selectedRegion)}</SelectRegionText>
          <ArrowDown />
        </SelectRegionContainer>
      </Container>
      {regionModalShow &&
        <Modal
          containerStyle="width:300px;align-items:center;"
          onClose={() => setRegionModalShow(false)}
          element={
            <>
              <RegionModalTitle>오픈예정이니 조금만 기다려주세요!</RegionModalTitle>
              {regions.map((region, index) => {
                const selected = region.id === selectedRegion.id;
                return (
                  <RegionModalSelectContainer
                    key={`region_${index}`}
                    selected={selected}
                    isLast={index === regions.length - 1}
                    onClick={() => {
                      useProductStore.setState({ selectedRegion: region })
                      setRegionModalShow(false);
                    }}
                  >
                    {selected && <Check />}
                    <RegionModalSelectText>{regionToregionName(region)}</RegionModalSelectText>
                  </RegionModalSelectContainer>
                )
              })}
            </>
          }
        />
      }
    </>
  );
};

export const DetailHeader = () => {
  const router = useRouter();

  return (
    <>
      <Container containerStyle="height:50px;border-bottom:1px solid #E6E6E6;">
        <ArrowLeft onClick={() => router.back()} />
        <Share
          onClick={() => {
            const textarea = document.createElement("textarea");
            textarea.value = window.location.href;
            textarea.style.top = "0";
            textarea.style.left = "0";
            textarea.style.position = "fixed";
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            useAppStore.setState({ alertMessage: "클립보드에 복사 되었습니다." })
          }}
        />
      </Container>
    </>
  );
};