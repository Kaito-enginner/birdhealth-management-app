import { useEffect } from "react";
import Calendar from "./components/Calendar";
import { MonthlyRecord, UserBirdDto } from "./type/type";
import { Box, SelectChangeEvent } from "@mui/material";
import { useLocation } from "react-router-dom";
import MessageMoadal from "./components/MessageModal";

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
	openDialog: boolean;
	setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
	dialogMessage: string;
	setDialogMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Home = ({ monthlyRecords, userBirds, setUserBirds, birdId, birdHandleChange, reRender,
	setSelectedPeriod, handleReRender, openDialog, setOpenDialog, dialogMessage, setDialogMessage}: HomeProps) => {
	const location = useLocation();
	const BASE_URL = import.meta.env.VITE_API_BASE_URL;

	// ユーザー＋愛鳥さんの情報を取得
	useEffect(() => {
		fetch(`${BASE_URL}/api/mypage`, {
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
			setDialogMessage("ログインに成功しました！");
			setOpenDialog(true)
		}
	}, [location.state]);

	return (
		<Box>
			<Calendar
				monthlyRecords={monthlyRecords}
				birdId={birdId}
				userBirds={userBirds}
				birdHandleChange={birdHandleChange}
				setSelectedPeriod={setSelectedPeriod}
				handleReRender={handleReRender}
			/>

			<MessageMoadal
				openDialog={openDialog}
				setOpenDialog={setOpenDialog}
				dialogMessage={dialogMessage}
			/>
		</Box>
	)
}

export default Home
