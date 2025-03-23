import React, { useEffect, useState } from 'react';
import './Header.css';
import searchIcon from '../img/icon/icons8-search-24.svg';
import { debounce } from 'lodash';
import '@fortawesome/fontawesome-free/css/all.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { changeMode } from '../redux/themeSlice';


const FetchBook = () => {
  return axios
    .get('http://127.0.0.1:8000/product/categories/')
    .then((res) => res.data);
};

export default function Header() {
  const  mode = useSelector(state=>state.theme.mode);
  const dispatch = useDispatch();
  const  numberPurchase  = useSelector(state=>state.numberPurchase.value);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerButton = 'ورود / ثبت نام';
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();
  

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = debounce(() => {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      setIsScrolled(true); 
    } else if (scrollY <= 10) {
      setIsScrolled(false); 
    }
  }, 50); 
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [handleScroll]);

  const handleClick = () => {
    navigate("/Login");
  };

  const toggleTheme =()=> {
   const newMode =  mode === 'light' ? 'dark' : 'light';
   dispatch(changeMode(newMode))
  }


  const { data: categories, isLoading, isError, error } = useQuery({
    queryKey: ['categories'],
    queryFn: FetchBook,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnMount: false,
   });

if (isLoading) {
    return <div>در حال بارگذاری...</div>;
}

if (isError) {
    return <div>{error.message}</div>;
}

  return (
    <div className={`headerstyle ${mode}`}>
      <nav className={`navbar navbarStyle d-flex ${mode}`}>
        <form className='container-fluid formStyle' onSubmit={(e) => e.preventDefault()}>
          <button className={`circuleButton1 btn ${mode}`} onClick={toggleTheme}>
            <i className="fa-regular fa-moon"></i>
          </button>

          <button className={`circuleButton2 btn ${mode}`}>
            <i className="fa fa-shopping-cart" aria-hidden="true"></i>
            <span className="position-absolute badge top-0 translate-middle p-2 bg-danger rounded-circle">
              {numberPurchase}
              <span className="visually-hidden"></span>
            </span>
          </button>

          {!isAuthenticated && (
            <button className={`headerButtonStyle ${mode}`} onClick={handleClick}>
              {screenWidth > 430 ? headerButton : null}
              <i className="fa-solid fa-user"></i>
            </button>
          )}

          <input
            className={`headerSearchStyle ${mode}`}
            type='search'
            placeholder='جستجو در بوووک'
            aria-label='Search'
            style={{
              backgroundImage: `url(${searchIcon})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 15px center',
              paddingRight: '45px',
            }}
          />
          <div className='navbar-brand brandStyle'>BOOOK</div>
        </form>
      </nav>
      <hr className={`responsive-hr ${mode}`} />

      <nav className={`navbar navbar-expand-lg navbar2Style ${mode} ${isScrolled ? "scrolled" : ""}`}>
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav" style={{ direction: 'rtl' }}>
            <ul className="navbar-nav navbarUlStyle">
              <li className="nav-item">
                <Link className={`nav-link ${mode}`} to="/">
                  <i className="fa-solid fa-house"></i>
                  <span>خانه</span>
                </Link>
              </li>


              <li className="nav-item">
                <button
                  className={`nav-link ${mode}`}
                  style={{ background: "none", border: "none", cursor: "pointer" }}
                >
                  <i className="fa-solid fa-list"></i>
                  <span>دسته بندی موضوعی</span>
                </button>
                <ul className="list-group list-group-flush">
                  {categories?.map((category)=>(
                  <li className="list-group-item">
                  <Link className="Linkitem" to={`/bookscategory/${category.url_title}`}>
                      {category.name}
                    </Link>
                  </li>
                  ))}
                </ul>
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