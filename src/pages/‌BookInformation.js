import React from 'react'
import styles from './BookInformation.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useTheme } from '../hooks/useTheme'
import Footer from '../components/Footer' 
const FetchBook=(bookurl)=>{
 return axios.get(`http://127.0.0.1:8000/product/${bookurl}/`).then((res)=> res.data);
}
export default function BookInformation() {
  const {mode} = useTheme();
  const {bookurl} = useParams();

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
    <div className={`container ${mode ==='dark' ? styles.containerfluidDark: styles.containerfluid}`}>
        <div className={`${styles.cardStyle} card`} style={{width: '200px'}}>
        <img src={`http://127.0.0.1:8000/${booksInformation.image.image_url}`} className="card-img-top" alt="..."/>
        <div className="card-body">
        <h5 className="card-title">{booksInformation.title}</h5>
        <p className="card-text">
          
        </p>
        </div>
        </div>
        <Footer/>
    </div>
  )
}
