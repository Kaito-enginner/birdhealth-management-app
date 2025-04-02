import {  } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Chart from './Chart';
import MyPage from './MyPage';
import Login from './Login';
import express from 'express';
import cors from 'cors';

function App() {
	const app = express();

	app.use(cors({
	    origin: 'http://localhost:8080', //アクセス許可するオリジン
	    credentials: true, //レスポンスヘッダーにAccess-Control-Allow-Credentials追加
	    optionsSuccessStatus: 200 //レスポンスstatusを200に設定
	}))

  return (
	<Router>
		<Routes>
			<Route path='/' element={<Home />}/>
			<Route path='/login' element={<Login />}/>
			<Route path='/mypage' element={<MyPage />}/>
			<Route path='/chart' element={<Chart />}/>
		</Routes>
	</Router>
  )
}

export default App
