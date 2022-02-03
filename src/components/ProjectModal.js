import {useState, useRef} from 'react';
import styled, { keyframes } from 'styled-components';
import { Icon } from './elements';
import useModal from '../hooks/useModal';
import usePreventScroll from "../hooks/usePreventScroll"
import useComponentWidth from '../hooks/useComponentWidth';
import useComponentHeight from "../hooks/useComponentHeight"
import {debounce} from "lodash";


export default function ProjectModal({projectInfo, closeModal, isProjectModal, isProjectShow}) {

    // 취소 이유: 모달 전체화면으로 변경
    // 모달 바깥 영역 클릭 시 모달 닫기. show off & modal off------//
    // const modalRef = useRef(); //모달 요소 ref
    // const offModal = (e) => { 
    //     if (!modalRef.current.contains(e.target)) closeModal();
    // };
    // useEffect(()=>{
    //     window.addEventListener("click", offModal);
    //     return () => {
    //         window.removeEventListener("click", offModal);
    //     }
    // }, []);
    //----------------------------------------------------------//


    usePreventScroll(isProjectModal); // 모달 띄운 동안 body 영역 스크롤 막기

    // 프로젝트 info 모달(paper버튼 클릭 시)
    const { isModal, handleModal, isShowModal } = useModal();
    const isInfo = isModal;
    const handleInfo = () => handleModal();
    const isInfoShow = isShowModal;
    
    
    // article 컨테이너의 width, height 값 가져오기 //여러 아이콘 정렬에 활용 //window.screen.availWidth 제대로 적용 안 됨. 스크린 사이즈가 아니라 컴포넌트 사이즈를 가져오자
    const articleContainer = useRef();
    const articleWidth = useComponentWidth(articleContainer);
    const articleHeight = useComponentHeight(articleContainer);


    // 이미지 컨테이너의 width 값 가져오기 //
    // (~.current는 undefined라 useEffect 이용, 렌더링 이후 state 설정)
    // (state로 설정해 렌더링 이후에도 값 유지)
    const imgContainer = useRef();
    const imgWidth = useComponentWidth(imgContainer); //이미지width 가져오기


    // 디바이스별 이미지 분리 열람-----------------------//
    const {mobile, tablet, desktop} = projectInfo.img;
    const device = [mobile, tablet, desktop]; //배열에 담아 인덱스로 접근(for <DeviceContainer> 컴포넌트)
    const [deviceImg, setDeviceImg] = useState(mobile); //for 디바이스별 이미지 선택
    const [selectedDevice, handleSelectedDevice] = useState("mobile"); //for 선택된 디바이스 아이콘 표시
    const handleDevice = (idx, deviceName) => {
        setDeviceImg(device[idx]);
        handleSelectedDevice(deviceName);

        // 디바이스 변경 시 x좌표 및 스크롤위치 초기화. 이미지 개수가 많은 디바이스에서 적은 디바이스로 변경 시 설정된 이미지 x좌표에 이미지가 없거나 y좌표가 여백일 수 있기 때문.
        changeImageX(0);
        imgContainer.current?.scrollTo(0,0);
    }
    //------------------------------------------------//

    // 현재 이미지앨범 X좌표
    const [imageX, changeImageX] = useState(0);

    // 처음&마지막 이미지 X좌표 (좌우 화살표 표시 여부 결정)
    const firstImgX = 0;
    const lastImgX = -imgWidth*(deviceImg.length-1);

    // 좌우 화살표 클릭 시 이미지 x 좌표 변경 ----//
    const changeImg = (x) => {
        changeImageX(x);
        setTimeout(()=>imgContainer.current.scrollTo({top:0,left:0,behavior:'smooth'}),100); //스크롤 맨 처음으로 이동. smooth : 이미지앨범의 transition에 의해 이미지 좌우로 이동하면서 화면 최상단 이동도 부드럽게.
    }

    // 개별 이미지요소에 접근하기. 이미지 길이를 찾아와 상하 스크롤 범위 및 아이콘 표시에 이용
    const imgRef = useRef([]); // 이미지 ref 배열에 각 이미지 요소 넣기. //오른쪽 방법으로는 접근 불안정... 그래서 배열 속에 추가ref 생성 없이 바로 element 넣음. return문 아래 참고. 오른쪽은 실패했던 방법. imgRef.current = deviceImg.map((e)=>createRef()); 

    const imgIndex = -imageX/imgWidth //현재 화면에 보여주는 이미지 index (0에서 시작)

    // 위 방향 자동스크롤-------------//
    const handleScrollUp = () => {
        imgContainer.current.scrollTo(
            {top:0, left:0, behavior:'smooth'
        });
    }

    //스크롤 Up & Down 아이콘 표시 여부 결정
    const [isUp, handleUp] = useState(false);
    const [isDown, handleDown] = useState(true);
    
    // y스크롤 시 컨테이너가 스크롤 따라가기. info 컨테이너에 적용
    const [followY, setFollowY] = useState(0);
    
    const imgElement = () => imgRef.current[imgIndex]; //현재 이미지 element // 유의 : current는 처음에는 undefined. 그래서 변수에 값을 바로 담을 수 없음. 여기에서는 함수 리턴으로 담음. 함수 호출 시 값을 찾음.
    const imgContainerElement = () => imgContainer?.current; //이미지 컨테이너 element

    // 이미지 컨테이너 스크롤 이벤트 발생 시 ------------------------------//
    const setScrollY = ({top}) => {
        const moveY = imgElement()?.offsetHeight - imgContainerElement()?.offsetHeight; // 이동할 Y 값: (이미지 세로) - (이미지컨테이너 세로) // 계산 없이 이미지 세로만큼 이동하면 이미지 끝이 화면 최상단에 옴.

        setFollowY(top); //info 컨테이너 top 값 변경 : y스크롤 따라 이동(화면 중앙 유지)

        if (top > 10) handleUp(true); // scroll Up 아이콘 표시여부 결정.
        else handleUp(false);

        if (top >= moveY-40) handleDown(false);// scroll Down 아이콘 표시여부 결정. 이미지 최하단 부근에서 아이콘 숨기기
        else handleDown(true);
    }
    const handleScrollY = debounce(setScrollY, 200); // debounce 이용 렌더링 줄임
    const handleScroll = (e) => {
        handleScrollY({top:e.target.scrollTop});
    }
    //---------------------------------------------------------------//
    
    
    // 아래 방향 자동스크롤--------------------------------------------------//
    // 방법 1 : 이미지 요소의 길이만큼 아래로 스크롤. 단점: 스크롤을 느리게 할 수 없음
    // 방법 2 : 이동할 y 값을 이미지앨범에 넘겨 줘 translate 적용. 단점: 앨범과 이미지 컨테이너가 최상단 y값이 달라지면 이미지 컨테이너 영역에서 y스크롤로 영역을 벗어난 위쪽 이미지에 접근할 수 없음. 겹친 두 영역의 접근 문제..
    const handleScrollDown = () => {
        // const moveYvalue = imgElement()?.offsetHeight - imgContainerElement()?.offsetHeight; // 이동할 Y 값: (이미지 세로) - (이미지컨테이너 세로) // 계산 없이 이미지 세로만큼 이동하면 이미지 끝이 화면 최상단에 옴.
        
        // 방법 1-1
        // imgContainer.current.scrollTo(
        //     {top:moveYvalue,
        //     left:0, behavior:'smooth'
        // });

        // 방법 1-2
        imgElement().scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"}) //이미지의 끝으로 이동. block inline 을 넣어 이미지 끝을 화면 끝에 맞춤

        // 방법2
        // 예시 : const [imageY, handleImageY] = useState(0); //이동할 Y값
        // y값을 state로 설정, 이후 이미지앨범에 props으로 받아 translate y 값으로 적용 가능.
        // handleImageY(moveYvalue); 

    }
    //---------------------------------------------------------------------------//


    // 이미지 슬라이드 기능 -----------------------------------------------------//
    // 이미지 앨범 안에 이미지 요소를 여럿 넣고 이미지앨범을 x축 방향으로 좌우 이동.
    // 이 때 이미지앨범을 감싸는 부모 컨테이너는 overflow hidden이라 부모를 벗어난 앨범 부분은 안 보임.
    // 좌우 버튼 클릭 시 imgWidth 만큼 이미지앨범 X좌표 변경, 컴포넌트 리렌더링되면서 바뀐 x좌표로 앨범 움직임
    //-------------------------------------------------------------------------//

    return (
       <Article ref={articleContainer} isShowOn={isProjectShow}>
            <TopContainer>
                <TopWidthContainer imgWidth={imgWidth}>
                    <TopLeftIconContainer>
                        {[{dataIcon:"gridicons:phone", device:"mobile"},
                        {dataIcon:"gridicons:tablet", device:"tablet"},
                        {dataIcon:"fa-solid:desktop", device:"desktop"}]
                        .map((_,idx)=>
                            <TopIconContainer deviceName={_.device} selectedDevice={selectedDevice} onClick={()=>handleDevice(idx, _.device)} key={_.dataIcon}>
                                <Icon color="#777" dataIcon={_.dataIcon}></Icon>
                            </TopIconContainer>
                        )}
                    </TopLeftIconContainer>
                    <TopIconContainer onClick={closeModal}>
                        <Icon color="#777" dataIcon="gg:close"></Icon>
                    </TopIconContainer>
                </TopWidthContainer>
            </TopContainer>

            {/* 이미지 슬라이드 */}
            <ImgContainer ref={imgContainer} onScroll={handleScroll} isOpenedInfo={isInfo}>
                <ImgAlbum moveX={imageX}>
                    {deviceImg.map((e,idx) => 
                      <ProjectImg ref={(elem)=>imgRef.current[idx]=elem} width={imgWidth} key={e+idx} src={e} alt="project image" />
                    )}

                
                </ImgAlbum>

                {isInfo &&
                <ProjectInfoContainer moveY={followY} isShowOn={isInfoShow}>
                    <ProjectTittle>
                        {projectInfo.tittle}
                    </ProjectTittle>
                    <ProjectDesc>
                        {projectInfo.desc}
                    </ProjectDesc>
                </ProjectInfoContainer>
                }
            </ImgContainer>

            {/* 마지막 이미지일 때 보여줄 문구 */}
            {(imageX===lastImgX) &&
            <ShowMessage articleWidth={articleWidth} imgWidth={imgWidth}>
               더 보려면? 👇🏻
            </ShowMessage>
            }


            {/* 이전 이미지 화살표(맨 처음 이미지일 때 제외) */}
            { (imageX!==firstImgX && !isInfo) &&
            <SizingArrowContainer articleWidth={articleWidth} articleHeight={articleHeight} imgWidth={imgWidth} left={true} onClick={()=>changeImg(imageX+imgWidth)}>
                <Icon color="#555" dataIcon="bx:bxs-left-arrow"></Icon>
            </SizingArrowContainer>
            }
            {/* 다음 이미지 화살표(맨 끝 이미지일 때 제외) */}
            { (imageX!==lastImgX && !isInfo) &&
            <SizingArrowContainer articleWidth={articleWidth} articleHeight={articleHeight} imgWidth={imgWidth} onClick={()=>changeImg(imageX-imgWidth)}>
                <Icon color="#555" dataIcon="bx:bxs-right-arrow"></Icon>
            </SizingArrowContainer>
            }


            <PaperContainer articleWidth={articleWidth} imgWidth={imgWidth} onClick={handleInfo}>
                <Icon color="#777" dataIcon="ph:scroll-duotone"></Icon>
            </PaperContainer>

            {!isInfo && 
            <ScrollSetContainer articleWidth={articleWidth} imgWidth={imgWidth}>
                {isUp && 
                <ScrollContainer onClick={handleScrollUp}>
                    <Icon color="#777" dataIcon="line-md:chevron-double-up"></Icon>
                </ScrollContainer>
                }
                {isDown && 
                <ScrollContainer onClick={handleScrollDown}>
                    <Icon color="#777" dataIcon="line-md:chevron-double-down"></Icon>
                </ScrollContainer>
                }
            </ScrollSetContainer>
            }

            <ViewButtonContainer>
                {[{text:"사이트 보러가기",address:projectInfo.siteAddress}
                    ,{text:"깃허브 보러가기",address:projectInfo.githubAddress}
                    ].map((e,idx)=>
                    <LinkTo key={e.text} href={e.address} target="_blank" rel="noopener noreferrer">
                        <ViewButton left={idx}>{e.text}</ViewButton>
                    </LinkTo>
                    )
                }
            </ViewButtonContainer>


       </Article>
  );
}


