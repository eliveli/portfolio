import React, { useRef } from "react";
import { Contact, Home, Navbar, Projects, Skill } from "./components";
import styled, { ThemeProvider } from "styled-components";
import theme from "./assets/styles/theme";
import GlobalStyle from "./assets/styles/GlobalStyle";

function App() {
  // 여러 개의 ref를 하나로 묶기. [ref, ref, ref]
  const sectionRef = useRef([]);
  sectionRef.current = [0, 0, 0, 0].map((element, index) => React.createRef());
  // 윗줄 끝부분 React.createRef() 가능. useRef 불가.

  // 특정 섹션으로 화면 스크롤
  function scrollTo(index) {
    sectionRef.current[index].current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Navbar handleScrollTo={scrollTo} />
        <MainPart>
          <div ref={sectionRef.current[0]} />
          <Home />
          <div ref={sectionRef.current[1]} />
          <Skill />
          <div ref={sectionRef.current[2]} />
          <Projects />
          <div ref={sectionRef.current[3]} />
          <Contact />
        </MainPart>
      </ThemeProvider>
    </>
  );
}

const MainPart = styled.main`
  max-width: 800px;
  margin: 80px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default App;
