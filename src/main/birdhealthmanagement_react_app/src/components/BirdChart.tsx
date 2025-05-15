import { Box, Grid, Paper, Typography } from "@mui/material";
import { BirdFormType, MonthlyRecord, UserBirdDto } from "../type/type";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
	Chart as ChartJS,
	LinearScale,
	CategoryScale,
	BarElement,
	PointElement,
	LineElement,
	Legend,
	Tooltip,
	LineController,
	BarController,
} from 'chart.js';
import {
	Chart,
} from 'react-chartjs-2';
import { useEffect, useState } from "react";
import { yearMonthCalcuration } from "./calculation/YearMonthCalcuration";

ChartJS.register(
	LinearScale,
	CategoryScale,
	BarElement,
	BarController,
	PointElement,
	LineElement,
	LineController,
	Legend,
	Tooltip
);

export const options = {
	maintainAspectRatio: false,
	responsive: true,
	scales: {
		y: {
			beginAtZero: true,
		},
	},
	plugins: {
		legend: {
			position: 'left' as const,
		},
	},
};

interface BirdChartPrps {
	userBirds: UserBirdDto | undefined;
	monthlyRecords: MonthlyRecord[] | undefined;
	selectedPeriod: string;
	setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>;
	birdHandleChange: (e: SelectChangeEvent) => void;
	selectedBird: BirdFormType | undefined
}

export const BirdChart = ({ userBirds, monthlyRecords, selectedPeriod, setSelectedPeriod, birdHandleChange, selectedBird }: BirdChartPrps) => {
	const [chartWidth, setChartWidth] = useState<number>()
	const [yearMonth, setYearMonth] = useState<{value: string, label: string}[] | []>([])
	const periodHandleChange = (e: SelectChangeEvent) => {
		setSelectedPeriod(e.target.value);
	};


	const monthlyDate = monthlyRecords && monthlyRecords.map((record) => record.day);
	const monthlyTemperature = monthlyRecords && monthlyRecords.map((record) => record.temperature);
	const monthlyHumidity = monthlyRecords && monthlyRecords.map((record) => record.humidity);
	const monthlyWeight = monthlyRecords && monthlyRecords.map((record) => record.weight);
	const monthlyMealAmount = monthlyRecords && monthlyRecords.map((record) => record.mealAmount);


	const labels = monthlyDate

	const data = {
		labels,
		datasets: [
			{
				type: 'line' as const,
				label: '温度',
				borderColor: 'rgb(255, 99, 132)',
				borderWidth: 2,
				fill: false,
				data: monthlyTemperature ?? [],
			},
			{
				type: 'line' as const,
				label: '湿度',
				borderColor: 'rgb(99, 187, 255)',
				borderWidth: 2,
				fill: false,
				data: monthlyHumidity ?? [],
			},
			{
				type: 'bar' as const,
				label: '体重',
				backgroundColor: 'rgb(75, 192, 192)',
				data: monthlyWeight ?? [],
			},
			{
				type: 'bar' as const,
				label: '食事量',
				backgroundColor: 'rgb(53, 162, 235)',
				data: monthlyMealAmount ?? [],
			},
		],
	};

	useEffect(() => {
		if (monthlyRecords) {
			const chartWidth = (monthlyRecords?.length) * 60;
			setChartWidth(chartWidth)
		}
	}, [monthlyRecords])

	const chartWithCalculation = () => {
		if (chartWidth) {
			const chartDisplayArea = 300 + chartWidth;
			return chartDisplayArea
		}
	}

	useEffect(() => {
		if (selectedBird) {
			setYearMonth(yearMonthCalcuration(selectedBird.birthday))
		}else {
			setYearMonth([])
		}
	}, [selectedBird])

	return (
		<Box>
			<Paper sx={{ p: '2rem', mb: '1rem' }}>
				<Typography variant="h5" sx={{ mb: '1rem' }}>健康管理グラフ</Typography>
				<Grid container>
					<Grid size={6}>
						<FormControl sx={{ mb: '1rem' }} fullWidth>
							<InputLabel id="bird-select-label">名前</InputLabel>
							<Select
								labelId="bird-select-label"
								id="bird-simple-select"
								value={selectedBird ? selectedBird.name : ""}
								label="bird"
								onChange={birdHandleChange}
							>
								{userBirds && userBirds.birds.map((bird, index) => (
									<MenuItem key={index} value={bird.name}>{bird.name}</MenuItem>
								))}
							</Select>
						</FormControl>

					</Grid>
					<Grid size={6}>
						<FormControl sx={{ mb: '1rem' }} fullWidth>
							<InputLabel id="period-select-label">期間</InputLabel>
							<Select
								labelId="period-select-label"
								id="period-simple-select"
								value={selectedPeriod}
								label="period"
								onChange={periodHandleChange}
							>
								{yearMonth.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
							</Select>
						</FormControl>
					</Grid>
				</Grid>

				{/* グラフ */}
				<Box sx={{ overflowX: 'scroll' }}>
					<Box sx={{ width: `${chartWithCalculation()}px`, height: '500px' }}>
						<Chart
							type='bar'
							options={options}
							data={data}
						/>
					</Box>
				</Box>
			</Paper>
		</Box>
	)
}