// animation for project modal : zoom in or zoom out
const projectZoomIn = keyframes`
  from{
    clip-path: polygon(40% 40%, 60% 40%, 60% 60%, 40% 60%);
    opacity: 0.1;
  }
  to{
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    opacity: 1;
  }
`
const projectZoomOut = keyframes`
  0% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
    opacity: 1;
  }
 90%{
    clip-path: polygon(40% 40%, 60% 40%, 60% 60%, 40% 60%);
    opacity: 0;
  }
 100%{
    clip-path: polygon(40% 40%, 60% 40%, 60% 60%, 40% 60%);
    opacity: 0;

  }
`
const Article = styled.article`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);

    z-index: 2;

    display: flex;
    flex-direction: column;
    align-items: center;

    
    animation-name:${(props)=>props.isShowOn? projectZoomIn : projectZoomOut};
    animation-direction: normal;
    animation-duration:${(props)=>props.isShowOn? "0.5s" : "0.7s"};
    animation-fill-mode: forwards; //애니메이션 종료 후 마지막 keyframe 값 유지(중요!)
    
    @media only screen and (min-width:1024px) {
    }

`
const TopContainer = styled.div`
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(0,0,0,0.5);

    padding: 1px;
    @media only screen and (min-width:1024px) {
    }
`
const TopWidthContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    width:${props=>props.imgWidth - 2}px; //빠트리면 하위 아이템들 정렬이 제대로 안 됨
`
const TopLeftIconContainer = styled.div`
    display: flex;
    align-items:center;
    gap:1px;
