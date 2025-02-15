import React from 'react'
import './Carousel.css'
import { useTheme } from '../hooks/useTheme';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const fetchSlider = ()=>{
 return axios.get('http://localhost:3000/books').then(res=>res.data);
}

export default function Carousel() {
  const {mode} = useTheme();
  const {data:sliderBooks,isLoading,isError,error} = useQuery({
    queryKey : ['sliderBooks'],
    queryFn : fetchSlider,
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
    refetchOnWindowFocus: true,  
    refetchOnMount: false
  });
  if (isLoading) {
    return <div className='d-flex justify-content-center m-4'>در حال بارگذاری...</div>;
  }

  if (isError) {
    return <div className='d-flex justify-content-center m-4'>{error.message}</div>;
  }

  const limitedData = sliderBooks?.slice(0, 5); 

  
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
  {limitedData?.map((limited,index)=>(
      <div key={limited.id} 
      className={`carousel-item ${index === 0 ? 'active' : ''}`}>
        <img src={limited.imageSlider} title={limited.title} className="d-block w-100 " alt="..."/>
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
