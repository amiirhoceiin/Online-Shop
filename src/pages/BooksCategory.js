import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import styles from './BooksCategory.module.css';
import { useParams } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

const FetchBook = (category, page, limit) => {
  return axios
    .get(`http://127.0.0.1:8000/product/filter/?category=${category}&page=${page}`)
    .then((res) => res.data);
};

export default function Books() {
  const { category } = useParams();
  const { mode } = useTheme();
  const [page, setPage] = useState(1);
  const limit = 5; 

  const { data: Books, isLoading, isError, error } = useQuery({
    queryKey: ['bookCategory', category, page],
    queryFn: () => FetchBook(category, page, limit),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    enabled: !!category,
  });

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
    <div  styles={{border: '10px solid blue' ,width: '100%' ,height: '100px', backgroundColor: 'black', zindex: "100000"}}>
    <div className={`${styles.containerstyle} container-fluid mt-5`}>
      <div className={`${styles.rowstyle} row`}>
        {Books?.map((limitedBook) => {
          const discountPercentage =
            limitedBook.price && limitedBook.discounted_price
              ? (((limitedBook.price - limitedBook.discounted_price) / limitedBook.price) * 100)
              : null;
  
          return (
            <div key={limitedBook.Info.id} className={styles.customCol}>
              <div className={`${mode === 'dark' ? styles.cardTopStyleDark : styles.cardTopStyle}`}>
                <div className={styles.divTopStyle}>
                  {discountPercentage ? (
                    <button className={`${styles.buttonOffStyle} badge`}>
                      {`${discountPercentage.toLocaleString('fa-IR')}٪`}
                    </button>
                  ) : null}
                  <button className={`${mode === 'dark' ? styles.buttonBuyStyleDark : styles.buttonBuyStyle} btn `}>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </button>
                </div>
                <img
                  src={`http://127.0.0.1:8000/${limitedBook.image.image_url}`}
                  className={styles.cardImgTop}
                  alt={limitedBook.title}
                />
              </div>
              <div className={`${mode === 'dark' ? styles.cardBodyDrak : styles.cardBody}`}>
                <div className={styles.priceDivStyle}>
                  <span className={`${mode === 'dark' ? styles.tomanDark : styles.toman}`}>ءتءءء</span>
                  {limitedBook.discounted_price ? (
                    <div className={styles.priceStyle}>
                      <span className={`${mode === 'dark' ? styles.priceTextStyleDark : styles.priceTextStyle}`}>
                        {limitedBook.discounted_price.toLocaleString('fa-IR')}
                      </span>
                      <span className={`${mode === "dark" ? styles.offPriceTextStyleDark : styles.offPriceTextStyle} text-decoration-line-through`}>
                        {limitedBook.price.toLocaleString('fa-IR')}
                      </span>
                    </div>
                  ) : (
                    <div className={styles.priceStyle}>
                      <span className={`${mode === "dark" ? styles.priceTextStyleDark : styles.priceTextStyle}`}>
                        {limitedBook.price.toLocaleString('fa-IR')}
                      </span>
                    </div>
                  )}
                </div>
                <div className={styles.titleStyle}>
                  <div className={`${mode === "dark" ? styles.titleTextStyleDark : styles.titleTextStyle}`}>{limitedBook.title}</div>
                  <div className={`${mode === "dark" ? styles.authorStyleDark : styles.authorStyle}`}>{limitedBook.Info.author}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    <div className={`d-flex justify-content-center align-items-center mt-4 ${styles.pagination}`}>
        <button className={`btn`}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          قبلی
        </button>
        <span style={{margin:'10px'}}>{page} صفحه</span>
        <button className={`btn`}
          onClick={() => setPage((prev) => prev + 1)}
          disabled={Books?.length < limit}
        >
          بعدی
        </button>
      </div>
    </div>
  );
}