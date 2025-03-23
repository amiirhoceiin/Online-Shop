import React from 'react'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import styles from './BookMostsel.module.css'
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { increament } from '../redux/numberPurchaseSlice';


const useFetch = () => {
  return axios.get('http://127.0.0.1:8000/product/most-sells-products/').then((res) => res.data);
};
export default function BookMostsel() {
  const mode = useSelector(state=>state.theme.mode)
  const distpatch = useDispatch();
 

 const { data: BookMostsel, isLoading, isError, error } = useQuery({
     queryKey: ['bookSuggestion'],
     queryFn: useFetch,
     staleTime: 5 * 60 * 1000,
     cacheTime: 10 * 60 * 1000,
     refetchOnWindowFocus: true,
     refetchOnMount: false,
 });

 if (isLoading) {
     return <div>در حال بارگذاری...</div>;
 }

 if (isError) {
     return <div>{error.message}</div>;
 }

  return (
    <div className={`${mode ==='dark'? styles.divStyleDark: styles.divStyle}`}>
    <div className={`${styles.containerstyle} container-fluid`}>
    <div className={`${styles.rowstyle} row`}>
    <div className={`${mode ==='dark' ? styles.headerSectionDark : styles.headerSection}`}>
            <h4>پرفروش های هفته</h4>
        </div>
     
        {BookMostsel?.map((limitedBook) => {
                const discountPercentage =
                     limitedBook.price && limitedBook.discounted_price
                     ? parseFloat((((limitedBook.price - limitedBook.discounted_price) / limitedBook.price) * 100).toFixed(0))
                    : null;

            return (
                <div key={limitedBook.slug} className={styles.customCol}>
                    <div className={`${mode === 'dark'?styles.cardTopStyleDark: styles.cardTopStyle}`}>
                        <div className={styles.divTopStyle}>
                            {discountPercentage ? (
                                <button className={`${styles.buttonOffStyle} badge`}>
                                    {`${discountPercentage.toLocaleString('fa-IR')}٪`}
                                </button>
                            ) : null}
                            <button onClick={()=>distpatch(increament())} className={`${mode ==='dark' ? styles.buttonBuyStyleDark: styles.buttonBuyStyle} btn `}>
                                <i className="fa-solid fa-cart-shopping"></i>
                            </button>
                        </div>
                       <Link to={`/BookInformation/${limitedBook.slug}`}>
                            <img
                            src={`http://127.0.0.1:8000/${limitedBook.image.image_url}`}
                            className={styles.cardImgTop}
                            alt={limitedBook.title}
                            />
                        </Link>

                    </div>
                    <div className={`${ mode ==='dark' ?styles.cardBodyDrak: styles.cardBody}`}>
                        <div className={styles.priceDivStyle}>
                            <span className={`${mode === 'dark' ? styles.tomanDark: styles.toman}`}>ءتءءء</span>
                            {limitedBook.discounted_price ? (
                                <div className={styles.priceStyle}>
                                    <span className={`${mode ==='dark'? styles.priceTextStyleDark: styles.priceTextStyle}`}>
                                        {limitedBook.discounted_price.toLocaleString('fa-IR')}
                                    </span>
                                    <span className={`${mode === "dark" ? styles.offPriceTextStyleDark :styles.offPriceTextStyle} text-decoration-line-through`}>
                                        {limitedBook.price.toLocaleString('fa-IR')}
                                    </span>
                                </div>
                            ) : (
                                <div className={styles.priceStyle}>
                                    <span className={`${mode === "dark" ? styles.priceTextStyleDark: styles.priceTextStyle}`}>
                                        {limitedBook.price.toLocaleString('fa-IR')}
                                    </span>
                                </div>
                            )}
                        </div>
                        <div className={styles.titleStyle}>
                            <Link className={`${mode ==="dark" ?styles.titleTextStyleDark: styles.titleTextStyle}`} to={`/BookInformation/${limitedBook.slug}`}>
                                <div >{limitedBook.title}</div>
                            </Link>
                            <div className={`${mode==="dark" ? styles.authorStyleDark : styles.authorStyle}`}>{limitedBook.Info.author}</div>
                        </div>
                    </div>
                </div>
            );
        })}
        
    </div>
   
</div>
<Footer/>
</div>
  )
}
