import React from 'react'
import './Carousel.css'
import Slide from '../img/slide/db4d9578201897b7c050248c6a4bfbd2.png'
import { useTheme } from '../hooks/useTheme';

export default function Carousel() {
  const {mode} = useTheme();
  return (
    <div className='Slider'> 
        <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
   <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="4" aria-label="Slide 5"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={Slide} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={Slide} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={Slide} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src={Slide} class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item"> 
      <img src={Slide} class="d-block w-100" alt="..."/>
    </div>
  </div>
  <div class="custom-controls"> 

      <button className={`carousel-control-prev ${mode}`} type="button" data-bs-target="#carouselExampleIndicators"     
       data-bs-slide="prev">
       <i class="fa-solid fa-arrow-left"></i>
       <span class="visually-hidden">Previous</span>
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
