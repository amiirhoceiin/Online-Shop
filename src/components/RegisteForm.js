import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function RegisteForm(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordSecond,setPasswordSecond] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [apiSuccessMessage, setApiSuccessMessage] = useState('');
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    const [formEror,setFormError] =useState({username:"",password:"",passwordSecond:""});

    const validate = () => {
        const usernamePattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let newErrors = { username: "", password: "", confirmPassword: "" };
    
        if (!usernamePattern.test(username)) {
          newErrors.username = "نام کاربری باید دقیقا ۸ کاراکتر و شامل اعداد و حروف انگلیسی باشد.";
        }
        if (!passwordPattern.test(password)) {
          newErrors.password = "رمز عبور باید حداقل ۸ کاراکتر، یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص باشد.";
        }
        if (password !== passwordSecond) {
          newErrors.passwordSecond = "رمزهای عبور یکسان نیستند.";
        }
    
        setFormError(newErrors);
        return Object.values(newErrors).every((formEror) => formEror === ""); // بررسی اینکه همه فیلدها معتبر باشند
      }
  
        useEffect(() => {
          if (apiErrorMessage) {
              const timer = setTimeout(() => setApiErrorMessage(''), 3000);
              return () => clearTimeout(timer);
          }
      }, [apiErrorMessage]);

      useEffect(() => {
        if (apiSuccessMessage) {
            const timer = setTimeout(() => setApiSuccessMessage(''), 3000);
            return () => clearTimeout(timer);
        }
    }, [apiSuccessMessage]);

    const handleSubmit = (e) => {
            e.preventDefault();
            if (!validate()) return;
            const endpoint = "https://f215-2a12-5940-f25a-00-2.ngrok-free.app/signup/"
            const data = { username, password };
            axios.post(endpoint,data,{
                headers:{'Content-Type': 'application/json'}
            }).then(res=>{
               if(res.status === 200 || res.status === 201){
                props.setIsLogin(!props.isLogin);
                setApiSuccessMessage('ثبت نام موفقیت آمیز بود');
               }
            }).catch(error=>{
                if(error.response){
                  setApiErrorMessage('خطایی در ورود پیش آمده');
                }
                else{
                  setApiErrorMessage('خطای شبکه، لطفاً دوباره تلاش کنید');
                }
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





                    <input className='form-control mt-3' value={username} type="text" name="phone" placeholder='نام کاربری' onChange={(e) => setUsername(e.target.value)} />
                    {formEror.username && <p style={{ color: "red" }}>{formEror.username}</p>}




                    <input className='form-control mt-3 mb-1' value={password} type={showPassword ? "text" : "password"} name="phone"  placeholder='رمز عبور'
                        onChange={(e)=>setPassword(e.target.value)} />
                         {formEror.password && <p style={{ color: "red" }}>{formEror.password}</p>}



                    <input className='form-control mt-3 mb-1' value={passwordSecond} type={showPassword ? "text" : "password"} name="phone" placeholder='تکرار رمز عبور'
                     onChange={(e)=>setPasswordSecond(e.target.value)} />
                    {formEror.passwordSecond && <p style={{ color: "red" }}>{formEror.passwordSecond}</p>}



                    <input className='mb-3' type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                    <label style={{ fontSize: 'small' }}>&nbsp;نمایش</label>




                </div>
                <button type="submit" className="btn btn-primary mb-4">تایید</button>
                <div style={{ fontSize: '12px', textAlign: 'center' }}>ورود شما به معنای پذیرش <NavLink style={{ textDecoration: 'none' }} to={"/"}>قوانین خصوصی</NavLink> است</div>
                
                <button className='btn  btn-sm' onClick={()=>props.setIsLogin(!props.isLogin)}>{props.isLogin?'ثبت نام ':'ورود'}</button>

                {apiErrorMessage && 
                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                    <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:">
                      <use href="#exclamation-triangle-fill" />
                    </svg>
                    <div>{apiErrorMessage}</div>
                  </div>
                }


                {apiSuccessMessage && <div className="alert alert-success d-flex align-items-center" role="alert">
                   <svg className="bi flex-shrink-0 me-2" width="24" height="24" role="img"      aria-label="Success:"><use href="#check-circle-fill"/></svg>
                    <div>
                     {apiSuccessMessage}
                   </div>
                 </div>}
            </form>
        </div>
    );
}