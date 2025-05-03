import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router-dom';

export default function RegisteForm(props) {
    const [showPassword, setShowPassword] = useState(false);
    const [apiSuccessMessage, setApiSuccessMessage] = useState('');
    const [apiErrorMessage, setApiErrorMessage] = useState('');
    
    const schema = yup.object().shape({
      username : yup.string().required("نام کاربری الزامی است").matches(/^(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/, "نام کاربری باید ۸ کاراکتر و شامل اعداد و حروف انگلیسی باشد."),

      password : yup.string().required("رمز عبور الزامی است.").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@])[A-Za-z\d@]{8,}$/, 
        "رمز عبور باید حداقل ۸ کاراکتر، یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر @ باشد."),


      confirmpassword : yup.string().oneOf([yup.ref('password')], "رمزهای عبور یکسان نیستند.").required("تکرار رمز عبور الزامی است.")
    }) 

    const {register,handleSubmit,formState:{errors}}=useForm({resolver:yupResolver(schema)});
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

    const onFormSubmit = (data) => {
            const endpoint = "http://127.0.0.1:8000/signup/"
            const sanitizedData = {
              username : data.username,
              password: data.password
            }
            axios.post(endpoint,sanitizedData,{
                headers:{'Content-Type': 'application/json'}
            }).then(res=>{
               if(res.status === 200 || res.status === 201){
                setApiSuccessMessage('ثبت نام موفقیت آمیز بود');
                setTimeout(() => {
                  props.setIsLogin(!props.isLogin);
                }, 500);
                
               } 
            }).catch(error=>{
                if(error.response){
                  setApiErrorMessage(error.message);
                }
                else{
                  setApiErrorMessage('خطای شبکه، لطفاً دوباره تلاش کنید');
                }
                console.error('Error:', error);
              })

    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
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
                <div className={`formlogo ${errors.username || errors.password ? 'mb-0' : 'mb-2' }`}>
                    Boook
                </div>
                <div className={`formname ${errors.username || errors.password ? 'mb-0' : 'mb-3' }`}>ثبت نام</div>
                <div className="formbodystyle">
                    <label className={`form-labe ${errors.username || errors.password ? 'mb-1' : 'mb-2' }`}>سلام!<br />لطفا نام کاربری و رمز عبور خود را وارد کنید</label>

                    <input className={`form-control ${errors.username || errors.password ? 'mt-1' : 'mt-3' }`}  type="text" name="username" placeholder='نام کاربری' 
                    {...register("username")} />
                    {errors.username && <p style={{ color: "red",fontSize:"small" }}>{errors.username?.message}</p>}
                    



                    <input className={`form-control ${errors.username || errors.password ? 'mt-2 mb-1'  : 'mt-3 mb-1' } `} type={showPassword ? "text" : "password"} name="password"  placeholder='رمز عبور'
                       {...register("password")}  />
                       {errors.password && <p style={{ color: "red",fontSize:"small" }}>{errors.password?.message}</p>}
                         



                    <input className={`form-control ${errors.username || errors.password ? 'mt-1 mb-1'  : 'mt-3 mb-1' } `}type={showPassword ? "text" : "password"} name="confirmpassword" placeholder='تکرار رمز عبور'
                      {...register("confirmpassword")}/>
                      {errors.confirmpassword && <p style={{ color: "red",fontSize:"small" }}>{errors.confirmpassword?.message}</p>}
                    



                    <input className={`${errors.username || errors.password || errors.confirmpassword? 'mb-2' : 'mb-4'} `} type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                    <label style={{ fontSize: 'small' }}>&nbsp;نمایش</label>




                </div>
                <button type="submit" className={`btn btn-primary ${errors.username || errors.password ? 'mb-1' : 'mb-3'}`}>تایید</button>
                <div style={{ fontSize: '12px', textAlign: 'center' }}>ورود شما به معنای پذیرش <NavLink style={{ textDecoration: 'none' }} to={"/"}>قوانین خصوصی</NavLink> است</div>
                
                <button className='btn  btn-sm' onClick={()=>props.setIsLogin(!props.isLogin)}>{props.isLogin?'ثبت نام ':'ورود'}</button>
            </form>
        </div>
    );
}