import React from "react";
import styled from "styled-components";
import Product from "@components/Product";
import { ArrowLeft, Export } from "@components/Svg";
import { useRouter } from "next/router";

const VoteContainer = styled.div`
  display:flex;
  padding: 25px 0 25px 16px;
`

const VoteTitle = styled.aside`
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: -0.408px;
  color: #48484D;
`

const VotingDeadline = styled.p`
  margin:0 0 0 25px;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 100%;
  letter-spacing: -0.408px;
  color: #48484D;
`
const VotePeriod = styled.p`
  margin:8px 0 0 25px;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 100%;
  letter-spacing: -0.408px;
  color: #B5B5B8;
`

const MenuContainer = styled.div`
  display:flex;
  justify-content:space-around;
  border-bottom:1px solid black;
  padding:8px 0 11px 0;
  
`

const MenuFirst = styled.p`
  cursor:pointer;
  margin:0px;
  font-style: normal;
  font-weight: 600;
  font-size: 13px;
  line-height: 100%;
  letter-spacing: -0.078px;
  color: #48484D;
`

const productStyle = {
  borderBottom:'1px #DADADC solid',
}

const menuInfo = [
  '상세정보',
  '이용절차',
  '유의사항'
]

const Detail = () => {
  const router = useRouter();

  return(
    <div>
      <div style={{position:'relative'}}>
        <ArrowLeft style={{ position: 'absolute',top:'20px', left:'10px',zIndex:100}} onClick={()=>{router.push('/app')}} />
        <Export style={{ position: 'absolute',top:'20px', right:'20px',zIndex:100}} onClick={()=>{alert('공유하기 준비중')}} />
      </div>
      <Product style={productStyle} activate={false} />
      <VoteContainer style={{background:'white'}}>
        <VoteTitle>투표기간</VoteTitle>
        <section>
          <VotingDeadline>투표마감 4일전</VotingDeadline>
          <VotePeriod>2023년 3월 22 - 2023년 3월 26일</VotePeriod>
        </section>
      </VoteContainer>
      <MenuContainer style={{background:'white'}}>
        {menuInfo.map((menu,index)=>{
          return (<MenuFirst key={`menu-${index}`} onClick={()=>{alert('메뉴이동')}}>{menu}</MenuFirst>)
        })}
      </MenuContainer>
    </div>

  )
}

export default Detail;