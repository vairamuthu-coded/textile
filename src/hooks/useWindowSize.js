import { useEffect, useState } from 'react'

const useWindowSize = () => {
    const [windowSize,setWindowSize]=useState({width:undefined,height:undefined});
    useEffect(()=>{
        const handleReSize=()=>{
            setWindowSize({
            width:window.innerWidth,
            height:window.innerHeight
            });
        }
        handleReSize();
        window.addEventListener("resize",handleReSize);
        return ()=> window.removeEventListener("resize",handleReSize)
    },[])

  return  windowSize;
}

export default useWindowSize