import React from 'react'
import './Home.css'
import Carousel from '../components/Carousel'
import CardSection from '../components/CardSection'
import Footer from '../components/Footer'


export default function Home() {
  return (
    <div  style={{width:'100%',maxWidth:'1440px',margin:'0 auto'}}>
        <Carousel/>
        <CardSection/>
        <CardSection/>
        <Footer/>
    </div>
  )
}
