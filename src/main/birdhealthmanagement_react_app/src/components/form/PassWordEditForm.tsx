import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Box, Stack, Button, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from '@mui/material';
import { PasswordEditFormType } from '../../type/type';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { useState } from 'react';
import { modalStyle } from '../../theme/theme';

interface PassWordEditFormProps {
	handleClose: () => void;
}

const PassWordEditForm = ({ handleClose }:PassWordEditFormProps) => {
	const BASE_URL = import.meta.env.VITE_API_BASE_URL;
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const { register, control, handleSubmit, watch, formState: { errors } } = useForm<PasswordEditFormType>({
		defaultValues: {
			password: "",
			confirmationpassword: ""
		}
	})

	const password = watch('password'); // 入力されたパスワードを監視

	// 送信処理(パスワードを編集)
	const submitEditedPassword: SubmitHandler<PasswordEditFormType> = (data: PasswordEditFormType) => {
		fetch(`${BASE_URL}/mypage/useredit/pass`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			credentials: 'include'
		})
			.then(() => {
				handleClose()
			})
			.catch(error => console.error(error));
	}
	
	return (
		<Box sx={modalStyle}>
			<form onSubmit={handleSubmit(submitEditedPassword)}>
				<Stack spacing={2} sx={{ textAlign: 'center'}}>
					<Typography variant="h5">パスワード変更</Typography>
					
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

					{/* パスワード(確認用) */}
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
										type={showConfirmPassword ? 'text' : 'password'}
										endAdornment={
											<InputAdornment position="end">
												<IconButton
													aria-label={
														showConfirmPassword ? 'hide the password' : 'display the password'
													}
													onClick={handleClickShowConfirmPassword}
													onMouseDown={handleMouseDownPassword}
													onMouseUp={handleMouseUpPassword}
													edge="end"
												>
													{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
						更新
					</Button>
				</Stack>
			</form>
		</Box>
	)
}

export default PassWordEditForm