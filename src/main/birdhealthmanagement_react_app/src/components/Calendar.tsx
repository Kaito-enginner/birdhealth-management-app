import {  } from "react";
import FullCalendar from "@fullcalendar/react"; // FullCalendarコンポーネント
import dayGridPlugin from "@fullcalendar/daygrid"; // 月間カレンダー
import timeGridPlugin from "@fullcalendar/timegrid"; // 週間・日間カレンダー
import interactionPlugin from "@fullcalendar/interaction"; // ユーザー操作対応
import jaLocale from "@fullcalendar/core/locales/ja"; // 日本語対応
import { Box, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent } from "@mui/material";
import { MonthlyRecord, UserBirdDto } from "../type/type";

interface CalendarProps {
	monthlyRecords: MonthlyRecord[] | undefined;
	userBirds: UserBirdDto | undefined;
	birdId: number | undefined;
	birdHandleChange: (e: SelectChangeEvent) => void;
}

const Calendar = ({monthlyRecords, userBirds, birdId, birdHandleChange}: CalendarProps) => {
	
	return (
		<Box>
			<Paper sx={{p: '3rem'}}>
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
				</Grid>
				<FullCalendar
					locale={jaLocale}
					plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
					initialView="dayGridMonth"
					headerToolbar={{
					  left: "prev,next today",
					  center: "title",
					  right: "dayGridMonth,timeGridWeek,timeGridDay",
					}}
					events={monthlyRecords}
				/>
			</Paper>
		</Box>
	)
}

export default Calendar
