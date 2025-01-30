import React from 'react';
import './LoginForm.css';
import { NavLink } from 'react-router-dom';

export default function LoginForm() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
           <form className="container containerstyle p-4">
        <div className='formlogo mb-5'>
          Boook
        </div>
        <div className='formname mb-3'>ورود/ثبت نام</div>
        <div className=" formbodystyle">
          <label htmlFor="exampleInputPassword1" className="form-label mt-1">سلام!<br></br>لطفا نام کاربری و رمز عبور خود را وارد کنید</label>
          <input className='form-control mt-3' type="tel" name="phone" required placeholder='نام کاربری'/>
          <input className='form-control mt-3 mb-4' type="tel" name="phone" required placeholder='رمز عبور'/>
          
        </div>

        <button type="submit" className="btn btn-primary mb-4">ورود</button>
          <div  style={{fontSize:'12px',textAlign:'center'}}>ورود شما به معنای پذیرش <NavLink style={{textDecoration:'none'}} to={"/"}>قوانین خصوصی</NavLink> است</div>
        </form>
    </div>
  )
}
