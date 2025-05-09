import Box from '@mui/material/Box';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { TextField, Stack, Button, Typography } from '@mui/material';
import { CalendarEvent, HealthRecordFormType } from '../../type/type'
import { useEffect } from 'react';

interface HealthRecordFormProps {
	birdId: number | undefined;
	handleCalendarModalClose: () => void;
	clickDate: string | undefined;
	handleReRender: () => void;
	selectEvent: CalendarEvent | undefined
}


const HealthRecordForm = ({ birdId, handleCalendarModalClose, clickDate, handleReRender, selectEvent }: HealthRecordFormProps) => {

	const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<HealthRecordFormType>({
		defaultValues: {
			id: selectEvent && selectEvent.id,
			weight: 35,
			mealAmount: 7,
			temperature: 25,
			humidity: 60,
			memo: '体重OK、食事量OK、温湿度ともに良好'
		}
	});

	// 送信処理(健康記録を登録)
	const submitCreatedHealthRecord: SubmitHandler<HealthRecordFormType> = (data: HealthRecordFormType) => {
		fetch(`http://localhost:8080/homepage/${birdId}/${clickDate}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json' // JSON形式のデータであることを宣言
			},
			body: JSON.stringify(data), // JSON形式に変換する
			credentials: 'include'
		})
			.then(() => {
				handleCalendarModalClose()
				handleReRender()
			})
			.catch(error => console.error("リクエストエラー:", error));
	}
	
	// 送信処理(健康記録を編集)
		const submitEditedHealthRecord: SubmitHandler<HealthRecordFormType> = (data: HealthRecordFormType) => {
			fetch(`http://localhost:8080/homepage/${birdId}/edit`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json' // JSON形式のデータであることを宣言
				},
				body: JSON.stringify(data), // JSON形式に変換する
				credentials: 'include'
			})
				.then(() => {
					handleCalendarModalClose()
					handleReRender()
				})
				.catch(error => console.error("リクエストエラー:", error));
		}

	useEffect(() => {
		if (selectEvent) {
			setValue("id", selectEvent.id)
			setValue("weight", selectEvent.weight)
			setValue("mealAmount", selectEvent.mealAmount)
			setValue("temperature", selectEvent.temperature)
			setValue("humidity", selectEvent.humidity)
			setValue("memo", selectEvent.memo)
		}
	}, [selectEvent])

	return (
		<Box component={"form"} onSubmit={handleSubmit(selectEvent ? submitEditedHealthRecord : submitCreatedHealthRecord)}>
			<Stack spacing={2} sx={{ textAlign: 'center'}}>
				<Typography variant="h6" component="h2">{selectEvent ? '健康記録編集' : '健康記録入力' }</Typography>
				{/* ID */}
				{selectEvent &&
					<Controller
						name='id'
						control={control}
						render={({ field }) => {
							return (
								<input {...field} type='hidden' />
							)
						}}
					/>}

				{/* 体重 */}
				<Controller
					{...register('weight', {
						required: '体重を入力してください。'
					})}
					name='weight'
					control={control}
					render={({ field }) => {
						return (
							<TextField {...field} label="体重" type='number' error={!!errors.weight} helperText={errors.weight?.message as string} />
						)
					}}
				/>

				{/* 食事量 */}
				<Controller
					{...register('mealAmount', {
						required: '食事量を入力してください。'
					})}
					name='mealAmount'
					control={control}
					render={({ field }) => {
						return (
							<TextField {...field} label="食事量" type='number' error={!!errors.mealAmount} helperText={errors.mealAmount?.message as string} />
						)
					}}
				/>
				{/* 温度 */}
				<Controller
					{...register('temperature', {
						required: '温度を入力してください。'
					})}
					name='temperature'
					control={control}
					render={({ field }) => {
						return (
							<TextField {...field} label="温度" type='number' error={!!errors.temperature} helperText={errors.temperature?.message as string} />
						)
					}}
				/>

				{/* 湿度 */}
				<Controller
					{...register('humidity', {
						required: '湿度を入力してください。',
					})}
					name='humidity'
					control={control}
					render={({ field }) => {
						return (
							<TextField {...field} label="湿度" type='number' error={!!errors.humidity} helperText={errors.humidity?.message as string} />
						)
					}}
				/>

				{/* メモ */}
				<Controller
					{...register('memo', {
						required: 'メモを入力してください。',
						maxLength: {
							value: 50,
							message: '50文字以内でを入力してください。'
						}
					})}
					name='memo'
					control={control}
					render={({ field }) => {
						return (
							<TextField {...field} label="メモ" type='text' error={!!errors.memo} helperText={errors.memo?.message as string} />
						)
					}}
				/>

				<Button type='submit' sx={{ bgcolor: "#1976d2", color: "white" }}>
					{selectEvent ? "更新" : "登録"}
				</Button>
			</Stack>
		</Box>
	)
}

export default HealthRecordForm
