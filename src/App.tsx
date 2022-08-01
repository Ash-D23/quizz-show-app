import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar, Footer } from './Components';
import { HomePage, AllQuizPage, QuizGamePage, Dashboard, UserProfile, Login, SignUp, NotFoundPage } from './Pages';
import './App.css';
import { useAuthContext } from './Context';
import RequireAuth from './hooks/RequireAuth';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";
import { ToastContainer } from 'react-toastify';

function App() {

  const { user } : any = useAuthContext()

  const location : any = useLocation();

  const pathName = location.state?.from || '/' 
  
  return (
    <>
      <Navbar />
      <Routes>
        
        <Route path='/' element={<HomePage />} />
        
        <Route path='/explore' element={<AllQuizPage />} />

        <Route path='/quizgame/:id' element={<RequireAuth><QuizGamePage /></RequireAuth>} />

        <Route path='/dashboard' element={<RequireAuth><Dashboard /></RequireAuth>} />

        <Route path='/profile' element={<RequireAuth><UserProfile /></RequireAuth>} />

        { user ? <Route path='/login' element={<Navigate to={pathName} />} /> : <Route path='/login' element={<Login />} /> }
    
        { user ? <Route path='/signup' element={<Navigate to="/" />} /> : <Route path='/signup' element={<SignUp />} /> }

        <Route path="*" element={<NotFoundPage />} />

      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
