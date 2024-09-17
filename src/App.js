
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/main/Homepage';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Createpost from './pages/Create-Post/createpost';
import Settings from './pages/settings';
import Media from './pages/media';
import Profile from './pages/profile';
import Signup from './pages/profile/Signup.js';
function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/createpost' element={<Createpost />}></Route>
          <Route path='/settings' element={<Settings />}></Route>
          <Route path='/media' element={<Media />}></Route>
          <Route path='/profile' element={<Profile />}></Route>

        </Routes>
      </Router>
    </div>

  );
}

export default App;
