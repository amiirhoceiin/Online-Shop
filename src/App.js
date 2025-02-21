import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import BooksCategory from './pages/BooksCategory'
import Loginpage from './pages/Loginpage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import BookInformation from './pages/‌BookInformation';


const queryClient = new QueryClient();

function App() {
  const location = useLocation(); 
  const hideHeaderPaths = ['/Login','/*']; 

  return (
    <div className="App">
      {!hideHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/Login' element={<Loginpage />} />
        <Route path='/*' element={<div className='d-flex justify-content-center'><h1>404 Not Found</h1></div>}/>
        <Route path='/bookscategory/:category' element={<BooksCategory/>}/> 
        <Route path='/bookinformation/:bookurl' element={<BookInformation/>}/>
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
     <QueryClientProvider client={queryClient}>
       <App />
      <ReactQueryDevtools/>
     </QueryClientProvider>
    </BrowserRouter>
  );
}
