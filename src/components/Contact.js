import React from 'react';
import Text from './elements/Text';
import styled from "styled-components";

export default function Contact() {
    return (
        <Section>
            <Text isTittle={true}>Contact</Text>
            <Text>Let's talk about...</Text>
            
            {/* 깃허브 링크 */}
            go to 
            <a href="https://github.com/eliveli" target="_blank" rel="noreferrer">
                <span style={{color:"#444"}} class="iconify" data-icon="uiw:github" data-width="50" data-height="50"></span>
            </a>

            {/* 플랫폼별 연락처 */}
            <ContactInfoContainer>
                <ContactItem dataIcon="simple-icons:gmail" platform="메일" />
                <ContactItem dataIcon="majesticons:messages-line" platform="문자" />
                <ContactItem dataIcon="vs:kakaotalk" platform="카톡" />
            </ContactInfoContainer>
        </Section>);
      }

const Section = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`
const ContactInfoContainer = styled.div`
    display: flex;
    margin-top: 20px;
    margin-bottom: 30px;

    /* 태블릿사이즈부터 아이콘 별 간격 설정 */
    @media only screen and (min-width: 768px) {
        gap: 80px;
    }
`



const ContactItem = ({dataIcon,platform}) => {
    return (
        <SkillItemContainer>
            <PlatformIcon className="iconify" data-icon={dataIcon}></PlatformIcon>
            <SkillName>{platform}</SkillName>
        </SkillItemContainer>
    );
}

const PlatformIcon = styled.span`
    width:65px;
    height:65px;
    color: #666;

    @media only screen and (min-width: 768px) {
        width:100px;
        height:100px;
    }
`

ContactItem.defaultProps = {
    dataIcon: "",
    platform: "",
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