`
const TopIconContainer = styled.div`
    display: inline-block;

    width: 27px;
    height: 27px;
    background-color: rgba(255,255,255,1);
    border: ${props=>props.deviceName && (props.deviceName===props.selectedDevice)? "2px solid orange" : "2px solid #ddd"};
    border-radius: 20%;
    
    @media only screen and (min-width:768px) {
        width: 35px;
        height: 35px;
    }

    @media (hover: hover) {
     &:hover {
      cursor: pointer;
      opacity: 0.5;
     }
    }
`

const ImgContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    overflow-x: hidden ; 
    overflow-y: ${props=>props.isOpenedInfo? "hidden":"scroll"}; //info 모달 창 열리면 이미지컨테이너 스크롤 막기

    -ms-overflow-style: none;
    &::-webkit-scrollbar{ display:none; }
    /* 내부 스크롤바 없애기 */

    @media only screen and (min-width:1024px) {
        width:50%;
        /* height: 50%; */

    }
`
const ImgAlbum = styled.div`
    display: flex;

    transition-duration:0.5s;
    /* 이미지앨범 좌우로 움직이기 */
    ${(props)=>props.moveX? `transform:translate(${props.moveX}px, 0);` :""}
    
    /* 불가능: 이미지 자동스크롤_아래로 움직이기 */
    /* 이유: 앨범이 이미지컨테이너 위쪽으로(y축) 이동할 경우 y축으로 컨테이너 영역을 벗어남. */
    /*       이 때 컨테이너 영역 밖의 위쪽으로 y스크롤 불가. 아래로만 스크롤 가능 */
    /* ${(props)=>props.moveY? `transform:translate(${props.moveX}px,-${props.moveY}px);` :""} */
`

