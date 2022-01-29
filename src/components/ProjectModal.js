import {useState, useRef, useEffect, createRef, useCallback} from 'react';
import styled from 'styled-components';
import { Icon } from './elements';
import useModal from '../hooks/useModal';
import useComponentWidth from '../hooks/useComponentWidth';
import {debounce} from "lodash";
export default function ProjectModal({projectInfo, closeModal}) {

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

    
    // 모달 띄운 동안 body 영역 스크롤 막기
    useEffect(()=>{
        document.body.style.overflow = "hidden";
        return () => {document.body.style.overflow="unset";}
    }, [])


    // 프로젝트 info 모달(paper버튼 클릭 시)
    const { isModal, handleModal, isShowOn} = useModal();
    const isInfo = isModal;
    const handleInfo = () => handleModal();
    const isInfoShow = isShowOn;
    
    

    // 이미지 컨테이너의 width 값 가져오기 //
    // (~.current는 undefined라 useEffect 이용, 렌더링 이후 state 설정)
    // (state로 설정해 렌더링 이후에도 값 유지)
    const imgContainer = useRef();
    const imgWidth = useComponentWidth(imgContainer); //이미지width 가져오기

    // 디바이스별 이미지 분리 열람-----------------------//
    const {mobile, tablet, desktop} = projectInfo.img;
    const device = [mobile, tablet, desktop]; //배열에 담아 인덱스로 접근(for <DeviceContainer> 컴포넌트)
    const [deviceImg, setDeviceImg] = useState(mobile);
    const handleDevice = (idx) => {
        setDeviceImg(device[idx]);

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
    
    // y스크롤 시 컨테이너가 스크롤 따라가기. 화살표 컨테이너에 적용
    const [followY, setFollowY] = useState(0);
    
    const imgElement = () => imgRef.current[imgIndex]; //현재 이미지 element // 유의 : current는 처음에는 undefined. 그래서 변수에 값을 바로 담을 수 없음. 여기에서는 함수 리턴으로 담음. 함수 호출 시 값을 찾음.
    const imgContainerElement = () => imgContainer?.current; //이미지 컨테이너 element

    // 이미지 컨테이너 스크롤 이벤트 발생 시 ------------------------------//
    const setScrollY = ({top}) => {
        const moveY = imgElement()?.offsetHeight - imgContainerElement()?.offsetHeight; // 이동할 Y 값: (이미지 세로) - (이미지컨테이너 세로) // 계산 없이 이미지 세로만큼 이동하면 이미지 끝이 화면 최상단에 옴.

        setFollowY(top); //arrow 컨테이너 top 값 변경 : y스크롤 따라 이동(화면 중앙 유지)

        if (top > 10) handleUp(true); // scroll Up 아이콘 표시여부 결정
        else handleUp(false);

        if (top >= moveY-40) handleDown(false);// scroll Down 아이콘 표시여부 결정
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
    <Background>
       <Article>
            <TopContainer>
                <div>
                {["gridicons:phone","gridicons:tablet","fa-solid:desktop"]
                .map((dataIcon,idx)=>
                    <DeviceContainer onClick={()=>handleDevice(idx)} key={dataIcon}>
                        <Icon color="#777" dataIcon={dataIcon}></Icon>
                    </DeviceContainer>
                )}
                </div>
                
                <XContainer onClick={closeModal}>
                    <Icon color="#777" dataIcon="gg:close"></Icon>
                </XContainer>
            </TopContainer>

            {/* 이미지 슬라이드 */}
            <ImgContainer ref={imgContainer} onScroll={handleScroll} isOpenedInfo={isInfo}>
                <ImgAlbum moveX={imageX}>
                    {deviceImg.map((e,idx) => 
                      <ProjectImg ref={(elem)=>imgRef.current[idx]=elem} width={imgWidth} key={e+idx} src={e} alt="project image" />
                    )}
                
                </ImgAlbum>

                <ArrowContainer moveY={followY} presentImgX={imageX} firstImgX={firstImgX} lastImgX={lastImgX}>
                    {/* 이전 이미지 화살표(맨 처음 이미지일 때 제외) */}
                        {imageX!==firstImgX &&
                        <SizingArrowContainer onClick={()=>changeImg(imageX+imgWidth)}>
                            <Icon color="#777" dataIcon="bx:bxs-left-arrow"></Icon>
                        </SizingArrowContainer>
                    }
                    {/* 다음 이미지 화살표(맨 끝 이미지일 때 제외) */}
                        {imageX!==lastImgX && 
                        <SizingArrowContainer onClick={()=>changeImg(imageX-imgWidth)}>
                            <Icon color="#777" dataIcon="bx:bxs-right-arrow"></Icon>
                        </SizingArrowContainer>
                    }
                </ArrowContainer>


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
            </ImgContainer>

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


            <PaperContainer onClick={handleInfo}>
                <Icon color="#777" dataIcon="ph:scroll-duotone"></Icon>
            </PaperContainer>


            <ScrollSetContainer>
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
    width: 100%;
    height: 100%;
    background-color: aqua;

    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;

    @media only screen and (min-width:1024px) {
    }

`
const TopContainer = styled.div`
    display: flex;
    justify-content: space-between;
`
const DeviceContainer = styled.div`
    display: inline-block;

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
const XContainer = styled.div`
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
    overflow-y: ${props=>props.isOpenedInfo? "hidden":"scroll"}; //info 모달 창 열리면 이미지컨테이너 스크롤 막기

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

    transition-duration:0.5s;
    /* 이미지앨범 좌우로 움직이기 */
    ${(props)=>props.moveX? `transform:translate(${props.moveX}px, 0);` :""}
    
    /* 불가능: 이미지 자동스크롤_아래로 움직이기 */
    /* 이유: 앨범이 이미지컨테이너 위쪽으로(y축) 이동할 경우 y축으로 컨테이너 영역을 벗어남. */
    /*       이 때 컨테이너 영역 밖의 위쪽으로 y스크롤 불가. 아래로만 스크롤 가능 */
    /* ${(props)=>props.moveY? `transform:translate(${props.moveX}px,-${props.moveY}px);` :""} */
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    z-index:4;

    background-color: rgba(255,255,255,0.9);
    @media only screen and (min-width:1024px) {
        /* left: 100%; */
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

const ScrollSetContainer = styled.div`
    display: flex;
    flex-direction: column;

    position: absolute;
    bottom: 60px;
    right: 0;
    z-index: 3;
`
const ScrollContainer = styled.div`
    background-color: rgba(255,255,255,0.8);
    border-radius: 50%;

    width: 40px;
    height: 40px;

    @media only screen and (min-width:768px) {
    }
`
const PaperContainer = styled.div`
    position: absolute;
    bottom: 60px;
    left: 0;

    background-color: rgba(255,255,255,0.8);
    border-radius: 50%;

    z-index: 4;

    width: 40px;
    height: 40px;

    @media only screen and (min-width:768px) {
    }
`