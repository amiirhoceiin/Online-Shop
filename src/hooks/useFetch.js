import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    fetch(url)
    .then((res)=>{
      if(!res.ok){
        throw new Error('Network response was not ok');
      }
     return res.json();
    })
    .then((data)=>{
     setData(data)
     setIsLoading(false)
    })
    .catch((error)=>{
    setError(error)
    setIsLoading(false)
    })
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;