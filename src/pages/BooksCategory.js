import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

const FetchBook = (category)=>{
  return axios.get(`${category}`).then((res)=>res.data);
}

export default function Books() {
    const {category} = useParams()
    
    const {data,isLoading,isError,error} = useQuery({
      queryKey : ['bookCategory',category],
      queryFn : ()=>FetchBook(category),
      staleTime: 5 * 60 * 1000, 
      cacheTime: 10 * 60 * 1000, 
      refetchOnWindowFocus: true, 
      refetchOnMount: false,
      enabled: !!category,
    })
    if (!category) {
      return <div>لطفاً یک دسته‌بندی را انتخاب کنید.</div>;
    }
    if (isLoading) {
      return <div>در حال بارگذاری...</div>;
    }
  
    if (isError) {
      return <div>{error.message}</div>;
    }
  return (
    <div>
      {data?.map((book,index)=>(
        <div key={index}>
          <div>{book.title}</div>
        </div>
      ))}

    </div>
  )
}