const shakeMessage = keyframes`
    from{
        bottom: ${50+3+6}px;
    }
    to{
        bottom: ${50+3}px;
    }
`
const ShowMessage = styled.div`
    position: absolute;
    left: ${42+3+3 +3}px;
    bottom: ${50+3 +2}px;
    /* border: 2px solid #ddd; */
    border-radius: 5px;
    background-color: rgba(255,255,255,0.9);
    padding: 1px 5px;
    box-shadow: 0 0 4px #666;

    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: #666;

    animation-name:${shakeMessage};
    animation-direction: normal;
    animation-duration: 0.5s;
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    @media only screen and (min-width:1024px) {
        left: ${props=>(props.articleWidth - props.imgWidth)/2 + 6}px;
        bottom: ${50+ 5}px;
    }

    @media (hover: hover) {
     &:hover {
        animation-name:"";
     }
    }



`

const SizingArrowContainer = styled.div`
    background-color: rgba(255,255,255,0.9);
    border-radius: 10%;
    border: 2px solid rgba(0,0,0,0.1);

    width: 32px; //padding, border 포함 시 전체 가로 길이는 40px
    height: 32px;
    
    padding:${props=>props.left? "2px 3px 2px 1px" : "2px 1px 2px 3px"};
    /* padding 좌우 다르게 줘서 내부에 넣는 아이콘 간격 맞추기. 이유 : 받아오는 아이콘의 패딩이 일정하지 않음 */
    /* + 왼쪽 오른쪽 화살표 구분에 따라서도 패딩 다르게 주기 */

    position: absolute;
    top: ${props=>(props.articleHeight - 50 - 42 + 27 )/2 - (40/2)}px;
    
    left: ${props=>props.left? "0px" : "" };
    right: ${props=>props.left? "" : "0px"};


    @media only screen and (min-width:768px) {
        width: 42px; //padding, border 포함 시 전체 가로 50px
        height: 42px;

        top: ${props=>(props.articleHeight - 50 - 42 + 27 )/2 - (50/2)}px;
    }
    @media only screen and (min-width:1024px) {
        left: ${props=>props.left? `${(props.articleWidth - props.imgWidth)/2 - 50 - 0}px`:""};
        right: ${props=>props.left? "" : `${(props.articleWidth - props.imgWidth)/2 - 50 - 0}px`};
    }

    @media (hover: hover) {
     &:hover {
      cursor: pointer;
      opacity: 0.5;
     }
    }
`

