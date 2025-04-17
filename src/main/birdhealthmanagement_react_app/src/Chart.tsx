import { useEffect } from "react";
import { MonthlyRecord, UserBirdDto } from "./type/type";
import { BirdChart } from "./components/BirdChart";
import { useParams } from "react-router-dom";
import { SelectChangeEvent } from '@mui/material/Select';
import { Box } from "@mui/material";

interface ChartPrps {
	userBirds: UserBirdDto | undefined;
	setUserBirds: React.Dispatch<React.SetStateAction<UserBirdDto | undefined>>;
	reRender: boolean;
	monthlyRecords: MonthlyRecord[] | undefined;
	birdId: number | undefined;
	selectedPeriod: string;
	setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>;
	birdHandleChange: (e: SelectChangeEvent) => void;
}

const Chart = ({userBirds, setUserBirds, reRender, monthlyRecords, birdId, selectedPeriod, setSelectedPeriod, birdHandleChange}: ChartPrps) => {
	const { id } = useParams(); // URLからidを取得
	
	// ユーザー＋愛鳥情報を取得
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
	return (
		<Box sx={{overflow: 'hidden'}}>
			<BirdChart 
			userBirds={userBirds} 
			monthlyRecords={monthlyRecords}
			birdId={birdId}
			selectedPeriod={selectedPeriod}
			setSelectedPeriod={setSelectedPeriod}
			birdHandleChange={birdHandleChange}
			/>
		</Box>
	)
}

export default Chart
