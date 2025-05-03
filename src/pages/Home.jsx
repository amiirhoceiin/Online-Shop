import React from 'react'
import './Home.css'
import Carousel from '../components/Carousel'
import CardSection from '../components/CardSection'
import Footer from '../components/Footer'


export default function Home() {
  return (
<div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
  <Carousel />
  <div style={{ flex: 1 }}>
    <CardSection />
    <CardSection />
  </div>
  <Footer />
</div>

  )
}
