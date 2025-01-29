import React from 'react';
import './Loginpage.css';
import { NavLink } from 'react-router-dom';

export default function Loginpage() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <form className="container containerstyle p-4">
        <div className='formlogo mb-5'>
          Boook
        </div>
        <div className='formname mb-5'>ورود/ثبت نام</div>
        <div className="mb-5 formbodystyle">
          <label htmlFor="exampleInputPassword1" className="form-label">سلام!<br></br>لطفا شماره موبایل خود را وارد کنید</label>
          <input className='form-control mt-3 mb-1' type="tel" name="phone" required/>
          <div id="emailHelp" class="form-text">
          لطفا این قسمت را خالی نگذارید</div>
        </div>

        <button type="submit" className="btn btn-primary mb-3">ورود</button>
          <div  style={{fontSize:'12px',textAlign:'center'}}>ورود شما به معنای پذیرش <NavLink style={{textDecoration:'none'}} to={"/"}>قوانین خصوصی</NavLink> است</div>
        </form>
    </div>
  );
}
