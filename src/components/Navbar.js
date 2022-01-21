import React from 'react';
import styled from 'styled-components';

export default function Navbar({handleScrollTo}) {

  return (
    <NavBar>
        <img src="" alt="logo"></img>
        <Ul>
            <Li><span onClick={()=>handleScrollTo(0)}>Home</span></Li>
            <Li><span onClick={()=>handleScrollTo(1)}>Projects</span></Li>
            <Li><span onClick={()=>handleScrollTo(2)}>Skills</span></Li>
            <Li><span onClick={()=>handleScrollTo(3)}>Contact</span></Li>
        </Ul>
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
`
const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`
const Li = styled.li`
    display: inline;
    margin-left: 24px;
`