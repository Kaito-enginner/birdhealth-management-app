import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Box, TextField, Stack, Button, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from '@mui/material';
import { UserBirdDto, UserFormType } from '../../type/type';
import { useParams } from 'react-router-dom';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useState } from 'react';
import { modalStyle } from '../../theme/theme';

interface UserEditFormProps {
	userBirds: UserBirdDto | undefined;
	handleClose: () => void;
	handleReRender: () => void
}

const UserEditForm = ({ userBirds, handleClose, handleReRender }: UserEditFormProps) => {
	const { id } = useParams(); // URLからidを取得
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const { register, control, handleSubmit, watch, setError, formState: { errors } } = useForm<UserFormType>({
		defaultValues: {
			name: userBirds && userBirds.userName,
			age: userBirds && userBirds.userAge,
			email: userBirds && userBirds.userEmail,
			password: "",
			confirmationpassword: ""
		}
	})

	const password = watch('password'); // 入力されたパスワードを監視

	// 送信処理(ユーザー情報を編集)
	const onEditUser: SubmitHandler<UserFormType> = (data: UserFormType) => {
		fetch(`http://localhost:8080/mypage/${id}/useredit`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			credentials: 'include'
		})
			.then(response => {
				if (!response.ok) {
					return response.text().then(message => {
						throw new Error(message);
					});
				}
				handleClose()
				handleReRender()
			})
			.catch(error => {
				setError("email", {
					type: "manual",
					message: error.message
				});
			});
	}
	
	return (
		<Box sx={modalStyle}>
			<form onSubmit={handleSubmit(onEditUser)}>
				<Stack spacing={2}>
					<Typography variant="h5" sx={{ textAlign: 'center' }}>会員情報編集</Typography>

					{/* 名前 */}
					<Controller
						{...register('name', {
							required: '名前を入力してください。'
						})}
						name='name'
						control={control}
						render={({ field }) => {
							return (
								<TextField {...field} label="名前" type='text' error={!!errors.name} helperText={errors.name?.message as string} />
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
							return (
								<TextField {...field} label="年齢" type='number' error={!!errors.age} helperText={errors.age?.message as string} />
							)
						}}
					/>

					{/* メールアドレス */}
					<Controller
						{...register('email', {
							required: 'メールアドレスを入力してください。'
						})}
						name='email'
						control={control}
						render={({ field }) => {
							return (
								<TextField {...field} label="メールアドレス" type='text' error={!!errors.email} helperText={errors.email?.message as string} />
							)
						}}
					/>

					{/* パスワード */}
					<Controller
						{...register('password', {
							required: 'パスワードを入力してください。',
						})}
						name='password'
						control={control}
						render={({ field }) => {
							return (
								<FormControl variant="outlined">
									{errors.password ?
										<InputLabel htmlFor="outlined-adornment-password" sx={{ color: '#d32f2f' }}>パスワード</InputLabel>
										:
										<InputLabel htmlFor="outlined-adornment-password">パスワード</InputLabel>
									}
									<OutlinedInput
										{...field}
										id="outlined-adornment-password"
										type={showPassword ? 'text' : 'password'}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label={
														showPassword ? 'hide the password' : 'display the password'
													}
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
													onMouseUp={handleMouseUpPassword}
													edge="end"
												>
													{showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										}
										label="パスワード"
										error={!!errors.password}
									/>
									<FormHelperText sx={{ color: '#d32f2f' }}>{errors.password?.message as string}</FormHelperText>
								</FormControl>
							)
						}}
					/>

					{/* パスワード */}
					<Controller
						{...register('confirmationpassword', {
							required: 'パスワード(確認用)を入力してください。',
							validate: value => value === password || '入力されたパスワードが一致しません。'
						})}
						name='confirmationpassword'
						control={control}
						render={({ field }) => {
							return (
								<FormControl variant="outlined">
									{errors.confirmationpassword ?
										<InputLabel htmlFor="outlined-adornment-confirmationpassword" sx={{ color: '#d32f2f' }}>パスワード(確認用)</InputLabel>
										:
										<InputLabel htmlFor="outlined-adornment-confirmationpassword">パスワード(確認用)</InputLabel>
									}
									<OutlinedInput
										{...field}
										id="outlined-adornment-confirmationpassword"
										type={showPassword ? 'text' : 'password'}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label={
														showPassword ? 'hide the password' : 'display the password'
													}
													onClick={handleClickShowPassword}
													onMouseDown={handleMouseDownPassword}
													onMouseUp={handleMouseUpPassword}
													edge="end"
												>
													{showPassword ? <VisibilityOff /> : <Visibility />}
												</IconButton>
											</InputAdornment>
										}
										label="パスワード(確認用)"
										error={!!errors.confirmationpassword}
									/>
									<FormHelperText sx={{ color: '#d32f2f' }}>{errors.confirmationpassword?.message as string}</FormHelperText>
								</FormControl>
							)
						}}
					/>

					<Button type='submit' sx={{ bgcolor: "#1976d2", color: "white" }}>
						会員登録
					</Button>
				</Stack>
			</form>
		</Box>
	)
}

export default UserEditForm