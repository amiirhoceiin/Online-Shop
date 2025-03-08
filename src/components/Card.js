import React from 'react';
import { useTheme } from '../hooks/useTheme';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styles from './Card.module.css'; // Import CSS Module
import { useNumberPurchase } from '../hooks/useNumberPurchase';

const useFetch = () => {
    return axios.get('http://127.0.0.1:8000/product/most-sells-products/').then((res) => res.data);
};

export default function Card() {
    const { mode } = useTheme();
     const {changeNumberPurchase}=useNumberPurchase();
    
 
    const { data: bookSuggestion, isLoading, isError, error } = useQuery({
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

    const limitedBooks = bookSuggestion?.slice(0, 5);

    return (
        <div className={`${styles.containerstyle} container-fluid`}>
            <div className={`${styles.rowstyle} row`}>
                {limitedBooks?.map((limitedBook) => {
                    const discountPercentage =
                        limitedBook.price && limitedBook.discounted_price
                            ? (((limitedBook.price - limitedBook.discounted_price) / limitedBook.price) * 100)
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
                                    <button onClick={()=>changeNumberPurchase()} className={`${mode ==='dark' ? styles.buttonBuyStyleDark: styles.buttonBuyStyle} btn `}>
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
    );
}