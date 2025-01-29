import React from 'react'
import './Home.css'
import Carousel from '../components/Carousel'
import CardSection from '../components/CardSection'
import Footer from '../components/Footer'


export default function Home() {
  return (
    <div>
        <Carousel/>
        <CardSection/>
        <CardSection/>
        <Footer/>
    </div>
  )
}
