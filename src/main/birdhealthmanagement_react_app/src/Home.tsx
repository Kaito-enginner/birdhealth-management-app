import { useEffect } from "react";
import Calendar from "./components/Calendar";
import { MonthlyRecord, UserBirdDto } from "./type/type";
import { Box, SelectChangeEvent, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

interface HomeProps {
	monthlyRecords: MonthlyRecord[] | undefined;
	userBirds: UserBirdDto | undefined;
	setUserBirds: React.Dispatch<React.SetStateAction<UserBirdDto | undefined>>;
	birdId: number | undefined;
	birdHandleChange: (e: SelectChangeEvent) => void;
	reRender: boolean;
	setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>;
	handleReRender: () => void;
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Home = ({ monthlyRecords, userBirds, setUserBirds, birdId, birdHandleChange, reRender, setSelectedPeriod, handleReRender, message, setMessage }: HomeProps) => {
	const location = useLocation();
	const BASE_URL = import.meta.env.VITE_API_BASE_URL;

	// ユーザー＋愛鳥さんの情報を取得
	useEffect(() => {
		fetch(`${BASE_URL}/mypage`, {
			method: 'GET',
			credentials: 'include'
		})
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				return setUserBirds(data)
			})
			.catch(error => console.error("リクエストエラー:", error));
	}, [reRender]);
	
	
	useEffect(() => {
		if (location.state?.loginSuccess) {
			setMessage("ログインに成功しました！");
			const timer = setTimeout(() => setMessage(""), 1500);
			return () => clearTimeout(timer);
		}
	}, [location.state]);

	return (
		<Box>
			{message && <Typography variant="h6" sx={{fontweight: 'bold', color: 'deepskyblue'}}>{message}</Typography>}
			<Calendar
				monthlyRecords={monthlyRecords}
				birdId={birdId}
				userBirds={userBirds}
				birdHandleChange={birdHandleChange}
				setSelectedPeriod={setSelectedPeriod}
				handleReRender={handleReRender}
			/>
		</Box>
	)
}

export default Home
