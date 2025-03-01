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
        <div className={`${styles.cardStyle} card`} >
        <div className={`${styles.sec1CardStyle}`}>       
           <img src={`http://127.0.0.1:8000/${booksInformation.image.image_url}`} className="card-img-top" style={{height:'300px',width:'200px'}} alt="..."/>
             <div className="card-body">
            <h4 className="card-title" style={{textAlign:'right'}}>{booksInformation.title}</h4>
            <div className="card-text mt-5">
            <p style={{textAlign:'right',direction:'rtl',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>  نویسنده : {booksInformation.Info.author}&nbsp; </p>
            <p style={{textAlign:'right',direction:'rtl',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}> مترجمان : {booksInformation.Info.translator}&nbsp; </p>
             <p style={{textAlign:'right',direction:'rtl',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>فروشنده : {booksInformation.Info.seller_name}</p>
             <p style={{textAlign:'right',direction:'rtl',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>ناشر : {booksInformation.Info.publisher.title}</p>
             <p style={{textAlign:'right',direction:'rtl',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>چاپ : {booksInformation.Info.print}</p>
           

        </div>
        </div>
        </div>
        </div>
        <Footer/>
    </div>
  )
}
