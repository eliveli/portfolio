import {useState, useRef, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import { Icon } from './elements';
import useModal from '../hooks/useModal';
import useComponentWidth from '../hooks/useComponentWidth';
import {debounce} from "lodash";
export default function ProjectModal({projectInfo, closeModal}) {

    // 모달 바깥 영역 클릭 시 모달 닫기. show off & modal off
    const modalRef = useRef(); //모달 요소 ref
    // const offModal = (e) => { 
    //     if (!modalRef.current.contains(e.target)) closeModal();
    // };
    // useEffect(()=>{
    //     window.addEventListener("click", offModal);
    //     return () => {
    //         window.removeEventListener("click", offModal);
    //     }
    // }, []);



    // 프로젝트 정보 보여주는 모달(+버튼 클릭 시)
    const { isModal, handleModal, isShowOn} = useModal();
    const isInfo = isModal
    const handleInfo= ()=> handleModal()
    





    // 이미지 컨테이너의 width 값 가져오기 //
    // (~.current는 undefined라 useEffect 이용, 렌더링 이후 state 설정)
    // (state로 설정해 렌더링 이후에도 값 유지)
    const imgWidthRef = useRef();

    const imgWidth = useComponentWidth(imgWidthRef); //이미지width 가져오기

    // 현재 이미지앨범 X좌표
    const [imageX, changeImageX] = useState(0);

    // 처음&마지막 이미지 X좌표 (좌우 화살표 표시 여부 결정)
    const firstImgX = 0;
    const lastImgX = -imgWidth*(projectInfo.img.length-1);

    // 이미지 슬라이드 기능 //
    // 이미지 앨범 안에 이미지 요소를 여럿 넣고 이미지앨범을 x축 방향으로 좌우 이동.
    // 이 때 이미지앨범을 감싸는 부모 컨테이너는 overflow hidden이라 부모를 벗어난 앨범 부분은 안 보임.
    // 좌우 버튼 클릭 시 imgWidth 만큼 이미지앨범 X좌표 변경, 컴포넌트 리렌더링되면서 바뀐 x좌표로 앨범 움직임


    // 이미지 컨테이너 스크롤 시 화살표도 같이 움직이기(화면 중앙 유지)
    // debounce 이용 렌더링 줄임. & useCallback(함수재사용. 큰 효과는 없지만..?)
    const [arrowY, setArrowY] = useState(0);
    const moveArrow = (value) => {
        setArrowY(value); console.log(value)
    }
    const handleMoveArrow = useCallback(debounce(moveArrow, 200), []);
    const handleScroll = (e) => {
        handleMoveArrow(e.target.scrollTop);
    }

    return (
    <Background>
       <Article ref={modalRef}>
            <XContainer onClick={closeModal}>
                <Icon color="#777" dataIcon="gg:close"></Icon>
            </XContainer>

            {/* 이미지 슬라이드 */}
            <ImgContainer ref={imgWidthRef} onScroll={handleScroll}>
                <ImgAlbum moveTo={imageX}>
                    {projectInfo.img.map((e,idx) => 
                      <ProjectImg width={imgWidth} key={e+idx} src={e} alt="project image" />
                    )}
                
                </ImgAlbum>

                <ArrowContainer moveY={arrowY} presentImgX={imageX} firstImgX={firstImgX} lastImgX={lastImgX}>
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

        {isInfo &&
            <ProjectInfoContainer>
                <ProjectTittle>
                    {projectInfo.tittle}
                </ProjectTittle>
                <ProjectDesc>
                    {projectInfo.desc}
                </ProjectDesc>
           </ProjectInfoContainer>
        }
            <ViewButtonContainer>
                {[{text:"사이트 보러가기",address:projectInfo.siteAddress}
                    ,{text:"깃허브 보러가기",address:projectInfo.githubAddress}
                    ].map((e)=>
                    <LinkTo key={e.text} href={e.address} target="_blank" rel="noopener noreferrer">
                        <ViewButton>{e.text}</ViewButton>
                    </LinkTo>
                    )
                }
            </ViewButtonContainer>

            <ScrollContainer>
                <Icon color="#777" dataIcon="iconoir:mouse-scroll-wheel"></Icon>
            </ScrollContainer>

            <PlusContainer onClick={handleInfo}>
                <Icon color="#777" dataIcon="akar-icons:circle-plus"></Icon>
            </PlusContainer>

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
    width: 80%;
    height: 80%;
    background-color: aqua;

    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media only screen and (min-width:1024px) {
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
    height: 90%;

    overflow-x: hidden ; 
    overflow-y: scroll;

    -ms-overflow-style: none;
    &::-webkit-scrollbar{ display:none; }
    /* 내부 스크롤바 없애기 */



    @media only screen and (min-width:1024px) {
        width:60%;
        /* height: 50%; */

    }
`
const ImgAlbum = styled.div`
    /* width: 100%; */
    display: flex;

    /* 이미지앨범 좌우로 움직이기 */
    transition-duration:0.5s;
    ${(props)=>`transform:translateX(${props.moveTo}px);`}
`
const ArrowContainer = styled.div`
    position: absolute;
    top: ${props=>props.moveY}px; //px 단위 빠트리면 안 됨...
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
    z-index: 5;
    width: 25px;
    height: 25px;
    @media only screen and (min-width:768px) {
        width: 40px;
        height: 40px;
    }
`
const ProjectImg = styled.img`
    width: ${props=>props.width}; //100%도 결과 같음. ImgContainer의 width인 듯
    height: 100%; //미설정 시 height가 부모의 height에 맞추어 세로로 길게 늘려짐. 100%이면 늘려지지 않고 그대로 출력, 대신 스크롤 내리면 아래 여백 보임
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
const ProjectInfoContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;

    z-index:4;
    @media only screen and (min-width:1024px) {
        left: 100%;
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
const ScrollContainer = styled.div`
    position: absolute;
    bottom: 60px;
    right: 0;

    background-color: rgba(255,255,255,0.8);
    border-radius: 50%;

    z-index: 4;

    width: 35px;
    height: 35px;

    @media only screen and (min-width:768px) {
    }
`
const PlusContainer = styled.div`
    position: absolute;
    bottom: 0;
    right: -10%;

    z-index: 4;

    width: 40px;
    height: 40px;

    @media only screen and (min-width:768px) {
    }
`