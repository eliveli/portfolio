import React from 'react';
import Text from './elements/Text';
import styled from "styled-components";

const Project = () => (
  <Section>
      <Text isTittle={true}>Projects</Text>
      <Text>My projects are ...</Text>
      <ImgContainer>
        <img width="100%" src="https://cdn.pixabay.com/photo/2020/02/04/17/07/drink-4818863_960_720.jpg" alt="project" />
        <img width="100%" src="https://cdn.pixabay.com/photo/2020/02/04/17/07/drink-4818863_960_720.jpg" alt="project" />
        <img width="100%" src="https://cdn.pixabay.com/photo/2020/02/04/17/07/drink-4818863_960_720.jpg" alt="project" />
        <img width="100%" src="https://cdn.pixabay.com/photo/2020/02/04/17/07/drink-4818863_960_720.jpg" alt="project" />
      </ImgContainer>
  </Section>
  );

export default Project;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 100%;
`
const ImgContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border: 1px solid black;
    gap: 20px;
    padding: 20px;

    @media only screen and (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`