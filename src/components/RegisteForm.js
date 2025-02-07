import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function RegisteForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordSecond,setPasswordSecond] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordError,setPasswordError] =useState('');


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handlePasswordSecondChange=(e)=>{
        setPasswordSecond(e.target.value);
        if (password !== e.target.value) {
            setPasswordError('رمز عبور و تکرار آن یکسان نیستند');
        } else {
            setPasswordError('');
        }
    }
        useEffect(() => {
          if (errorMessage) {
              const timer = setTimeout(() => setErrorMessage(''), 3000);
              return () => clearTimeout(timer);
          }
      }, [errorMessage]);



    const handleSubmit = (e) => {
            e.preventDefault();
            if(password !==passwordSecond){
                setErrorMessage('رمز عبور و تکرار آن یکسان نیستند');
                return;
            }
            const endpoint = "https://f215-2a12-5940-f25a-00-2.ngrok-free.app/signup/"
            const data = { username, password };

        
            axios.post(endpoint,data,{
                headers:{'Content-Type': 'application/json'}
            }).then(res=>{
               if(res.status === 200 || res.status === 201){
                props.setIsLogin(!props.isLogin);
                alert('ثبت نام موفقیت آمیز بود');
               }else {
                setErrorMessage(res.data.message || 'خطایی در ورود پیش آمده');
               }
            }).catch(error=>{
                setErrorMessage('خطای شبکه، لطفاً دوباره تلاش کنید');
                console.error('Error:', error);
              })

    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <form className="container containerstyle p-4" onSubmit={handleSubmit}>
                <div className='formlogo mb-2'>
                    Boook
                </div>
                <div className='formname mb-3'>ثبت نام</div>
                <div className="formbodystyle">
                    <label className="form-label mt-1">سلام!<br />لطفا نام کاربری و رمز عبور خود را وارد کنید</label>
                    <input className='form-control mt-3' value={username} type="text" name="phone" required placeholder='نام کاربری' onChange={(e) => setUsername(e.target.value)} />

                    <input className='form-control mt-3 mb-1' value={password} type={showPassword ? "text" : "password"} name="phone" required placeholder='رمز عبور' minLength={8} maxLength={20}
                        onCopy={(e) => e.preventDefault()}
                        onPaste={(e) => e.preventDefault()}
                        pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$"
                        title="رمز عبور باید شامل حداقل ۸ کاراکتر، یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص باشد"
                        onChange={handlePasswordChange} />



                    <input className='form-control mt-3 mb-1' value={passwordSecond} type={showPassword ? "text" : "password"} name="phone" required placeholder='تکرار رمز عبور' minLength={8} maxLength={20}
                      onCopy={(e) => e.preventDefault()}
                      onPaste={(e) => e.preventDefault()}
                      pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$"
                     onChange={handlePasswordSecondChange} />

                     {passwordError && <div className="text-danger mt-2">{passwordError}</div>}

                    <input className='mb-3' type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                    <label style={{ fontSize: 'small' }}>&nbsp;نمایش</label>

                </div>
                <button type="submit" className="btn btn-primary mb-4" disabled={passwordError !== ''}>تایید</button>
                <div style={{ fontSize: '12px', textAlign: 'center' }}>ورود شما به معنای پذیرش <NavLink style={{ textDecoration: 'none' }} to={"/"}>قوانین خصوصی</NavLink> است</div>
                {errorMessage && <div className="alert alert-danger m1">{errorMessage}</div>}
                <button className='btn  btn-sm' onClick={()=>props.setIsLogin(!props.isLogin)}>{props.isLogin?'ثبت نام ':'ورود'}</button>
            </form>
        </div>
    );
}