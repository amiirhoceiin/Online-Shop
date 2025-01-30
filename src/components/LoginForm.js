import React, { useState } from 'react';
import './LoginForm.css';
import { NavLink } from 'react-router-dom';

export default function LoginForm() {
   const [username,setUsername] = useState('');
   const [password,setPassword] = useState('');
   const [errorMessage, setErrorMessage] = useState('');

     
    const handelsubmit = (e)=>{
        e.preventDefault();
        console.log(username);
        const data = {username,password};
       fetch('http://your-backend-url/auth',{
        method : 'POST',
        headers : {
            'Conetent-Type': 'application/json',
        },
        body: JSON.stringify(data)
       })
       .then((response)=>{
        if(!response.ok){
            throw new Error('dont fetch api')
        }
        return response.json();
       })
       .then((result)=>{
        if (result.token){
            localStorage.setItem('token', result.token);
            alert('ورود/ثبت نام موفقیت‌آمیز!');
        }else {
            setErrorMessage(result.message || 'خطایی در ورود پیش آمده');
        }
       }).catch((error) => {
        setErrorMessage('خطای شبکه، لطفاً دوباره تلاش کنید');
        console.error('Error:', error);
    });
    }

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
           <form className="container containerstyle p-4" onSubmit={(e)=>handelsubmit(e)}>
        <div className='formlogo mb-5'>
          Boook
        </div>
        <div className='formname mb-3'>ورود/ثبت نام</div>
        <div className=" formbodystyle">
          <label htmlFor="exampleInputPassword1" className="form-label mt-1">سلام!<br></br>لطفا نام کاربری و رمز عبور خود را وارد کنید</label>
          <input className='form-control mt-3' value={username} type="tel" name="phone" required placeholder='نام کاربری' onChange={(e)=>setUsername(e.target.value)}/>
          
          <input className='form-control mt-3 mb-4' value={password} type="tel" name="phone" required placeholder='رمز عبور'
          onChange={(e)=>setPassword(e.target.value)}/>
          
        </div>

        <button type="submit" className="btn btn-primary mb-4">ورود</button>
          <div  style={{fontSize:'12px',textAlign:'center'}}>ورود شما به معنای پذیرش <NavLink style={{textDecoration:'none'}} to={"/"}>قوانین خصوصی</NavLink> است</div>
        </form>
    </div>
  )
}
