import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function RegisteForm(props) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = ""
        const data = { username, password };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            if (result) {
                props.setIsLogin(!props.isLogin);
                alert('ثبت نام موفقیت آمیز بود');
            } else {
                setErrorMessage(result.message || 'خطایی در ورود پیش آمده');
            }
        } catch (error) {
            setErrorMessage('خطای شبکه، لطفاً دوباره تلاش کنید');
            console.error('Error:', error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <form className="container containerstyle p-4" onSubmit={handleSubmit}>
                <div className='formlogo mb-5'>
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

                    <input className='mb-3' type="checkbox" onClick={() => setShowPassword(!showPassword)} />
                    <label style={{ fontSize: 'small' }}>&nbsp;نمایش</label>

                </div>
                <button type="submit" className="btn btn-primary mb-4">تایید</button>
                <div style={{ fontSize: '12px', textAlign: 'center' }}>ورود شما به معنای پذیرش <NavLink style={{ textDecoration: 'none' }} to={"/"}>قوانین خصوصی</NavLink> است</div>
                {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                <button className='btn  btn-sm' onClick={()=>props.setIsLogin(!props.isLogin)}>{props.isLogin?'ثبت نام ':'ورود'}</button>
            </form>
        </div>
    );
}