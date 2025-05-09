import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Chart from './Chart';
import MyPage from './MyPage';
import Login from './Login';
import SignUp from './SignUp';
import AppLayout from './components/layout/AppLayout';
import { theme } from './theme/theme'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
import { BirdFormType, MonthlyRecord, UserBirdDto } from './type/type'
import NoMatch from './NoMatch';
import { SelectChangeEvent } from '@mui/material/Select';
import AdminHome from './AdminHome';
import Management from './Management';
import Contact from './Contact';
import PasswordReset from './PasswordReset';

const App = () => {
	const [selectedBird, setSelectedBird] = useState<BirdFormType>()
	const handleSelectedBird = (bird: BirdFormType): void => setSelectedBird(bird)
	const [userBirds, setUserBirds] = useState<UserBirdDto>();
	const [reRender, setReRender] = useState(false);
	const [monthlyRecords, setMonthlyRecords] = useState<MonthlyRecord[]>();
	const [birdId, setBirdId] = useState<number>();
	const [selectedPeriod, setSelectedPeriod] = useState('');
	const [message, setMessage] = useState("");
	const [openDialog, setOpenDialog] = useState(false);
	const [dialogMessage, setDialogMessage] = useState('');

	const birdHandleChange = (e: SelectChangeEvent) => {
		setBirdId(parseInt(e.target.value));
	};

	// 再レンダリング用の処理
	const handleReRender = () => setReRender(!reRender);


	// 特定の愛鳥の特定の日付の健康記録を取得する
	useEffect(() => {
		if (birdId && selectedPeriod) {
			fetch(`http://localhost:8080/chartpage/${birdId}/${selectedPeriod}`, {
				method: 'GET',
				credentials: 'include'
			})
				.then((res) => {
					return res.json()
				})
				.then((data) => {
					return setMonthlyRecords(data)
				})
				.catch(error => console.error("リクエストエラー:", error));
		}
	}, [birdId, selectedPeriod, reRender]);


	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Router>
				<Routes>
					<Route
						path='/'
						element={
							<Login
								message={message}
								setMessage={setMessage}
							/>
						}
					/>
					<Route path='/signup' element={<SignUp />} />
					<Route path='/reset' element={<PasswordReset />} />
					<Route
						path='/'
						element={
							<AppLayout />
						}
					>
						<Route
							path='home'
							element={
								<Home
									monthlyRecords={monthlyRecords}
									birdId={birdId}
									userBirds={userBirds}
									setUserBirds={setUserBirds}
									birdHandleChange={birdHandleChange}
									reRender={reRender}
									setSelectedPeriod={setSelectedPeriod}
									handleReRender={handleReRender}
									message={message}
									setMessage={setMessage}
								/>
							}
						/>

						<Route
							path='mypage'
							element={
								<MyPage
									userBirds={userBirds}
									setUserBirds={setUserBirds}
									setSelectedBird={setSelectedBird}
									selectedBird={selectedBird}
									handleSelectedBird={handleSelectedBird}
									reRender={reRender}
									handleReRender={handleReRender}
								/>
							}
						/>

						<Route
							path='chart'
							element={
								<Chart
									userBirds={userBirds}
									setUserBirds={setUserBirds}
									reRender={reRender}
									monthlyRecords={monthlyRecords}
									birdId={birdId}
									selectedPeriod={selectedPeriod}
									setSelectedPeriod={setSelectedPeriod}
									birdHandleChange={birdHandleChange}
								/>
							}
						/>

						<Route
							path='contact'
							element={
								<Contact
									openDialog={openDialog}
									setOpenDialog={setOpenDialog}
									dialogMessage={dialogMessage}
									setDialogMessage={setDialogMessage}
								/>
							}
						/>

						<Route path='*' element={<NoMatch />} />
					</Route>

					<Route path='/:role' element={<AppLayout />}>
						<Route path='Home' element={<AdminHome />} />
						<Route
							path='management'
							element={
								<Management
									openDialog={openDialog}
									setOpenDialog={setOpenDialog}
									dialogMessage={dialogMessage}
									setDialogMessage={setDialogMessage}
									reRender={reRender}
									handleReRender={handleReRender}
								/>
							}
						/>
					</Route>
				</Routes>
			</Router>
		</ThemeProvider>
	);
}

export default App;