import { useEffect } from "react";
import { BirdFormType, MonthlyRecord, UserBirdDto } from "./type/type";
import { BirdChart } from "./components/BirdChart";
import { SelectChangeEvent } from '@mui/material/Select';
import { Box } from "@mui/material";

interface ChartPrps {
	userBirds: UserBirdDto | undefined;
	setUserBirds: React.Dispatch<React.SetStateAction<UserBirdDto | undefined>>;
	reRender: boolean;
	monthlyRecords: MonthlyRecord[] | undefined;
	selectedPeriod: string;
	setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>;
	birdHandleChange: (e: SelectChangeEvent) => void;
	selectedBird: BirdFormType | undefined
}

const Chart = ({userBirds, setUserBirds, reRender, monthlyRecords, selectedPeriod, setSelectedPeriod, birdHandleChange, selectedBird}: ChartPrps) => {
	const BASE_URL = import.meta.env.VITE_API_BASE_URL;

	// ユーザー＋愛鳥情報を取得
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
	return (
		<Box sx={{overflow: 'hidden'}}>
			<BirdChart 
			userBirds={userBirds} 
			monthlyRecords={monthlyRecords}
			selectedPeriod={selectedPeriod}
			setSelectedPeriod={setSelectedPeriod}
			birdHandleChange={birdHandleChange}
			selectedBird={selectedBird}
			/>
		</Box>
	)
}

export default Chart
