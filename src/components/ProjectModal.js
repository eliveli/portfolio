import {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import { Icon } from './elements';
export default function ProjectModal({projectInfo, closeModal}) {

    // 이미지 컨테이너의 width 값 가져오기 //
    // (~.current는 undefined라 useEffect 이용, 렌더링 이후 state 설정)
    // (state로 설정해 렌더링 이후에도 값 유지)
    const imgWidthRef = useRef();
    const [imgWidth,setImgWidth] = useState(0);
    useEffect(()=>{
        setImgWidth(imgWidthRef.current.offsetWidth);
    }, [])

    // 현재 이미지앨범 X좌표
    const [imageX, changeImageX] = useState(0);

    // 처음&마지막 이미지 X좌표 (좌우 화살표 표시 여부 결정)
    const firstImgX = 0;
    const lastImgX = -imgWidth*(projectInfo.img.length-1);

    // 이미지 슬라이드 기능 //
    // 이미지 앨범 안에 이미지 요소를 여럿 넣고 이미지앨범을 x축 방향으로 좌우 이동.
    // 이 때 이미지앨범을 감싸는 부모 컨테이너는 overflow hidden이라 부모를 벗어난 앨범 부분은 안 보임.
    // 좌우 버튼 클릭 시 imgWidth 만큼 이미지앨범 X좌표 변경, 컴포넌트 리렌더링되면서 바뀐 x좌표로 앨범 움직임

  return (
    <Background>
       <Article>
            <XContainer onClick={closeModal}>
                <Icon color="#777" dataIcon="gg:close"></Icon>
            </XContainer>

            {/* 이미지 슬라이드 */}
            <ImgContainer ref={imgWidthRef}>
                <ImgAlbum moveTo={imageX}>
                    {projectInfo.img.map((e,idx) => 
                      <ProjectImg key={e+idx} src={e} alt="project image" />
                    )}
                
                </ImgAlbum>

                <ArrowContainer presentImgX={imageX} firstImgX={firstImgX} lastImgX={lastImgX}>
                    {/* 이전 이미지 화살표(맨 처음 이미지일 때 제외) */}
                        {imageX!==firstImgX &&
                        <SizingArrowContainer onClick={()=>changeImageX(imageX+imgWidth)}>
                            <Icon color="#777" dataIcon="bx:bxs-left-arrow"></Icon>
                        </SizingArrowContainer>
                    }
                    {/* 다음 이미지 화살표(맨 끝 이미지일 때 제외) */}
                        {imageX!==lastImgX && 
                        <SizingArrowContainer onClick={()=>changeImageX(imageX-imgWidth)}>
                            <Icon color="#777" dataIcon="bx:bxs-right-arrow"></Icon>
                        </SizingArrowContainer>
                    }

                </ArrowContainer>
            </ImgContainer>

            <ProjectContainer>
                <ProjectTittle>
                    {projectInfo.tittle}
                </ProjectTittle>
                <ProjectDesc>
                    {projectInfo.desc}
                </ProjectDesc>
                <ViewButtonContainer>
                    {[{text:"사이트 보러가기",address:projectInfo.siteAddress}
                      ,{text:"깃허브 보러가기",address:projectInfo.githubAddress}
                     ].map((e)=>
                        <LinkTo href={e.address} target="_blank" rel="noopener noreferrer">
                            <ViewButton>{e.text}</ViewButton>
                        </LinkTo>
                      )
                    }
                </ViewButtonContainer>
            </ProjectContainer>
       </Article>
    </Background>
  );
}


ProjectModal.defaultProps = {
    projectInfo: "",
    closeModal: ()=>{},
}

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.5);
    z-index: 2;

    display: flex;
    justify-content: center;
    align-items: center;

`
const Article = styled.article`
    width: 70%;
    background-color: aqua;

    position: relative;

    @media only screen and (min-width:1024px) {
        display: flex;
        width: 85%;
    }

`
const XContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;

    z-index: 4;

    width: 25px;
    height: 25px;
    background-color: rgba(255,255,255,0.5);
    border: 2px solid #777;
    border-radius: 20%;

    @media only screen and (min-width:768px) {
        width: 40px;
        height: 40px;
    }
`

const ImgContainer = styled.div`
    position: relative;
    width: 100%;
    /* height: 100%; */

    overflow: hidden; /* 보여줄 범위를 벗어난 이미지앨범 가리기 */


    @media only screen and (min-width:1024px) {
        width:60%;
        /* height: 50%; */

    }
`
const ImgAlbum = styled.div`
    width: 100%;
    display: flex;

    /* 이미지앨범 좌우로 움직이기 */
    transition-duration:0.5s;
    ${(props)=>`transform:translateX(${props.moveTo}px);`}
`
const ArrowContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    z-index: 3;

    display: flex;
    /* 현재 이미지의 위치에 따른 좌우 화살표 표시 여부에 따라 화살표 정렬 변경 */
    justify-content: ${(props)=>props.presentImgX===props.firstImgX? "right" : props.presentImgX===props.lastImgX? "left" : "space-between"};
    align-items: center;
`
const SizingArrowContainer = styled.div`
    width: 25px;
    height: 25px;
    @media only screen and (min-width:768px) {
        width: 40px;
        height: 40px;
    }
`
const ProjectImg = styled.img`
    width: 100%;
`
const ProjectContainer = styled.div`
    /* width: 100%; */
    padding: 10px;
    /* width padding 중복 적용 시. width 밖으로 추가 padding 적용되어 화면 밖으로 콘텐츠가 벗어남. */

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media only screen and (min-width:1024px) {
        width:40%;
        /* padding: 20px; */

        /* height: 100%; */
    }
`
const ProjectTittle = styled.h2`

`
const ProjectDesc = styled.p`

`
const ViewButtonContainer = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    
`
const LinkTo = styled.a`
    width: 50%;
    height: 100%;
`
const ViewButton = styled.button`
    width: 100%;
    height: 100%;
`
