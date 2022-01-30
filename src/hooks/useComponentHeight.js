import {useState, useEffect} from 'react';

// 컴포넌트 height 가져오는 hook
const useComponentHeight = (componentRef) => {

    const [height, setHeight] = useState(0);
    //height 초기값 0. 렌더 이후 ref.current 이용, offsetHeight가져와 height 재설정
    
    const getHeight = () => componentRef.current.offsetHeight;

    useEffect(()=>{
        if (componentRef.current) {
            setHeight(getHeight());
        }

        const handleResize = () => setHeight(getHeight());
        window.addEventListener("resize", handleResize)
        return ()=> window.removeEventListener("resize", handleResize)
    }, [componentRef])

    return height;

};

export default useComponentHeight;
