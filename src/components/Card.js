import React, { useState,useEffect } from 'react'

import { useTheme } from '../hooks/useTheme';
import './Card.css'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const useFetch=()=>{
  return axios.get('http://localhost:3000/books')
  .then(res=>res.data)
}


export default function Card() {
   const {mode} = useTheme();

   const {data:bookSuggestion,isLoading,isError,error} = useQuery({
    queryKey : ['bookSuggestion'],
    queryFn : useFetch
   })
   if(isLoading){
    return <div>در حال بارگذاری...</div>;
   }

   if(isError){
    return <div>{error.message}</div>
   }
 
   const limitedData = bookSuggestion?.slice(0,5);
  
 
    
 return(
    <div className='container-fluid containerstyle' >
       <div className='rowstyle row'>
        {limitedData?.map((b)=>(
               <div key={b.id} className='card custom-col'>
                  <div className={`cardtopstyle ${mode}`}>
                    <div className='divtopstyle  '>
                         {b.off ?
                         <button className='buttonoffstyle badge'>
                            {b.off}
                         </button> : null}
                        <button className={`buttonbuystyle btn ${mode}`}>
                         <i className="fa-solid fa-cart-shopping"></i>
                        </button> 
                    </div>
                    <img src={b.image} className="card-img-top" alt="..." />
                  </div>
                  <div className={`card-body ${mode}`}>
                    <div className='pricedivstyle '>
                        <span className={`toman ${mode}`}>ءتءءء</span>
                        <div className='pricestyle'>
                        <span className={`pricetextstyle ${mode}`}>{b.price}</span>
                        <span className={`offpricetextstyle text-decoration-line-through ${mode}`}>{b.offprice}</span>
                        </div>
                    </div>
   
                    <div className='titlestyle'>
                        <div className={`titletextstyle ${mode}`}>{b.title}</div>
                        <div className={`authorstyle ${mode}`}>{b.author}</div>
                    </div>

                  </div>
               </div>   
        ))}
       </div>
    </div>
   
 );
};