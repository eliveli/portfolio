import {useState, useEffect} from 'react';
import styled, { keyframes } from 'styled-components';
import { Icon } from './elements';
import useModal from '../hooks/useModal';
export default function Navbar({handleScrollTo}) {
  const {isModal, handleModal, isShowOn} = useModal();

  return (
    <NavBar>
        {/* 모바일용 햄버거 버튼 */}
        <BurgerContainer onClick={handleModal}>
          <Icon dataIcon="charm:menu-hamburger" width="40px" height="40px" /> 
        </BurgerContainer>

        <LogoContainer>
          <img src="" alt="logo"></img>
        </LogoContainer>

        {/* 태블릿 사이즈~ 뷰*/}
        <UlTablet>
            {["Home","Skills","Projects","Contact"].map((section,idx)=>
              <LiTablet key={`Nav${idx}`}><span onClick={()=>handleScrollTo(idx)}>{section}</span></LiTablet>
            )}
        </UlTablet>

        {/* 모바일 사이즈 뷰*/}
        {isModal && 
        <UlMobile isShowOn={isShowOn}>
            {["Home","Skills","Projects","Contact"].map((section,idx)=>
              <LiMobile key={`Nav${idx}`}><span onClick={()=>{handleScrollTo(idx);handleModal();}}>{section}</span></LiMobile>
            )}
        </UlMobile>
        }
    </NavBar>
  )

}

// 조심조심(헷갈리기 쉬움) //
//   이벤트 함수 넣을 때 params를 명시할 경우 noName 함수로 넣기
//   onClick={()=>function(params)} [O]
//   onClick={    function(params)} [X] 이 경우 바로 함수를 호출하는 격.


Navbar.defaultProps = {
    handleScrollTo: ()=>{},
}

const NavBar = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /* position fixed (위) & display flex 상세설정 (아래) : 두 가지 동시 적용 시 top left right 필요(feat.박스가 숨을 못 쉬어요) */
    display: flex;
    justify-content: space-between;

    max-width: 800px;
    margin: 0 auto;

    @media screen and (max-width: 767px) {
      justify-content: center;

    }
`
const LogoContainer = styled.div`

    @media screen and (max-width: 767px) {

    }

`
const BurgerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
    @media screen and (min-width: 768px) {
      display: none;
    }
`
const UlTablet = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  @media screen and (max-width: 767px) {
    display: none;
  }
`
const LiTablet = styled.li`
  display: inline;
  margin-left: 24px;

`

// animation slide in or slide out
const slideIn = keyframes`
  from{
    left:-100vw;
  }
  to{
    left:0;
  }
`
const slideOut = keyframes`
  from{
    left:0;
  }
  to{
    left:-100vw;
  }
`
const UlMobile = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  width: 100vw;
  height: 100vh;
  background-color: rgba(120,200,100,0.8);

  animation-name:${(props)=>props.isShowOn? slideIn : slideOut};
  animation-direction: normal;
  animation-duration:0.5s;
  animation-fill-mode: forwards; //애니메이션 종료 후 마지막 keyframe 값 유지(중요!)
  
`
const LiMobile = styled.li`
  margin-left: 24px;
`