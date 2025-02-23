import React from 'react'
import styles from './BookInformation.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
const FetchBook=(bookurl)=>{
 return axios.get(`http://127.0.0.1:8000/product/${bookurl}/`).then((res)=> res.data);
}
export default function BookInformation() {
  const {bookurl} = useParams()

  const {data:booksInformation,isLoading,isError,error} = useQuery({
    queryKey : ['bookinformation',bookurl],
    queryFn : ()=> FetchBook(bookurl),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    enabled: !!bookurl,
  });
  if (isLoading) {
    return <div>در حال بارگذاری...</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  

  return (
    <div className={`container-fluid`}>
        <div className="card" style={{width: '18rem'}}>
        <img src={`http://127.0.0.1:8000/${booksInformation.image.image_url}`} className="card-img-top" alt="..."/>
        <div className="card-body">
        <h5 className="card-title">{booksInformation.title}</h5>
        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>
    </div>
  )
}
