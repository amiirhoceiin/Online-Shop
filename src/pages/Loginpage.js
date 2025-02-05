import React, { useState } from 'react';
import './Loginpage.css';
import LoginForm from '../components/LoginForm';
import RegisteForm from '../components/RegisteForm';
import { useTheme } from '../hooks/useTheme';

export default function Loginpage() {
  const [isLogin,setIsLogin] =useState(true)
  const {mode} = useTheme();
  return (
    <div className={`${mode}`}>
     {isLogin ? <LoginForm isLogin={isLogin} setIsLogin={setIsLogin}/> : <RegisteForm isLogin={isLogin} setIsLogin={setIsLogin}/>}
     
    </div>
  );
}
