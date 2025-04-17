import Box from '@mui/material/Box';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { TextField, Stack, MenuItem, FormControl, InputLabel, Select, Button, Typography, FormHelperText } from '@mui/material';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { BirdPreview } from '../../type/type';
import { modalStyle } from '../../theme/theme';

interface BirdRegsterFormProps {
	selectedBird: BirdPreview | undefined;
	handleClose: () => void;
	handleReRender: () => void
}

const currentDay = format(new Date(), 'yyyy-MM-dd');

export default function BirdRegsterForm({ selectedBird, handleClose, handleReRender }: BirdRegsterFormProps) {
	const { id } = useParams(); // URLからidを取得
	const { register, control, handleSubmit, formState: { errors }, setValue } = useForm<BirdPreview>({
	  defaultValues: {
		id: selectedBird && selectedBird.id,
	    name: "はる",
	    gender: "おとこのこ",
	    age: 5,
	    birthday: currentDay,
	    bestWeight: 30
	  }
  });
  
  // 送信処理(愛鳥情報を追加)
  const onCreateBird: SubmitHandler<BirdPreview> = (data: BirdPreview) => {
	fetch(`http://localhost:8080/mypage/${id}/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json' // JSON形式のデータであることを宣言
		},
		body: JSON.stringify(data), // JSON形式に変換する
		credentials: 'include'
	})
	.then(() => {
		handleClose()
		handleReRender()
	})
	.catch(error => console.error("リクエストエラー:", error));
  }
  
  // 送信処理(愛鳥情報を編集)
  const onEditBird: SubmitHandler<BirdPreview> = (data: BirdPreview) => {
	  fetch(`http://localhost:8080/mypage/${id}/edit/bird`, {
	  	method: 'POST',
	  	headers: {
	  		'Content-Type': 'application/json' // JSON形式のデータであることを宣言
	  	},
	  	body: JSON.stringify(data), // JSON形式に変換する
		credentials: 'include'
	  })
	  .then(() => {
		handleClose()
	  	handleReRender()
		
	  })
	  .catch(error => console.error("リクエストエラー:", error));
  }
  
  // 選択したデータをフォームに反映する
  useEffect(() => {
	if(selectedBird) {
		setValue("id", selectedBird.id)
		setValue("name", selectedBird.name)
		setValue("gender", selectedBird.gender)
		setValue("age", selectedBird.age)
		setValue("birthday", selectedBird.birthday)
		setValue("bestWeight", selectedBird.bestWeight)
	}
  },[selectedBird])


  return (
	<>
		<Box component={"form"} onSubmit={handleSubmit(selectedBird ? onEditBird : onCreateBird)} sx={modalStyle}>
			<Stack spacing={2}>
				<Typography variant="h6" component="h2"sx={{p: .5}}>愛鳥さん登録フォーム</Typography>
				{/* ID */}
				{selectedBird && 
				<Controller
					name='id'
					control={control}
					render={({ field }) => {
						return(
							<input {...field} type='hidden'/>
						)
					}}
				/>}
				
				{/* 名前 */}
				<Controller
					{...register('name', {
						required: '名前を入力してください。'
					})}
					name='name'
					control={control}
					render={({ field }) => {
						return(
							<TextField {...field} label="名前" type='text' error={!!errors.name} helperText={errors.name?.message as string}/>
						)
					}}
				/>
				
				{/* 性別 */}
				<Controller
					{...register('gender', {
						required: '性別を入力してください。',
					})}
					name='gender'
					control={control}
					render={({ field }) => {
						return(
						<FormControl>
							<InputLabel id="gender-label">性別</InputLabel>
							<Select labelId='gender-label' label="性別" { ...field } error={!!errors.gender}>
								<MenuItem value={"おとこのこ"}>おとこのこ</MenuItem>
								<MenuItem value={"おんなのこ"}>おんなのこ</MenuItem>
							</Select>
							<FormHelperText>{errors.gender?.message as string}</FormHelperText>
						</FormControl>
						)
					}}
				/>
				
				{/* 年齢 */}
				<Controller 
					{...register('age', {
						required: '年齢を入力してください。'
					})}
					name='age'
					control={control}
					render={({ field }) => {
						return(
							<TextField {...field} label="年齢" type='number' error={!!errors.age} helperText={errors.age?.message as string}/>
						)
					}}
				/>
				
				{/* 誕生日 */}
				<Controller 
					{...register('birthday', {
						required: '誕生日を入力してください。',
					})}
					name='birthday'
					control={control}
					render={({ field }) => {
						return(
							<TextField {...field} label="誕生日" type='date' InputLabelProps={{shrink: true}} error={!!errors.birthday} helperText={errors.birthday?.message as string}/>
						)
					}}
				/>
				
				{/* 適正体重 */}
				<Controller
					{...register('bestWeight', {
						required: '体重を入力してください。',
						min: {
							value: 1,
							message: '体重は1g以上を入力してください。'
						}
					})} 
					name='bestWeight'
					control={control}
					render={({ field }) => {
						return (
							<TextField {...field}label="適正体重" type='number' error={!!errors.bestWeight} helperText={errors.bestWeight?.message as string}/>
						)
					}}
				/>
				
				<Button type='submit'sx={{bgcolor: "#1976d2", color: "white"}}>
					{selectedBird ? "更新する" : "登録する"}
				</Button>
			</Stack>
		</Box>
	</>
  );
}