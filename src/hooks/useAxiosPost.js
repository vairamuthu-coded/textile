import axios from 'axios'
import { useEffect, useState } from 'react'
const useAxiosPost = (postdata,postfetchError,postisLoading,dataUrl,datas) => {

    const [postdata,setData]=useState([])
    const [postfetchError,setFetchError]=useState(null)
    const [postisLoading,setIsLoading]=useState(false)
    // useEffect(() => {
    //     let isMounted=true;
    //     const source=axios.CancelToken.source();
    //     const fetchPost=async (dataUrl)=>{
    //         try{
    //           const response=await axios.post(dataUrl,datas,{
    //             cancelToken:source.token
    //           });  
    //           setIsLoading(true);          
    //           setData(response.data);
    //           setFetchError(null);
    //         }
    //         catch(err){
    //           if(isMounted){
    //             setFetchError(`Error ${err.message}`);
    //             setData([]);
    //           }
    //         }finally{
    //             isMounted && setIsLoading(false);
    //         }  
    //       }
    //       fetchPost(dataUrl,datas);
    //       const cleanup=()=>{
    //         isMounted=false;
    //         source.cancel();

    //       }
    //       return cleanup;
       
    //   }, [dataUrl]);
  return {postdata,postfetchError,postisLoading};
}



export default useAxiosPost
