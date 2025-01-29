import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Loginpage from './pages/Loginpage';

function App() {
  const location = useLocation(); // برای دسترسی به مسیر فعلی
  const hideHeaderPaths = ['/Login']; // مسیرهایی که هدر نباید نمایش داده شود

  return (
    <div className="App">
      {/* نمایش هدر فقط اگر مسیر فعلی در لیست hideHeaderPaths نباشد */}
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Loginpage />} />
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
