import {useState, useEffect} from 'react';
import styled, { keyframes } from 'styled-components';
import { Icon } from './elements';
import useModal from '../hooks/useModal';
export default function Navbar({handleScrollTo}) {
  const {isModal, handleModal, isShowOn} = useModal();

  // 모달 띄운 동안 body 영역 스크롤 막기
  useEffect(()=>{
    if(isModal){ //모바일 뷰 모달 적용
    document.body.style.overflow = "hidden";
    return () => {document.body.style.overflow="unset";}
    }
  }, [isModal]);

  return (
    <NavBar>
        {/* 모바일용 햄버거 버튼. 클릭 on off 구분 */}
        {!isModal &&
        <BurgerContainer onClick={handleModal}>
          <Icon dataIcon="charm:menu-hamburger" color="white" width="40px" height="40px" /> 
        </BurgerContainer>
        }
        {isModal &&
        <BurgerContainer click={true} onClick={handleModal}>
          <Icon dataIcon="charm:menu-hamburger" color="orange" width="40px" height="40px" /> 
        </BurgerContainer>
        }

        <LogoContainer>
          <img src="" alt="logo"></img>
        </LogoContainer>

        {/* 태블릿 사이즈~ 뷰*/}
        <UlTablet>
            {["Home","Skills","Projects","Contact"].map((section,idx)=>
              <LiTablet key={`Nav${idx}`}><NavText onClick={()=>handleScrollTo(idx)}>{section}</NavText></LiTablet>
            )}
        </UlTablet>

        {/* 모바일 사이즈 뷰*/}
        {isModal && 
        <UlMobile isShowOn={isShowOn}>
            {["Home","Skills","Projects","Contact"].map((section,idx)=>
              <LiMobile key={`Nav${idx}`}><NavText onClick={()=>{handleScrollTo(idx);handleModal();}}>{section}</NavText></LiMobile>
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
    box-sizing: border-box;
    padding: 16px;
    width: 100%;
    height: 80px;

    background-color: rgba(0,0,0,0.9);

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /* position fixed (위) & display flex 상세설정 (아래) : 두 가지 동시 적용 시 top left right 필요(feat.박스가 숨을 못 쉬어요) */
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 767px) {
      justify-content: center;

    }
`
const LogoContainer = styled.div`
    margin-left: 24px;
    @media screen and (max-width: 767px) {

    }

`
const BurgerContainer = styled.div`
  position: absolute;
  top: ${80/2 - 40/2}px;
  left: ${80/2 - 40/2}px;
  
  ${props=> props.click? "opacity: 0.7" : ""};

  z-index: 2;

    @media screen and (min-width: 768px) {
      display: none;
    }
  
  &:hover{
  cursor: pointer;
  }
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

const UlTablet = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  @media screen and (max-width: 767px) {
    display: none;
  }
`
const LiTablet = styled.li`
  display: inline-block;
  margin-left: 40px;

  &:last-child{
    margin-right: ${40-16}px;
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
  background-color: rgba(40,40,40,1);

  animation-name:${(props)=>props.isShowOn? slideIn : slideOut};
  animation-direction: normal;
  animation-duration:0.5s;
  animation-fill-mode: forwards; //애니메이션 종료 후 마지막 keyframe 값 유지(중요!)
  

`
const LiMobile = styled.li`
  margin-left: 0;
`
const NavText = styled.h3`
  display: inline;
  color: white;

  &:hover{
    cursor: pointer;
    text-decoration: underline dotted 2px orange;
    color: orange;
  }
  
  @media screen and (max-width: 767px) {
  }

`