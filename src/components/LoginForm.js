import React, { useState } from 'react';
import './LoginForm.css';
import { NavLink, useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const navigate =  useNavigate();
   const [username,setUsername] = useState('');
   const [password,setPassword] = useState('');
   const [isSignup,setIsSignup] =useState(false);
   const [showPasswordBtn, setShowPasswordBtn] = useState(false);
   const [errorMessage, setErrorMessage] = useState('');

   const handelPass = (e)=>{
    setPassword(e.target.value)
   }

     
    const handelsubmit = (e)=>{
        e.preventDefault();
        const endpoint = isSignup ? "http://your-backend-url/signup" : "http://your-backend-url/login";
        const data = {username,password};
       fetch(endpoint,{
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
            navigate('/home');
            alert(isSignup?'ثبت نام موفقیت آمیز بود':'ورود موفقیت آمیز بود');
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
           <form className="container containerstyle p-4" onSubmit={handelsubmit}>
        <div className='formlogo mb-5'>
          Boook
        </div>
        <div className='formname mb-3'>{isSignup?'ثبت نام ' : 'ورود'}</div>
        <div className=" formbodystyle">
          <label  className="form-label mt-1">سلام!<br></br>لطفا نام کاربری و رمز عبور خود را وارد کنید</label>
          <input className='form-control mt-3' value={username} type="text" name="phone" required placeholder='نام کاربری' onChange={(e)=>setUsername(e.target.value)}/>
          
          <input className='form-control mt-3 mb-1' value={password} type={showPasswordBtn ? "text" : "password"}  name="phone" required placeholder='رمز عبور' minLength={8} maxLength={20}
            onCopy={(e) => e.preventDefault()} 
            onPaste={(e) => e.preventDefault()}
            pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$"
            title="رمز عبور باید شامل حداقل ۸ کاراکتر، یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص باشد"
          onChange={handelPass}/>
          
          <input className='mb-3' type="checkbox" onClick={()=>setShowPasswordBtn(!showPasswordBtn)}/>
          <label style={{fontSize:'small'}}>&nbsp;نمایش</label>
          
        </div>
          <div className='d-flex justify-content-center align-items-center kjnrf3nh  mb-2' style={{fontSize:'12px'}}>
          {isSignup&&<p className='r3jr'>اگر قبلا ثبت نام کردید ؟ </p>}
          <button className='btn  hbjh ' style={{width:'80px',fontSize:'12px'}} onClick={()=>setIsSignup(!isSignup)}>{isSignup?'ورود':'ثبت نام'}</button>
           </div>
        <button type="submit" className="btn btn-primary mb-4">{isSignup?'ثبت نام':'ورود'}</button>
          <div  style={{fontSize:'12px',textAlign:'center'}}>ورود شما به معنای پذیرش <NavLink style={{textDecoration:'none'}} to={"/"}>قوانین خصوصی</NavLink> است</div>
        </form>
    </div>
  )
}
