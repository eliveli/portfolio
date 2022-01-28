import React from 'react';
import Text from './elements/Text';
import styled from "styled-components";
import ProjectModal from "./ProjectModal";
import useModal from '../hooks/useModal';
import { projectInfo } from '../assets/projectInfo';
import imgEx from "../assets/ImgEx.png";

const Projects = () => {
  
  // 프로젝트별 이미지
  const projectImgs = [imgEx,imgEx,imgEx,imgEx];
  
  // 프로젝트별 모달 설정 함수 모음
  const projectModals = [useModal(),useModal(),useModal(),useModal()];
  // (참고)react hook은 함수 안에 올 수 없음(아래 방법 불가능)
  // (X) const projectModals = Array.from({length:4}, (e, idx) => useModal());

  // 모달이 활성화될 프로젝트의 index
  const trueModalIndex = projectModals.findIndex((e)=>e.isModal);

  return(
  <Section>
      <Text isTittle={true}>Projects</Text>
      <Text>My projects are ...</Text>
      <ImgContainer>
        {Array.from({length:4}, (e, index) => 
          <img key={`ProjectImg${index}`} width="100%" src={projectImgs[index]} alt="projectImg" onClick={projectModals[index].handleModal}/>
        )}

        {/* 활성화되는 모달 */}
        {trueModalIndex !== -1 && 
          <ProjectModal projectInfo={projectInfo[trueModalIndex]}
              closeModal={projectModals[trueModalIndex].handleModal} />
        }
      </ImgContainer>
  </Section>
  )
  };

export default Projects;

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