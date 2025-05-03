import React from 'react'
import './CardSection.css'
import { Link} from 'react-router-dom';
import Card from './Card'
import { useSelector } from 'react-redux';



export default function CardSection() {
  const mode = useSelector(state=>state.theme.mode)
  return (
    <div className={`cardsection container-fluid ${mode}`}>
        <div className={`headercardsection ${mode}`}>
         <Link className={`button ${mode}`} to={'/booksmostsels'}>بیشتر</Link>
         <hr className={` ${mode}`} style={{ borderTop: '1px solid gray',margin:'0 auto',width:'1056px'}} />
         <h4 className={` ${mode}`}>پرفروش های هفته</h4>
        </div>
        <Card/>
    </div>
  )
}
