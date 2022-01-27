import {useState, useEffect} from 'react';

// 모달 활성화 hook (with animation)
export default function useModal() {
    const [isModal, setModal] = useState(false);
    const toggleModal = () => {
        setModal(!isModal);  //모달 on or off
    }
    const [isShowOn, handleShowOn] = useState(true); //state for animation: show on or show off
   
    const handleModal = () => {
      if (!isModal) { // 최초 모달 오픈 시(모달off일 때) : modal true & showOn true
        toggleModal();
        handleShowOn(true);
        return;
      }
      handleShowOn(!isShowOn); // 모달 on 일 때 show off

    }
  
    // 모달on, show off 이후 모달 off.
    // setTimeout 이용해 기다린 후 show off animation 끝나고 모달 off (컴포넌트 언마운트)
    useEffect(()=>{
      if (isModal && !isShowOn) {
        setTimeout(()=>toggleModal(), 500);
      }

    }, [isShowOn]);




  return {isModal, handleModal, isShowOn};
}