import {useState, useEffect} from 'react';

// 컴포넌트 width 가져오는 hook
const useComponentWidth = (componentRef) => {

    const [width,setWidth] = useState(0);
    //width 초기값 0. 렌더 이후 ref.current 이용, offsetWidth 가져와 width 재설정
    
    const getWidth = () => componentRef.current.offsetWidth;

    useEffect(()=>{
        if (componentRef.current) {
            setWidth(getWidth());
        }

        const handleResize = () => setWidth(getWidth());
        window.addEventListener("resize", handleResize)
        return ()=> window.removeEventListener("resize", handleResize)
    }, [componentRef])

    return width;

};

export default useComponentWidth;
