import React from 'react';
import {Text, Icon} from './elements';
import useModal from '../hooks/useModal';
import styled from "styled-components";


export default function Contact() {

   // 플랫폼별 연락처 보여줄 모달 설정 함수 모음
  const contactModals = [useModal(),useModal(),useModal()];
  // props to ContacctItem component 
  const propsDataIcon = ["simple-icons:gmail","majesticons:messages-line","vs:kakaotalk"];
  const propsPlatform = ["메일","문자","카톡"];
  const propsContactInfo = ["elivevvv @ gmail.com","010 4935 7502","Slolo2"];

    return (
        <Section>
            <Text isTittle={true}>Contact</Text>
            <Text>Let's talk about...</Text>
            
            {/* 깃허브 링크 */}
            go to 
            <A href="https://github.com/eliveli" target="_blank" rel="noopener noreferrer">
                <GithubIcon className="iconify" data-icon="uiw:github"></GithubIcon>
            </A>

            {/* 플랫폼별 연락처 */}
            <ContactInfoContainer>
                {Array.from({length:3}, (e,index) => 
                    <ContactItem key={`contactItem${index}`} dataIcon={propsDataIcon[index]} platform={propsPlatform[index]} contactInfo={propsContactInfo[index]} isContactInfo={contactModals[index].isModal} handleContactInfo={contactModals[index].handleModal} />
                )}
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
const A = styled.a`
  &:hover{
    cursor: pointer;
    opacity: 0.5;
  }
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


// 각 연락처 플랫폼. 아이콘 클릭 시 연락처 open or close
const ContactItem = (props) => {
    const {dataIcon,platform,contactInfo,isContactInfo,handleContactInfo} = props;
    return (
        // onClick 이벤트핸들러 component 적용 가능. not only element
        <SkillItemContainer onClick={handleContactInfo}>
            <Icon dataIcon={dataIcon} color="#666" ></Icon>
            <SkillName>{platform}</SkillName>
            {isContactInfo && 
             <OpenedInfoBox>
                 <OpenedInfo>{contactInfo}</OpenedInfo>
             </OpenedInfoBox> }
            {/* 바로 윗줄, 새로 추가되는 노드는 컴포넌트 맨 위에 위치하면(두 줄 위로 이동 시) 적용 안 됨(추가정보필요) */}
        </SkillItemContainer>
    )}


const SkillItemContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    position: relative;
    
    width: 20%;
    min-width: 65px;
    max-width: 100px;
    /* 상위 element(flex container)에 대해 flex item으로써 width 설정 */
    /* width %로 적용 시 부모에 대한 비율/형제와의 간격을 고려 */
    /* (유의) width 100%를 넣으면 상위 element에 주었던 justify content 정렬이 안 먹힘 */

    &:hover{
    cursor: pointer;
    opacity: 0.5;
  }
`

// 아이콘 클릭 시 보여줄 정보
const OpenedInfoBox = styled.div`
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.8);

    display: flex;
    justify-content: center;
    align-items: center;
`
const OpenedInfo = styled.p`
    color: black;
    z-index: 2;
    text-align: center;
    font-size: 25px;
    font-weight: 900;
`
const SkillName = styled.span`
    width: 100%;
    text-align: center;
`