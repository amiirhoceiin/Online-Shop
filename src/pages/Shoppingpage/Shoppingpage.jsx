import React from 'react'
import styles from './Shoppingpage.module.css'
import Footer from '../../components/Footer'
import { useSelector } from 'react-redux'

export default function Shoppingpage() {
    const mode = useSelector(state=>state.theme.mode)
  return (
    <div className={` ${mode === 'dark' ? styles.containerfluidDark : styles.containerfluid}`}>
      <div className={`container ${styles.container}`}>
        <h1>سبد خرید </h1>
      </div>
      <div className={styles.Footer}>
       <Footer/>
      </div>
  </div>
  )
}
