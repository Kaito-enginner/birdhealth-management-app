import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Chart from './Chart';
import MyPage from './MyPage';
import Login from './Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/mypage/:id' element={<MyPage />} />
        <Route path='/chart' element={<Chart />} />
      </Routes>
    </Router>
  );
}

export default App;
