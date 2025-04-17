import { useEffect } from "react";
import Calendar from "./components/Calendar";
import { MonthlyRecord, UserBirdDto } from "./type/type";
import { Box, SelectChangeEvent } from "@mui/material";
import { useParams, useLocation } from "react-router-dom";

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
	const { id } = useParams(); // URLからidを取得
	const location = useLocation();

	// ユーザー＋愛鳥さんの情報を取得
	useEffect(() => {
		fetch(`http://localhost:8080/mypage/${id}`, {
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
			const timer = setTimeout(() => setMessage(""), 3000); // 3秒後に消える
			return () => clearTimeout(timer);
		}
	}, [location.state]);

	return (
		<Box>
			{message && <p>{message}</p>}
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
