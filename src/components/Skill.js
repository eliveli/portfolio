import React from 'react';
import Text from '../elements/Text';
import styled from "styled-components";

export default function Skill() {
    return (
        <Section>
            <Text isTittle={true}>Skills</Text>
            <Text>My skills & tools ...</Text>
        </Section>);
}

const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`