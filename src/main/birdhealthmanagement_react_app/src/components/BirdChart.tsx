import { Box, Grid, Paper, Typography } from "@mui/material";
//import { type MouseEvent, useRef } from "react";
import { MonthlyRecord, UserBirdDto } from "../type/type";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
//import type {  } from 'chart.js';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import {
  Chart,
} from 'react-chartjs-2';
import { useEffect, useState } from "react";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
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
};

interface BirdChartPrps {
	userBirds: UserBirdDto | undefined;
	monthlyRecords: MonthlyRecord[] | undefined;
	birdId: number | undefined;
	selectedPeriod: string;
	setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>;
	birdHandleChange: (e: SelectChangeEvent) => void;
}

export const BirdChart = ({userBirds, monthlyRecords, birdId, selectedPeriod, setSelectedPeriod, birdHandleChange}: BirdChartPrps) => {
	const [chartWidth, setChartWidth] = useState<number>()
  	const periodHandleChange = (e: SelectChangeEvent) => {
      setSelectedPeriod(e.target.value);
    };
	
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 6 }, (_, i) => currentYear -5 + i);
	const months = Array.from({ length: 12 }, (_, i) => i + 1);
	
	const yearMonthOptions = years.flatMap((year) =>
		months.map((month) => {
	    const value = `${year}-${String(month).padStart(2, '0')}`; // 例: 2025-04
	    const label = `${year}年${month}月`;
	    return { value, label };
	  })
	);
	 
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
	        data: monthlyTemperature,
	      },
	  	{
	  	  type: 'line' as const,
	  	  label: '湿度',
	  	  borderColor: 'rgb(255, 99, 132)',
	  	  borderWidth: 2,
	  	  fill: false,
	  	  data: monthlyHumidity,
	  	},
	      {
	        type: 'bar' as const,
	        label: '体重',
	        backgroundColor: 'rgb(75, 192, 192)',
	        data: monthlyWeight,
	        borderColor: 'white',
	        borderWidth: 2,
	      },
	      {
	        type: 'bar' as const,
	        label: '食事量',
	        backgroundColor: 'rgb(53, 162, 235)',
	        data: monthlyMealAmount,
	      },
	    ],
	  };
	  
	  useEffect(() => {
		if(monthlyRecords) {
			const chartWidth = (monthlyRecords?.length) * 60;
			setChartWidth(chartWidth)
		}
	  },[monthlyRecords])
	  
//	const chartRef = useRef<ChartJS>(null);
	
	return (
		<Box>
			<Paper sx={{p: '1.5rem', mb: '1rem'}}>
				<Typography sx={{mb: '1rem', fontSize: '1.25rem'}}>健康管理グラフ</Typography>
				<Grid container>
					<Grid size={6}>
						<FormControl sx={{mb: '1rem'}} fullWidth>
						  <InputLabel id="bird-select-label">名前</InputLabel>
							  <Select
							    labelId="bird-select-label"
							    id="bird-simple-select"
							    value={birdId ?? ''}
							    label="bird"
							    onChange={birdHandleChange}
							  >
							  {userBirds && userBirds.birds.map((bird, index) => (
								<MenuItem key={index} value={bird.id}>{bird.name}</MenuItem>
								))}
							  </Select>
						</FormControl>
					</Grid>
					<Grid size={6}>
						<FormControl sx={{mb: '1rem'}} fullWidth>
						  <InputLabel id="period-select-label">期間</InputLabel>
							  <Select
							    labelId="period-select-label"
							    id="period-simple-select"
							    value={selectedPeriod}
							    label="period"
							    onChange={periodHandleChange}
							  >
							   {yearMonthOptions.map((option) => (
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
					<Box sx={{ width: `${chartWidth}px`, height: '500px' }}>
						<Chart
//						ref={chartRef}
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
