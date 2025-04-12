import { useEffect } from "react";
import Calendar from "./components/Calendar";
import { MonthlyRecord, UserBirdDto } from "./type/type";
import { SelectChangeEvent } from "@mui/material";
import { useParams } from "react-router-dom";

interface HomeProps {
	monthlyRecords: MonthlyRecord[] | undefined;
	userBirds: UserBirdDto | undefined;
	setUserBirds: React.Dispatch<React.SetStateAction<UserBirdDto | undefined>>;
	birdId: number | undefined;
	birdHandleChange: (e: SelectChangeEvent) => void;
	reRender: boolean;
}

const Home = ({monthlyRecords, userBirds, setUserBirds, birdId, birdHandleChange, reRender}: HomeProps) => {
	const { id } = useParams(); // URLからidを取得
	
	// ユーザー＋愛鳥さんの情報を取得
	useEffect(() => {
		    fetch(`http://localhost:8080/mypage/${id}`, {
				method: 'GET'
			})
		      .then((res) => {
					return res.json()
				})
		      .then((data) => {
					return setUserBirds(data)
				})
		      .catch(error => console.error("リクエストエラー:", error));
	}, [reRender]);
	
	return (
		<>
			<Calendar 
			monthlyRecords={monthlyRecords}
			birdId={birdId}
			userBirds={userBirds}
			birdHandleChange={birdHandleChange}
			/>
		</>
	)
}

export default Home
