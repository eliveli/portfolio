import React, { useState } from 'react';
import {Text,Icon} from './elements';
import styled, { keyframes } from "styled-components";

function Skill() {

    // props to SkillItem component
    const propsDataIcon = ["fontisto:html5","simple-icons:css3","teenyicons:javascript-outline","akar-icons:react-fill","file-icons:typescript","grommet-icons:node"];
    const propsSkillName = ["HTML","CSS","JAVASCRIPT","REACT","TYPESCRIPT","NODE.JS"];
    const propsPercent = [90,90,85,80,80,70,50];
    return (
        <Section>
            <Text isTittle={true}>Skills</Text>
            <Text>My skills are ...</Text>
            <SkillContainer>
                {Array.from({length:6}, (e,index) => 
                    <SkillItem key={`skillItem${index}`} dataIcon={propsDataIcon[index]} skillName={propsSkillName[index]} percentage={propsPercent[index]} />
                )}
            </SkillContainer>
        </Section>);
}

export default Skill;

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
    margin: 50px auto 80px;

    @media only screen and (min-width: 412px) and (max-width:600px) {
        gap: 60px;
    }
    /* 화면 너비 클 때 스킬 아이콘 재배치(한 줄에 셋 씩) */
    @media only screen and (min-width: 601px) and (max-width:767px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 80px;
        margin: 50px auto 100px;
    }
    /* 768px~ 타블렛 사이즈 */
    @media only screen and (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 110px;
        margin: 50px auto 110px;
    }

`

//각 스킬 별 컴포넌트
const SkillItem = ({dataIcon,skillName,percentage}) => {
    const [isFillUp, handleFillUp] = useState(false); // state for filling up skill box
    const handleFillBox = () => { //fill up and disappear
        handleFillUp(true);
        setTimeout(()=>handleFillUp(false),2000);
    }
        

    return (
        <SkillItemContainer onClick={handleFillBox}>
            <IconContainer>
                <Icon color="#555" dataIcon={dataIcon}></Icon>
            </IconContainer>
            <SkillName>{skillName}</SkillName>
            <SkillPercentBox>
                <SkillPercentFilled percent={percentage} isFillUp={isFillUp} />
            </SkillPercentBox>
        </SkillItemContainer>
    );
}


// api로 받는 아이콘의 크기 설정 시 다음의 두 방법 모두 가능.
// 1. <span ... data-width="100" data-height="100">
// 2. <span ... style={{width:"100px", height:"100px"}}> 
// 여기에서는 2의 방법에 styled component를 활용했고,
// 결국 화면 너비에 따라 아이콘 크기를 다르게 설정할 수 있었음(방법 2로 바꾼 이유)
const IconContainer = styled.div`
    width:65px;
    height:65px;
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
        
    @media (hover: hover) {
     &:hover {
      cursor: pointer;
     }
    }
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
// animation for filling up skill box
const fillUp = keyframes`
    from{
        clip-path: inset(0 100% 0 0);
    }
    to{
        clip-path: inset(0 0 0 0);
        background-color: orange;
    }
`
const SkillPercentFilled = styled.div`
    width: ${(props) => props.percent}%;
    background-color: #555;

    animation-name:${(props)=>props.isFillUp? fillUp : ""};
    animation-direction: normal;
    animation-duration:${(props)=>props.isFillUp? "0.9s" : "0.7s"};
    animation-fill-mode: forwards; //애니메이션 종료 후 마지막 keyframe 값 유지(중요!)

`