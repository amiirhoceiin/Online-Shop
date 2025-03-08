import React from 'react'
import { useTheme } from '../hooks/useTheme';
import './CardSection.css'
import { Link} from 'react-router-dom';
import Card from './Card'



export default function CardSection() {
  const {mode} = useTheme();
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
