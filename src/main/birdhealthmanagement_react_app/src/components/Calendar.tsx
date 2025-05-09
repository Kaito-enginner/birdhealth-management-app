import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // 月間カレンダー
import interactionPlugin from "@fullcalendar/interaction"; // ユーザー操作対応
import jaLocale from "@fullcalendar/core/locales/ja"; // 日本語対応
import { Box, Modal, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { CalendarEvent, MonthlyRecord, UserBirdDto } from "../type/type";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { modalStyle } from "../theme/theme";
import HealthRecordForm from "./form/HealthRecordForm";
import { DateClickArg } from "@fullcalendar/interaction";
import { EventContentArg } from "@fullcalendar/core";
import { DatesSetArg } from "@fullcalendar/core";
import { EventClickArg } from "@fullcalendar/core";


interface CalendarProps {
	monthlyRecords: MonthlyRecord[] | undefined;
	userBirds: UserBirdDto | undefined;
	birdId: number | undefined;
	birdHandleChange: (e: SelectChangeEvent) => void;
	setSelectedPeriod: React.Dispatch<React.SetStateAction<string>>;
	handleReRender: () => void;
}

const Calendar = ({ monthlyRecords, userBirds, birdId, birdHandleChange, setSelectedPeriod, handleReRender }: CalendarProps) => {
	const FullCalendarComponent = FullCalendar as unknown as React.ComponentType<any>;
	const [selectEvent, setSelectEvent] = useState<CalendarEvent>()
	const [calendarModalOpen, setCalendarModalOpen] = useState(false);
	const [clickDate, setClickDate] = useState<string>()

	// モーダルを開ける処理
	const handleCalendarModalOpen = () => {
		setCalendarModalOpen(true);
	}

	// モーダルを閉じる処理
	const handleCalendarModalClose = () => {
		setCalendarModalOpen(false);
		if (selectEvent) {
			setSelectEvent(undefined)
		}
	}

	const handleDatesSet = (date: DatesSetArg) => {
		const startDate = date.view.currentStart
		const formatDate = format(startDate, "yyyy-MM");
		setSelectedPeriod(formatDate)
	};

	const calendarEvents = monthlyRecords && monthlyRecords.map((record) => {
		return {
			id: record.id,
			date: record.day,
			weight: record.weight,
			mealAmount: record.mealAmount,
			temperature: record.temperature,
			humidity: record.humidity,
			memo: record.memo
		}
	})

	useEffect(() => {

	})

	// イベントをクリックしたときの処理
	const onClickEvent = (eventDetail: EventClickArg) => {
		const extended = eventDetail.event.extendedProps
		const eventId = parseInt(eventDetail.event.id)
		const fullEvent: CalendarEvent = {
			id: eventId,
			weight: extended.weigt,
			mealAmount: extended.mealAmount,
			temperature: extended.temperature,
			humidity: extended.humidity,
			memo: extended.memo,
		};
		setSelectEvent(fullEvent)
		handleCalendarModalOpen()
	}

	// 日付をクリックした時の処理
	const onClickDate = (date: DateClickArg) => {
		setClickDate(date.dateStr)
		handleCalendarModalOpen()
	}


	// カレンダーに表示するイベント
	const renderEventContent = (eventInfo: EventContentArg) => {
		return (
			<div style={{
				fontSize: '0.8rem',
				overflow: 'auto',
				padding: '1.5px'
			}}>
				<div>体重: {eventInfo.event.extendedProps.weight}g</div>
				<div>ごはん: {eventInfo.event.extendedProps.mealAmount}g</div>
				<div>メモ: {eventInfo.event.extendedProps.memo}</div>
			</div>
		);
	};


	return (
		<Box>
			<Grid container>
				<Grid size={{ xs: 8, sm: 6 }}>
					<FormControl sx={{ mb: '1rem' }} fullWidth>
						<InputLabel id="bird-select-label">名前</InputLabel>
						<Select
							labelId="bird-select-label"
							id="bird-simple-select"
							value={birdId ? birdId.toString() : ''}
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
			<FullCalendarComponent
				locale={jaLocale}
				plugins={[dayGridPlugin, interactionPlugin]}
				initialView="dayGridMonth"
				datesSet={handleDatesSet}
				events={calendarEvents}
				eventContent={renderEventContent}
				eventClick={onClickEvent}
				dateClick={onClickDate}
			/>
			<Modal
				open={calendarModalOpen}
				onClose={handleCalendarModalClose}
			>
				<Box sx={modalStyle}>
					<HealthRecordForm
						birdId={birdId}
						handleCalendarModalClose={handleCalendarModalClose}
						clickDate={clickDate}
						handleReRender={handleReRender}
						selectEvent={selectEvent}
					/>
				</Box>
			</Modal>
		</Box>
	)
}

export default Calendar
