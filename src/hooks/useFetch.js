
import axios from 'axios';
import { useEffect, useState } from 'react'

function useFetch(url) {
     
    let [products, setProducts] = useState([]);
    let [error, setError] = useState("");
    let [isloading, setIsLoading] = useState(true);
    useEffect(() => {
        let fetApi = async () => {
            try {
                let response = await axios.get(url);
                    setProducts(response.data); 
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setIsLoading(false)
            }
        }
        fetApi();
    }, [])
    return { products, error, isloading,setProducts }
}

export default useFetch;
