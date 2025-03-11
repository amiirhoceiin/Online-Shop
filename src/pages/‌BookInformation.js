import React from 'react';
import styles from './BookInformation.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '../hooks/useTheme';
import Footer from '../components/Footer';
import Rate from '../components/Rate';

const fetchBook = (bookurl) => {
  return axios.get(`http://127.0.0.1:8000/product/${bookurl}/`).then((res) => res.data);
};

export default function BookInformation() {
  const { mode } = useTheme();
  const { bookurl } = useParams();

  const { data: booksInformation, isLoading, isError, error } = useQuery({
    queryKey: ['bookinformation', bookurl],
    queryFn: () => fetchBook(bookurl),
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
    <div className={`container ${mode === 'dark' ? styles.containerfluidDark : styles.containerfluid}`}>
      <div className={`${mode === 'dark' ? styles.cardStyleDark : styles.cardStyle} card`}>
        <div className={styles.sec1CardStyle}>
          <img 
            src={`http://127.0.0.1:8000/${booksInformation.image.image_url}`} 
            className="card-img-top" 
            style={{ height: '300px', width: '200px', borderRadius: '25px' }} 
            alt={booksInformation.title || 'book cover'}
          />
          <div className="card-body">
            <h4 className="card-title" style={{ textAlign: 'right',whiteSpace:'nowrap' }}>
              {booksInformation.title}
            </h4>
            <div className="card-text mt-5">
              <p style={textStyle}>نویسنده: {booksInformation.Info.author}</p>
              <p style={textStyle}>مترجمان: {booksInformation.Info.translator}</p>
              <p style={textStyle}>فروشنده: {booksInformation.Info.seller_name}</p>
              <p style={textStyle}>ناشر: {booksInformation.Info.publisher.title}</p>
              <p style={textStyle}>چاپ: {booksInformation.Info.print}</p>
            </div>
          </div>
         </div>
         <div className={styles.sec2CardStyle}>
          <Rate/>
          <div className='d-flex flex-column mt-3 p-5'>
            <p style={{direction:'rtl'}}>خلاصه :</p>
            <p style={{direction:'rtl'}}>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد. کتابهای زیادی در شصت و سه درصد گذشته، حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد ...</p>
          </div>
  
         </div>
            
        </div>
      <Footer />
    </div>
  );
}

const textStyle = {
  textAlign: 'right',
  direction: 'rtl',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};
