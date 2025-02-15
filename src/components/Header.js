import React, { useEffect, useState } from 'react';
import './Header.css';
import searchIcon from '../img/icon/icons8-search-24.svg';
import { useTheme } from '../hooks/useTheme';
import '@fortawesome/fontawesome-free/css/all.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
  const {mode,changeMode} = useTheme(); 
  const [iscategoryOpen, setIsCateoryOpen] = useState(false);
  const headerButton='ورود / ثبت نام';
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
}, []);


  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token") // چک کردن وجود توکن
  );
  const navigate = useNavigate()
  const handleclick=()=>{
    navigate("/Login") 
  }
  
  return (
    <div className={`headerstyle ${mode}`}> 
    
      <nav className={`navbar navbarStyle d-flex  ${mode}`}>
       <form className='container-fluid formStyle' onSubmit={(e)=>e.preventDefault()}>
       <button className={`circuleButton1 btn ${mode}`} onClick={()=>changeMode(mode === 'dark' ? 'light' : 'dark') } ><i className="fa-regular fa-moon"></i></button>

          <button className={`circuleButton2 btn ${mode}`}><i className="fa fa-shopping-cart" aria-hidden="true"></i></button>

       { !isAuthenticated?   <button className={`headerButtonStyle ${mode}`} onClick={handleclick}>
        {screenWidth > 430 ? headerButton : null}
      <i className="fa-solid fa-user"></i> 
    </button>:<p></p>}


          <input className={` headerSearchStyle ${mode}`} type='search' placeholder='جستجو در بوووک' aria-label='Search' style={{backgroundImage:`url(${searchIcon})`,backgroundRepeat:'no-repeat',   backgroundPosition: 'right 15px center', paddingRight:'45px'}}/>
          <div className='navbar-brand brandStyle'>BOOOK</div>
      </form>
     </nav>
      <hr className={`responsive-hr ${mode}`}/>
      <nav className={`navbar navbar-expand-lg navbar2Style ${mode}`}>
      <div className="container-fluid ">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse  " id="navbarNav" style={{direction:'rtl'}}>
      <ul className="navbar-nav navbarUlStyle">
  <li className="nav-item">
    <Link className={`nav-link ${mode}`} to="/">
      <i className="fa-solid fa-house"></i>
      <span>خانه</span>
    </Link>
  </li>
    


  <li className="nav-item">
        <button
          className={`nav-link ${mode} ${iscategoryOpen ? "active" : ""}`}
          onClick={() => setIsCateoryOpen(!iscategoryOpen)}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <i className="fa-solid fa-list"></i>
          <span>دسته بندی موضوعی</span>
        </button>
        {iscategoryOpen && (
          <ul className="list-group mt-2"
          style={{
            position: "absolute",
            top: "100%", 
            zIndex: "1050", // مقدار زیاد برای قرارگیری بالای کاروسل
            backgroundColor: "#fff", 
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
            borderRadius: "5px",
            minWidth: "200px",
            padding: "5px"
          }}>
            <li className="list-group-item" >
              <Link style={{textDecoration:'none',color:'black'}} to="/books/story">داستانی</Link>
            </li>
            <li className="list-group-item">
              <Link style={{textDecoration:'none',color:'black'}} to="/books/science">علمی</Link>
            </li>
            <li className="list-group-item">
              <Link style={{textDecoration:'none',color:'black'}} to="/books/history">تاریخی</Link>
            </li>
          </ul>
        )}
      </li>


  <li className="nav-item">
    <Link className={`nav-link ${mode}`} to="/featured-books">
      <i className="fa-regular fa-bookmark"></i>
      <span>کتاب های برگزیده</span>
    </Link>
  </li>

  <li className="nav-item">
    <Link className={`nav-link ${mode}`} to="/literary-awards">
      <i className="fa-solid fa-medal"></i>
      <span>جوایز ادبی</span>
    </Link>
  </li>

  <li className="nav-item">
    <Link className={`nav-link ${mode}`} to="/world-literature">
      <i className="fa-solid fa-earth-americas"></i>
      <span>ادبیات ملل</span>
    </Link>
  </li>

  <li className="nav-item">
    <Link className={`nav-link ${mode}`} to="/suggested-package">
      <i className="fa-solid fa-box"></i>
      <span>بسته پیشنهادی</span>
    </Link>
  </li>
</ul>
     </div>
     </div>
     </nav>

    </div>

  );
} 