import Box from '@mui/material/Box';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { TextField, Stack, Button, Typography } from '@mui/material';
import { Bird, CalendarEvent } from '../../type/type'
import { useEffect } from 'react';

interface HealthRecordFormProps {
	selectedBird: Bird | undefined
	handleCalendarModalClose: () => void;
	clickDate: string | undefined;
	handleReRender: () => void;
	selectEvent: CalendarEvent | undefined;
}

interface BirdFormType {
	id?: number;
	weight: string;
	mealAmount: string;
	temperature: string;
	humidity: string;
	memo: string;
}

const HealthRecordForm = ({ selectedBird, handleCalendarModalClose, clickDate, handleReRender, selectEvent }: HealthRecordFormProps) => {
	const BASE_URL = import.meta.env.VITE_API_BASE_URL;
	const { control, handleSubmit, setValue, formState: { errors }, reset } = useForm<BirdFormType>({
		defaultValues: {
			id: selectEvent?.id,
			weight: '',
			mealAmount: '',
			temperature: '',
			humidity: '',
			memo: ''
		}
	});

	const formattedData = (data: BirdFormType): CalendarEvent => {
		return {
			...data,
			weight: Number(data.weight),
			mealAmount: Number(data.mealAmount),
			temperature: Number(data.temperature),
			humidity: Number(data.humidity),
			memo: data.memo,
		}


	}

	// 送信処理(健康記録を登録)
	const submitCreatedHealthRecord: SubmitHandler<BirdFormType> = (data: BirdFormType) => {
		const formatData = formattedData(data)

		if(selectedBird)
		fetch(`${BASE_URL}/api/homepage/${selectedBird.id}/${clickDate}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json' // JSON形式のデータであることを宣言
			},
			body: JSON.stringify(formatData), // JSON形式に変換する
			credentials: 'include'
		})
			.then(() => {
				handleCalendarModalClose()
				handleReRender()
				reset()
			})
			.catch(error => console.error("リクエストエラー:", error));
	}

	// 送信処理(健康記録を編集)
	const submitEditedHealthRecord: SubmitHandler<BirdFormType> = (data: BirdFormType) => {
		const formatData = formattedData(data)

		if(selectedBird)
		fetch(`${BASE_URL}/api/homepage/${selectedBird.id}/edit`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json' // JSON形式のデータであることを宣言
			},
			body: JSON.stringify(formatData), // JSON形式に変換する
			credentials: 'include'
		})
			.then(() => {
				handleCalendarModalClose()
				handleReRender()
				reset()
			})
			.catch(error => console.error("リクエストエラー:", error));
	}

	useEffect(() => {
		if (selectEvent) {
			setValue("id", selectEvent.id)
			setValue("weight", String(selectEvent.weight))
			setValue("mealAmount", String(selectEvent.mealAmount))
			setValue("temperature", String(selectEvent.temperature))
			setValue("humidity", String(selectEvent.humidity))
			setValue("memo", selectEvent.memo)
		}
	}, [selectEvent])



	return (
		<Box component={"form"} onSubmit={handleSubmit(selectEvent ? submitEditedHealthRecord : submitCreatedHealthRecord)}>
			<Stack spacing={2} sx={{ textAlign: 'center' }}>
				<Typography variant="h6" component="h2">{selectEvent ? '健康記録編集' : '健康記録入力'}</Typography>
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
					rules={{ required: "体重を入力してください" }}
					name='weight'
					control={control}
					render={({ field }) => {
						const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
							const value = event.target.value;
							// 数字または小数点のみOK
							if (/^\d*\.?\d*$/.test(value) || value === '') {
								field.onChange(value);
							}
						};

						return (
							<TextField
								{...field}
								label="体重(g)"
								type='text'
								value={field.value}
								error={!!errors.weight}
								helperText={errors.weight?.message as string}
								onChange={handleChange}
								inputProps={{ inputMode: 'decimal' }}
							/>
						)
					}}
				/>

				{/* 食事量 */}
				<Controller
					rules={{ required: "食事量を入力してください" }}
					name='mealAmount'
					control={control}
					render={({ field }) => {
						const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
							const value = event.target.value;
							if (/^\d*\.?\d*$/.test(value) || value === '') {
								field.onChange(value);
							}
						};

						return (
							<TextField
								{...field}
								label="食事量(g)"
								type='text'
								value={field.value}
								error={!!errors.mealAmount}
								helperText={errors.mealAmount?.message as string}
								onChange={handleChange}
								inputProps={{ inputMode: 'decimal' }}
							/>
						)
					}}
				/>

				{/* 温度 */}
				<Controller
					rules={{ required: "温度を入力してください" }}
					name='temperature'
					control={control}
					render={({ field }) => {
						const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
							const value = event.target.value;
							if (/^\d*$/.test(value) || value === '') {
								field.onChange(value);
							}
						};

						return (
							<TextField
								{...field}
								label="温度(℃)"
								type='text'
								value={field.value}
								error={!!errors.temperature}
								helperText={errors.temperature?.message as string}
								onChange={handleChange}
								inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
							/>
						)
					}}
				/>

				{/* 湿度 */}
				<Controller
					rules={{ required: "湿度を入力してください" }}
					name='humidity'
					control={control}
					render={({ field }) => {
						const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
							const value = event.target.value;
							if (/^\d*$/.test(value) || value === '') {
								field.onChange(value);
							}
						};

						return (
							<TextField
								{...field}
								label="湿度(%)"
								type='number'
								value={field.value}
								error={!!errors.humidity}
								helperText={errors.humidity?.message as string}
								onChange={handleChange}
								inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
							/>
						)
					}}
				/>

				{/* メモ */}
				<Controller
					rules={{
						required: "メモを入力してください(50文字以内)",
						maxLength: {
							value: 50,
							message: '50文字以内でを入力してください。'
						}
					}}
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
