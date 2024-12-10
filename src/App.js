import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import About from './pages/About';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './pages/main';
import Scoreboard from './pages/Scoreboard';
import UserScreen from './pages/UserScreen';
import CodingScreen from './pages/CodingScreen';
import Sidebar from './admin/Sidebar';
import LearnMore from './pages/learnmore';
import SCITPage from './pages/SSCIT';
function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<Main />} />        // Home route
        <Route path="/about" element={<About />} />  // About route
        <Route path='/scoreboard' element={<Scoreboard/>}/>
        <Route path='/users' element={<UserScreen/>}/>
        <Route path='/challenges' element={<CodingScreen/>}/>
        <Route path='/sidebar' element={<Sidebar/>}/>
        <Route path='/learnmore' element={<LearnMore/>}></Route>
        <Route path='/SSCIT' element={<SCITPage/>}></Route>




      </Routes>
    </div>
  </Router>
  );
}

export default App;
