import React from 'react';
import Text from '../elements/Text';
import styled from "styled-components";

export default function Project() {
  return (
  <Section>
      <Text isTittle={true}>Projects</Text>
      <Text>My projects are ...</Text>
  </Section>);
}

const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`