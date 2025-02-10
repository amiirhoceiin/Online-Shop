import React, { useEffect, useState } from 'react'
import './Carousel.css'
import { useTheme } from '../hooks/useTheme';
import useFetch from '../hooks/useFetch';

export default function Carousel() {
  const {mode} = useTheme();
  const {data:book,isLoading,error} = useFetch('http://localhost:3000/books');
  const [sliderBooks,setSliderBooks] = useState([]);

      useEffect(() => {
          if (book) {
            setSliderBooks(book.slice(0, 5));
          }
        }, [book]); 

        if (isLoading) {
          return <div>Loading...</div>;
        }
      
        if (error) {
          return <div>Error: {error.message}</div>;
        }


  return (
    <div className='Slider'> 
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
   <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
  </div>

  
  <div className="carousel-inner ">
  {sliderBooks.map((sliderBook,index)=>(
      <div key={sliderBook.id} 
      className={`carousel-item ${index === 0 ? 'active' : ''}`}>
        <img src={sliderBook.imageSlider} title={sliderBook.title} className="d-block w-100" alt="..."/>
      </div>
     ))}
  </div>



  <div className="custom-controls">
      <button className={`carousel-control-prev ${mode}`} type="button" data-bs-target="#carouselExampleIndicators"     
       data-bs-slide="prev">
       <i className="fa-solid fa-arrow-left"></i>
       <span className="visually-hidden">Previous</span>
      </button>
      <button className={`carousel-control-next ${mode}`} type="button" data-bs-target="#carouselExampleIndicators"    
       data-bs-slide="next">
       <i className="fa-solid fa-arrow-right"></i>
       <span className="visually-hidden">Next</span>
      </button>

   </div>
 </div>
</div>
  )
}
