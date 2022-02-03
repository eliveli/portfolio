import React from 'react';
import Text from './elements/Text';
import styled from "styled-components";
import ProjectModal from "./ProjectModal";
import useModal from '../hooks/useModal';
import { projectInfo } from '../assets/projectInfo';
import webtooni from "../assets/webtooni_main.jpg"

const Projects = () => {
  
  // 프로젝트별 이미지
  const projectImgs = [webtooni,webtooni,webtooni,webtooni];
  
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
        
          <Img key={`ProjectImg${index}`} width="100%" src={projectImgs[index]} alt="projectImg" onClick={projectModals[index].handleModal}/>
        )}

        {/* 활성화되는 모달 */}
        {trueModalIndex !== -1 && 
        <ProjectModal projectInfo={projectInfo[trueModalIndex]}
            closeModal={projectModals[trueModalIndex].handleModal}
            isProjectModal={projectModals[trueModalIndex].isModal}
            isProjectShow={projectModals[trueModalIndex].isShowModal} />
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
    gap: 20px;
    padding: 20px;
    box-sizing: border-box;

    @media only screen and (max-width: 760px) {
        grid-template-columns: 1fr;
    }
`

const Img = styled.img`
  box-sizing: border-box;
  box-shadow: 0 0 4px #666;
  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.5;
      box-shadow: 0 0 4px orange;
    }
  }
`