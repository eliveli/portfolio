import {useEffect, useRef} from 'react';
import styled, { keyframes } from 'styled-components';
import { Icon } from './elements';
import usePreventScroll from "../hooks/usePreventScroll"
import useModal, {useShowOn} from "../hooks/useModal";
import {throttle} from "lodash";

export default function Navbar({handleScrollTo}) {
  const {isModal, handleModal, isShowModal} = useModal(); //버튼 클릭하는 모바일용 모달

  usePreventScroll(isModal); // 모바일용 모달 띄운 동안 body 영역 스크롤 막기

  //navigation bar : animation show on or show off
  const {handleShow, isShowOn} = useShowOn(); //state for animation: show on or show off
  const prevScrollY = useRef(0); //이전 스크롤 Y
  
  const handleShowNavi = () => {
    const presentScrollY = document.documentElement.scrollTop;
    if (!isShowOn && presentScrollY === 0) { //scroll top then show on
      handleShow(); // show on
    } else if (!isShowOn && (presentScrollY < prevScrollY.current)) { //scroll up then show on
      handleShow(); // show on
    } else if (isShowOn && (presentScrollY > prevScrollY.current)) { //scroll down then show off
      handleShow(); // show off
    }
    prevScrollY.current = presentScrollY;
  }
  const handleThrottle = throttle(handleShowNavi, 400); // throttle 이용 렌더링 줄임
  const handleNavi = () => {
      handleThrottle();
  }
  
  useEffect(()=> {
    window.addEventListener("scroll", handleNavi);
    return ()=> window.removeEventListener("scroll", handleNavi);
  }, [isShowOn])
  // [] dependency를 빈 배열로 주면 함수가 업데이트 되지 않음.
  // 이 때 함수에서 참조하는 상태가 바뀌어도 초기 상태값을 이용함. 상태를 새롭게 읽어오지 못했음.
  // 함수 업데이트. isShowOn 을 deps 로 넣어주니 컴포넌트가 언마운트되고 다시 마운트될 때 함수가 바뀐 상태를 읽어옴

  return (
    <NavBar isShowNav={isShowOn}>

      {/* hamburger button for Mobile. click on or click off */}
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

      {/* view for tablet/desktop */}
      <UlTablet>
          {["Home","Skills","Projects","Contact"].map((section,idx)=>
            <LiTablet key={`Nav${idx}`}><NavText onClick={()=>handleScrollTo(idx)}>{section}</NavText></LiTablet>
          )}
      </UlTablet>

      {/* view for mobile */}
      {isModal && 
      <UlMobile isShowOn={isShowModal}>
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

    //navigation bar animation: show on or show off
    animation-name:${(props)=>props.isShowNav? navSlideIn : navSlideOut};
    animation-direction: normal;
    animation-duration:0.5s;
    animation-fill-mode: forwards;
        
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
  
    @media (hover: hover) { //마우스 hover만 작동. hover 불가능한 모바일 기기에서의 사이드이펙트 제거
     &:hover {
      cursor: pointer;
     }
    }
`


// animation for Navigation bar : slide in or slide out
const navSlideIn = keyframes`
  from{
    top:-80px;
  }
  to{
    top:0;
  }
`
const navSlideOut = keyframes`
  from{
    top:0;
  }
  to{
    top:-80px;;
  }
`


// animation for mobile hamburger button : slide in or slide out
const mobileSlideIn = keyframes`
  from{
    top:-100vh;
  }
  to{
    top:0;
  }
`
const mobileSlideOut = keyframes`
  from{
    top:0;
  }
  to{
    top:-100vh;
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

  animation-name:${(props)=>props.isShowOn? mobileSlideIn : mobileSlideOut};
  animation-direction: normal;
  animation-duration:0.7s;
  animation-fill-mode: forwards; //애니메이션 종료 후 마지막 keyframe 값 유지(중요!)
`
const LiMobile = styled.li`
  margin-left: 0;
`
const NavText = styled.h3`
  display: inline;
  color: white;

  @media (hover: hover) {
     &:hover {
      cursor: pointer;
      text-decoration: underline dotted 2px orange;
      color: orange;
     }
    }
  
  @media screen and (max-width: 767px) {
  }

`