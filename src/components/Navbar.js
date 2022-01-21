import React from 'react';
import styled from 'styled-components';

export default function Navbar() {
  return (
    <NavBar>
        <img src="" alt="logo"></img>
        <Ul>
            <Li><A href="#">Home</A></Li>
            <Li><A href="#">Projects</A></Li>
            <Li><A href="#">Skills</A></Li>
            <Li><A href="#">Contact</A></Li>
        </Ul>
    </NavBar>
  )
}

const NavBar = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    /* position fixed 설정 후 top left right 0을 적용해야 다음 줄의 flex 적용 가능(박스가 숨 쉬게 하자..ㅋㅋ) */
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
const A = styled.a`
    text-decoration: none;
`