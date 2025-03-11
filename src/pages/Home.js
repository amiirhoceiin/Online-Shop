import React from 'react'
import './Home.css'
import Carousel from '../components/Carousel'
import CardSection from '../components/CardSection'
import Footer from '../components/Footer'


export default function Home() {
  return (
    <div  style={{width:'100%',margin:'0 auto',minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <Carousel/>
        <CardSection/>
        <CardSection/>
        <Footer/>
    </div>
  )
}
