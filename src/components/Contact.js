import React from 'react';
import Text from '../elements/Text';
import styled from "styled-components";

export default function Contact() {
    return (
        <Section>
            <Text isTittle={true}>Contact</Text>
            <Text>Let's talk about...</Text>
        </Section>);
      }

const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`