import { Route, Routes } from 'react-router-dom';
import { Navbar, Footer } from './Components';
import { HomePage, AllQuizPage, QuizGamePage, Dashboard, UserProfile, Login, SignUp } from './Pages';
import './App.css';

function App() {
  
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/explore' element={<AllQuizPage />} />
        <Route path='/quizgame/:id' element={<QuizGamePage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
