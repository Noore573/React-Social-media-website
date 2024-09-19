
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/main/Homepage';
import Login from './pages/Login';
import NavBar from './components/NavBar';
import Createpost from './pages/Create-Post/createpost';
import Settings from './pages/settings';
import Media from './pages/main/media.js';
import Signup from './pages/profile/Signup.js';
import { Provider } from 'react-redux';
import { store } from './store.js';
import Userprofile from "./pages/profile/Userprofile.js"
import ViewProfile from './pages/profile/viewProfile.js';
import Viewpost from './pages/main/viewpost.js';
function App() {
  return (
    <div className='App'>
      <Provider store={store}>
      <Router >
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/createpost' element={<Createpost />}></Route>
          <Route path='/settings' element={<Settings />}></Route>
          <Route path='/media' element={<Media />}></Route>
          <Route path='/profile' element={<Userprofile />}></Route>
          <Route path='/viewprofile/:userID' element={<ViewProfile />}></Route>
          <Route path='/viewpost/:postID' element={<Viewpost />}></Route>
        </Routes>
      </Router>
      </Provider>
    </div>

  );
}

export default App;
