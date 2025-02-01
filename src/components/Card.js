import React, { useState,useEffect } from 'react'
import useFetch from '../hooks/useFetch';
import { useTheme } from '../hooks/useTheme';
import './Card.css'


export default function Card() {
   const {mode} = useTheme();
    const {data : card,isLoading,error} = useFetch('http://localhost:3000/books');
    const [book,setBook] = useState([]);
    useEffect(() => {
        if (card) {
          setBook(card.slice(0, 5));
        }
      }, [card]); 
    
      if (isLoading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }
    
 return(
    <div className='container-fluid containerstyle' >
       <div className='rowstyle row'>
        {book.map((b)=>(
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
                    <img src={b.image} className="card-img-top" alt="..." style={{filter:'brightness(80%)'}}/>
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