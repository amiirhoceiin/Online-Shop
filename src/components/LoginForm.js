import React, { useEffect, useState } from 'react';
import './LoginForm.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export default function LoginForm(props) {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [apiSuccessMessage, setApiSuccessMessage] = useState('');
    const [apiErrorMessage, setApiErrorMessage] = useState('');

    const schema = yup.object().shape({
      username :  yup.string().matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/, "نام کاربری باید ۸ کاراکتر و شامل اعداد و حروف انگلیسی باشد.").required("نام کاربری الزامی است"),
      password : yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
        "رمز عبور باید حداقل ۸ کاراکتر، یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص باشد.")
        .required("رمز عبور الزامی است."),
    })
    
    const {register,handleSubmit,formState:{errors}} = useForm({resolver:yupResolver(schema)});


    useEffect(() => {
      const timer = setTimeout(() => {
          setApiErrorMessage('');
          setApiSuccessMessage('');
      }, 3000);
  
      return () => clearTimeout(timer);
  }, [apiErrorMessage, apiSuccessMessage]);

  
    const onFormSubmit = (data) => {
        
        const endpoint = "https://f215-2a12-5940-f25a-00-2.ngrok-free.app/signin/";
        const sanitizedData = {
          username : data.username,
          password: data.password
        }
        
        axios.post(endpoint,sanitizedData,{
        headers:{'Content-Type': 'application/json'}
       })
        .then(res =>{ 
          if(res.status === 200){
           localStorage.setItem('token',res.data.access);
            navigate('/');
            setApiSuccessMessage('ورود موفقیت‌آمیز بود');
          }
        }).catch(error=>{
          if(error.response){
            setApiErrorMessage('خطایی در ورود پیش آمده');
          }else{
            setApiErrorMessage('خطای شبکه، لطفاً دوباره تلاش کنید');
          }
          console.error('Error:', error);
        })
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: '100vh' }}>
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
            <form className="container containerstyle p-4" onSubmit={handleSubmit(onFormSubmit)}>
                <div className='formlogo mb-5'>
                    Boook
                </div>
                <div className='formname mb-3'>ورود</div>
                <div className="formbodystyle">

                    <label className="form-label mt-1">سلام!<br />لطفا نام کاربری و رمز عبور خود را وارد کنید</label>



                    <input className='form-control mt-3'  type="text" name="username"  placeholder='نام کاربری' {...register("username")} />
                    {errors.username && <p style={{color:'red'}}>{errors.username?.message}</p>}
                    



                    <input className='form-control mt-3 mb-1'  type={showPassword ? "text" : "password"} name="password"  placeholder='رمز عبور' {...register("password")} />
                    {errors.password && <p style={{color:'red'}}>{errors.password?.message}</p>}
                    




                    <input className='mb-3' type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                    <label style={{ fontSize: 'small' }}>&nbsp;نمایش</label>

                </div>
                <button type="submit" className="btn btn-primary mb-4">تایید</button>
                <div style={{ fontSize: '12px', textAlign: 'center' }}>ورود شما به معنای پذیرش <NavLink style={{ textDecoration: 'none' }} to={"/"}>قوانین خصوصی</NavLink> است</div>
              
                <button className='btn  btn-sm' onClick={()=>props.setIsLogin(!props.isLogin)}>{props.isLogin?'ثبت نام ':'ورود'}</button>
            </form>
        </div>
    );
}