const ProjectImg = styled.img`
    width: ${props=>props.width}; //100%도 결과 같음. ImgContainer의 width인 듯
    height: 100%; //미설정 시 height가 부모의 height에 맞추어 세로로 길게 늘려짐. 100%이면 늘려지지 않고 그대로 출력, 대신 스크롤 내리면 아래 여백 보임
`


// animation for project info modal
const infoShowOn = keyframes`
  from{
    clip-path: circle(0.0% at 0 100%);
    opacity: 0.1;
  }
  to{
    clip-path: circle(141.2% at 0 100%);
    opacity: 1;
  }
`
const infoShowOff = keyframes`
  0% {
    clip-path: circle(141.2% at 0 100%);
    opacity: 1;
  }

 100%{
    clip-path: circle(0.0% at 0 100%);
    opacity: 0;

  }
`
const ProjectInfoContainer = styled.div`
    position: absolute;
    top: ${props=>props.moveY}px; //미적용 시 이미지 컨테이너에서 스크롤을 내릴 때 info컨테이너가 화면에 보이지 않음
    left: 0;
    width: 100%;
    height: 100%;

    background-color: rgba(255,255,255,0.9);

    box-sizing: border-box;
    padding: 20px 40px;
    @media only screen and (min-width:1024px) {
        /* left: 100%; */
    }

    animation-name:${(props)=>props.isShowOn? infoShowOn : infoShowOff};
    animation-direction: normal;
    animation-duration:${(props)=>props.isShowOn? "0.5s" : "0.7s"};
    animation-fill-mode: forwards; //애니메이션 종료 후 마지막 keyframe 값 유지(중요!)
    
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
    height: 50px;

    background-color: rgba(0,0,0,0.5);
    color: white;

    font-size: 16px;

    border: 0;
    border-left: ${props=>props.left===1? "0.5px solid rgba(255,255,255,0.3)" : ""};

    @media (hover: hover) {
     &:hover {
      cursor: pointer;
      opacity: 0.5;
     }
    }
`
const PaperContainer = styled.div`
    position: absolute;
    bottom: ${50+3}px;
    left: ${0+3}px;

    background-color: rgba(255,255,255,0.9);
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.1);

    z-index: 4;

    width: 40px; //border 포함 전체 가로 42
    height: 40px;

    @media only screen and (min-width:1024px) {
        left: ${props=>(props.articleWidth - props.imgWidth)/2 - (40+2) - 3}px;
        bottom: ${50+3}px;

    }

    @media (hover: hover) {
     &:hover {
      cursor: pointer;
      opacity: 0.5;
     }
    }
`
const ScrollSetContainer = styled.div`
    display: flex;
    flex-direction: column;
    
    position: absolute;
    right: ${0+3}px;
    bottom: ${50+3}px;
    gap: 3px;

    z-index: 3;
    @media only screen and (min-width:1024px) {
        right: ${props=>(props.articleWidth - props.imgWidth)/2 - (40+2) - 3}px;
        bottom: ${50+3}px;
        gap: 3px;
    }
`
const ScrollContainer = styled.div`
    background-color: rgba(255,255,255,0.9);
    border-radius: 50%;
    border: 1px solid rgba(0,0,0,0.1);

    width: 40px;
    height: 40px;

    @media (hover: hover) {
     &:hover {
      cursor: pointer;
      opacity: 0.5;
     }
    }
`
