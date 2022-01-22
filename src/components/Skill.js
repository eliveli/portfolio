import React from 'react';
import Text from './elements/Text';
import styled from "styled-components";

export default function Skill() {
    return (
        <Section>
            <Text isTittle={true}>Skills</Text>
            <Text>My skills are ...</Text>
            <SkillContainer>
                <SkillItem dataIcon="fontisto:html5" skillName="HTML" percentage={90} />
                <SkillItem dataIcon="simple-icons:css3" skillName="CSS" percentage={85} />
                <SkillItem dataIcon="teenyicons:javascript-outline" skillName="JAVASCRIPT" percentage={80} />
                <SkillItem dataIcon="akar-icons:react-fill" skillName="REACT" percentage={80} />
                <SkillItem dataIcon="file-icons:typescript" skillName="TYPESCRIPT" percentage={60} />
                <SkillItem dataIcon="grommet-icons:node" skillName="NODE.JS" percentage={50} />
            </SkillContainer>
        </Section>);
}

const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    width: 100%;

`
const SkillContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;

    @media only screen and (min-width: 412px) and (max-width:600px) {
        gap: 60px;
    }
    /* 화면 너비 클 때 스킬 아이콘 재배치(한 줄에 셋 씩) */
    @media only screen and (min-width: 601px) and (max-width:767px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 80px;
        margin: 50px auto 100px;
    }
    @media only screen and (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 110px;
        margin: 50px auto 110px;
    }

    margin: 50px auto 80px;
`

//각 스킬 별 컴포넌트
const SkillItem = ({dataIcon,skillName,percentage}) => {
    return (
        <SkillItemContainer>
            <SkillIcon className="iconify" data-icon={dataIcon}></SkillIcon>
            <SkillName>{skillName}</SkillName>
            <SkillPercentBox>
                <SkillPercentFilled percent={percentage}/>
            </SkillPercentBox>
        </SkillItemContainer>
    );
}


// api로 받는 아이콘의 크기 설정 시 다음의 두 방법 모두 가능.
// 1. <span ... data-width="100" data-height="100">
// 2. <span ... style={{width:"100px", height:"100px"}}> 
// 여기에서는 2의 방법에 스타일드 컴포넌트를 활용했고,
// 결국 화면 너비에 따라 아이콘 크기를 다르게 설정할 수 있었음(방법 2로 바꾼 이유)
const SkillIcon = styled.span`
    width:65px;
    height:65px;
    color: #555;
    @media only screen and (min-width: 400px) and (max-width: 767px) {
        width:80px;
        height:80px;
    }
    @media only screen and (min-width: 768px) {
        width:100px;
        height:100px;
    }
`
SkillItem.defaultProps = {
    dataIcon: "",
    skillName: "",
    percent: 100,
}

const SkillItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    width: 100px;
`
const SkillName = styled.span`
    width: 100%;
    text-align: center;
`
const SkillPercentBox = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    background-color: lightgray;
`
const SkillPercentFilled = styled.div`
    width: ${(props) => props.percent}%;
    background-color: #555;
`