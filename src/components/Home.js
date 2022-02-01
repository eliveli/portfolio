import React from 'react';
import styled from "styled-components";

const Home = () => {
  return (
    <Section>
        <HomeTittle>
            Hi! I'm a Frontend Developer, 신은혜
        </HomeTittle>
        <HomeDesc>
            let me talk to you some...
        </HomeDesc>
    </Section>
  );
}

const Section = styled.section`
    height: 100vh;
    max-height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const HomeTittle = styled.h1`

`
const HomeDesc = styled.p`

`
export default Home;