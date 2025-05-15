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
import { Bird, MonthlyRecord, UserBirdDto } from './type/type'
import NoMatch from './NoMatch';
import { SelectChangeEvent } from '@mui/material/Select';
import AdminHome from './AdminHome';
import Management from './Management';
import Contact from './Contact';
import PasswordReset from './PasswordReset';
import AuthProvider, { } from './components/security/AuthProvider';
import AdminAuth from './components/security/AdminAuth';

const App = () => {
	const BASE_URL = import.meta.env.VITE_API_BASE_URL;
	const [selectedBird, setSelectedBird] = useState<Bird>()
	const [userBirds, setUserBirds] = useState<UserBirdDto>();
	const [reRender, setReRender] = useState(false);
	const [monthlyRecords, setMonthlyRecords] = useState<MonthlyRecord[]>();
	const [selectedPeriod, setSelectedPeriod] = useState('');
	const [message, setMessage] = useState('');
	const [openDialog, setOpenDialog] = useState(false);
	const [dialogMessage, setDialogMessage] = useState('');

	const handleSelectedBird = (bird: Bird): void => setSelectedBird(bird)

	const birdHandleChange = (e: SelectChangeEvent) => {
		const selected = userBirds?.birds.find(bird => bird.name === e.target.value);
		if (selected) {
			setSelectedBird(selected);
		}
	};

	// 再レンダリング用の処理
	const handleReRender = () => setReRender(!reRender);

	// 特定の愛鳥の特定の日付の健康記録を取得する
	useEffect(() => {
		if (selectedBird && selectedPeriod) {
			fetch(`${BASE_URL}/api/chartpage/${selectedBird.id}/${selectedPeriod}`, {
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
	}, [selectedBird, selectedPeriod, reRender]);


	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AuthProvider>
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
								<AppLayout
									setMonthlyRecords={setMonthlyRecords}
									setSelectedBird={setSelectedBird}
								/>
							}
						>
							<Route
								path='home'
								element={
									<Home
										monthlyRecords={monthlyRecords}
										userBirds={userBirds}
										setUserBirds={setUserBirds}
										birdHandleChange={birdHandleChange}
										reRender={reRender}
										setSelectedPeriod={setSelectedPeriod}
										handleReRender={handleReRender}
										message={message}
										setMessage={setMessage}
										openDialog={openDialog}
										setOpenDialog={setOpenDialog}
										dialogMessage={dialogMessage}
										setDialogMessage={setDialogMessage}
										selectedBird={selectedBird}
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
										selectedPeriod={selectedPeriod}
										setSelectedPeriod={setSelectedPeriod}
										birdHandleChange={birdHandleChange}
										selectedBird={selectedBird}
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

						<Route path=':role' element={
							<AppLayout
								setMonthlyRecords={setMonthlyRecords}
								setSelectedBird={setSelectedBird}
							/>
						}>
							<Route path='Home' element={
								<AdminAuth>
									<AdminHome />
								</AdminAuth>
							} />
							<Route
								path='management'
								element={
									<AdminAuth>
										<Management
											openDialog={openDialog}
											setOpenDialog={setOpenDialog}
											dialogMessage={dialogMessage}
											setDialogMessage={setDialogMessage}
											reRender={reRender}
											handleReRender={handleReRender}
										/>
									</AdminAuth>
								}
							/>
						</Route>
					</Routes>
				</Router>
			</AuthProvider>
		</ThemeProvider>
	);
}

export default App;