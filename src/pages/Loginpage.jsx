import React, { useState } from 'react';
import './Loginpage.css';
import LoginForm from '../components/LoginForm';
import RegisteForm from '../components/RegisteForm';
import { useSelector } from 'react-redux';

export default function Loginpage() {
  const [isLogin,setIsLogin] =useState(true)
  const mode = useSelector(state=>state.theme.mode)
  return (
    <div className={`${mode}`}>
     {isLogin ? <LoginForm isLogin={isLogin} setIsLogin={setIsLogin}/> : <RegisteForm isLogin={isLogin} setIsLogin={setIsLogin}/>}
     
    </div>
  );
}
