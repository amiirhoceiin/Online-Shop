import React from 'react';
import './Loginpage.css';
import LoginForm from '../components/LoginForm';
import { useTheme } from '../hooks/useTheme';

export default function Loginpage() {
  const {mode} = useTheme();
  return (
    <div className={`${mode}`}>
     <LoginForm/>
    </div>
  );
}
