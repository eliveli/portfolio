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
            <a href="https://github.com/eliveli" target="_blank" rel="noopener noreferrer">
                <GithubIcon className="iconify" data-icon="uiw:github"></GithubIcon>
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

    width: 100%;
    /* 상위 element부터 width 설정해야 하위 element에 width % 로 설정 가능. */
`
const GithubIcon = styled.span`
    width: 50px;
    height: auto;
    
    color: #444;

    /* 화면 너비 작을 때 아이콘 크기 조정 */
    @media only screen and (max-width: 360px) {
        width: 40px;
    }
`
const ContactInfoContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    /* flex container 설정 */
    /* 화면 resize 될 때(반응형) 각 flex item 간격/배치 조정 */
    /* (유의) 이 때 gap을 적용하면 여기에서 추가로 item 간격이 들어가는 것 */

    margin-top: 20px;
    margin-bottom: 30px;
    width: 100%;
`


// 각 연락처 플랫폼
const ContactItem = ({dataIcon,platform}) => {
    return (
        <SkillItemContainer>
            <PlatformIcon className="iconify" data-icon={dataIcon}></PlatformIcon>
            <SkillName>{platform}</SkillName>
        </SkillItemContainer>
    );
}

ContactItem.defaultProps = {
    dataIcon: "",
    platform: "",
}

const SkillItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    width: 20%;
    min-width: 65px;
    max-width: 100px;
    /* 상위 element(flex container)에 대해 flex item으로써 width 설정 */
    /* width %로 적용 시 부모에 대한 비율/형제와의 간격을 고려 */
    /* (유의) width 100%를 넣으면 상위 element에 주었던 justify content 정렬이 안 먹힘 */
`
const PlatformIcon = styled.span`
    width:100%;
    height:auto;
    color: #666;
    /* api로 받아 와 element에 적용하는 아이콘도 width % 설정 가능 */
    /* (유의) 부모/조상 element의 width를 명확히 설정해야 함 */
`
const SkillName = styled.span`
    width: 100%;
    text-align: center;
`