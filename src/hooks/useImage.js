import { useState,useEffect } from "react";
import axios from "axios";

  const useImage = (place,index) => {

    const [url,setUrl]=useState(null);
    const [loader,setLoader] = useState(false);

    const getPhotos =async()=>{
        setLoader(true)
      try{
        const {data} = await axios.get(`https://api.unsplash.com/search/photos/?page=1&query=${place}&client_id=${import.meta.env.VITE_Access_Key}`);
        const image = data.results[index].urls.small
        setUrl(image);
      }
      catch(error){
        console.log('this is the error',error);
      }
      setLoader(false);
    }
  
    useEffect(()=>{
      getPhotos()
    },[])

    return {url,loader};
  }
  
  export default useImage;