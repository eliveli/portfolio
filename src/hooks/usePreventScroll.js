import {useEffect} from 'react';

function usePreventScroll(isModal) {
    // 모달 띄운 동안 body 영역 스크롤 막기
    useEffect(()=>{
        if(isModal){
        document.body.style.overflow = "hidden";
        return () => {document.body.style.overflow="unset";}
        }
    }, [isModal]);

    return;
}

export default usePreventScroll;
