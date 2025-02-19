import { useQuery } from '@tanstack/react-query';
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme';

const FetchBook = (category)=>{
  return axios.get(`http://127.0.0.1:8000/product/filter/?category=${category}`).then((res)=>res.data);
}

export default function Books() {
    const {category} = useParams()
    const {mode} = useTheme();
    
    const {data:Books,isLoading,isError,error} = useQuery({
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

    const limitedBooks = Books?.slice(0,5);
  return (
    <div className='container-fluid containerstyle mt-5'>
    <div className='rowstyle row'>
        {limitedBooks?.map((limitedBook) => {
                  const discountPercentage =
                  limitedBook.price && limitedBook.discounted_price
                      ? (((limitedBook.price - limitedBook.discounted_price) / limitedBook.price) * 100)
                      : null;
            return (
                <div key={limitedBook.Info.id} className='card custom-col'>
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
 
                        <img src={limitedBook.image_url} className="card-img-top" alt={limitedBook.title}/>
                    </div>
                    <div className={`card-body ${mode}`}>
                        <div className='pricedivstyle'>
                            <span className={`toman ${mode}`}>ءتءءء</span>
                            {limitedBook.discounted_price ? (
                                <div className="pricestyle">
                                <span className={`pricetextstyle ${mode}`}>{limitedBook.discounted_price.toLocaleString('fa-IR')}</span>
                               <span className={`offpricetextstyle text-decoration-line-through ${mode}`}>
                                 {limitedBook.price.toLocaleString('fa-IR')}
                                </span>
                                   </div>
                               ) : (
                                 <div className="pricestyle">
                                 <span className={`pricetextstyle ${mode}`}>{limitedBook.price.toLocaleString('fa-IR')}</span>
                                 </div>
                                )}
                        </div>
 
                        <div className='titlestyle'>
                            <div className={`titletextstyle ${mode}`}>{limitedBook.title}</div>
                            <div className={`authorstyle ${mode}`}>{limitedBook.Info.author}</div>
                        </div>
                    </div>
                </div>
            );
        })}
     </div>
 </div>
  )
}
