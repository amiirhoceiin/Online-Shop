import React,{useEffect} from 'react'
import './Carousel.css'
import axios from 'axios';
import { Carousel as BootstrapCarousel } from 'bootstrap';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const fetchSlider = ()=>{
 return axios.get('http://127.0.0.1:8000/product/slider/').then(res=>res.data);
}

export default function Carousel() {
  const mode = useSelector(state=>state.theme.mode)
  useEffect(() => {
    const carouselElement = document.getElementById('carouselExampleIndicators');
    if (carouselElement) {
      const carousel = new BootstrapCarousel(carouselElement, {
        interval: 3000,
        ride: 'carousel',
      });
    }
  }, []);
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
    <div className={`Slidersec ${mode}`}>
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
      <div key={limited.order} 
      className={`carousel-item ${index === 0 ? 'active' : ''}`}>
        <img src={`http://127.0.0.1:8000/${limited.image.image_url}`} title={limited.title} className="d-block w-100 imgslider" alt="..."/>
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
    </div>
  )
}
