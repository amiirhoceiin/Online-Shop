import React from 'react'

import { useTheme } from '../hooks/useTheme';
import './Card.css'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const useFetch=()=>{
  return axios.get('http://127.0.0.1:8000/product/most-sells-products/')
  .then(res=>res.data)
}


export default function Card() {
   const {mode} = useTheme();
   

   const {data:bookSuggestion,isLoading,isError,error} = useQuery({
    queryKey : ['bookSuggestion'],
    queryFn : useFetch,
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: true, 
    refetchOnMount: false
   })
   if(isLoading){
    return <div>در حال بارگذاری...</div>;
   }

   if(isError){
    return <div>{error.message}</div>
   }
 
   const limitedData = bookSuggestion?.slice(0,5);
 return(
   <div className='container-fluid containerstyle'>
   <div className='rowstyle row'>
       {limitedData?.map((b) => {
                 const discountPercentage =
                 b.price && b.discounted_price
                     ? (((b.price - b.discounted_price) / b.price) * 100)
                     : null;
           return (
               <div key={b.Info.id} className='card custom-col'>
                   <div className={`cardtopstyle ${mode}`}>
                       <div className='divtopstyle'>
                        
                       {discountPercentage ? (
                         <button className="buttonoffstyle badge">
                         {`${discountPercentage.toLocaleString('fa-IR')}٪`}
                       </button>
                         ) : null}

                           <button className={`buttonbuystyle btn ${mode}`}>
                               <i className="fa-solid fa-cart-shopping"></i>
                           </button>
                       </div>

                       <img src={`http://${b.image_url}`} className="card-img-top" alt="تصویر محصول" />
                   </div>
                   <div className={`card-body ${mode}`}>
                       <div className='pricedivstyle'>
                           <span className={`toman ${mode}`}>ءتءءء</span>
                           {b.discounted_price ? (
                               <div className="pricestyle">
                               <span className={`pricetextstyle ${mode}`}>{b.discounted_price.toLocaleString('fa-IR')}</span>
                              <span className={`offpricetextstyle text-decoration-line-through ${mode}`}>
                                {b.price.toLocaleString('fa-IR')}
                               </span>
                                  </div>
                              ) : (
                                <div className="pricestyle">
                                <span className={`pricetextstyle ${mode}`}>{b.price.toLocaleString('fa-IR')}</span>
                                </div>
                               )}
                       </div>

                       <div className='titlestyle'>
                           <div className={`titletextstyle ${mode}`}>{b.title}</div>
                           <div className={`authorstyle ${mode}`}>{b.Info.author}</div>
                       </div>
                   </div>
               </div>
           );
       })}
   </div>
</div>
   
 );
};