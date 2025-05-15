import { useEffect } from "react";
import Calendar from "./components/Calendar";
import { Bird, MonthlyRecord, UserBirdDto } from "./type/type";
import { Box, SelectChangeEvent } from "@mui/material";
import { useLocation } from "react-router-dom";
import MessageDialog from "./components/MessageDialog";

interface HomeProps {
	monthlyRecords: MonthlyRecord[] | undefined;
	userBirds: UserBirdDto | undefined;
	setUserBirds: React.Dispatch<React.SetStateAction<UserBirdDto | undefined>>;
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
	selectedBird: Bird | undefined;
}

const Home = ({ monthlyRecords, userBirds, setUserBirds, birdHandleChange, reRender,setSelectedPeriod,
	 handleReRender, openDialog, setOpenDialog, dialogMessage, setDialogMessage, selectedBird }: HomeProps) => {
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
				userBirds={userBirds}
				birdHandleChange={birdHandleChange}
				setSelectedPeriod={setSelectedPeriod}
				handleReRender={handleReRender}
				openDialog={openDialog}
				setOpenDialog={setOpenDialog}
				dialogMessage={dialogMessage}
				setDialogMessage={setDialogMessage}
				selectedBird={selectedBird}
			/>

			<MessageDialog
				openDialog={openDialog}
				setOpenDialog={setOpenDialog}
				dialogMessage={dialogMessage}
			/>
		</Box>
	)
}

export default Home
