import {useState} from 'react';

// 모달 활성화 hook
export default function useModal() {
    const [isModal, setModal] = useState(false);
    const toggleModal = () => {
        if (isModal) {
            setModal(false);
            return;
        }
        setModal(true);
    }
  return {isModal, toggleModal};
}