import { AppBar, Toolbar, Box, Paper, Button, Stack, TextField, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from "@mui/material";
import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from "react-router-dom";
import { UserFormType } from "./type/type";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const SignUp = () => {
	const BASE_URL = import.meta.env.VITE_API_BASE_URL;
	const navigate = useNavigate();

	const { register, control, handleSubmit, watch, setError, formState: { errors } } = useForm<UserFormType>({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmationpassword: ""
		}
	})

	const password = watch('password'); // 入力されたパスワードを監視

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleClickShowConfirmationPassword = () => setShowConfirmationPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	const createUser: SubmitHandler<UserFormType> = (data: UserFormType) => {
		fetch(`${BASE_URL}/api/signup`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				if (!response.ok) {
					return response.text().then(message => {
						throw new Error(message);
					});
				} else {
					navigate("/", { state: { signupSuccess: true } });
				}
			})
			.catch(error => {
				setError("email", {
					type: "manual",
					message: error.message
				});
			});
	}

	return (
		<Box>
			{/*ヘッダー*/}
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="fixed" sx={{ p: '.25rem' }}>
					<Toolbar>
						<Typography variant="h5" noWrap component="div">
							小鳥の健康管理アプリ
						</Typography>
					</Toolbar>
				</AppBar>
			</Box>
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', pt: '3rem' }}>
				<Paper sx={{ p: '2rem' }}>
					<form onSubmit={handleSubmit(createUser)}>
						<Stack spacing={2} sx={{ textAlign: 'center' }}>
							<Typography variant="h5">会員登録</Typography>

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
										<FormControl variant="outlined" error={!!errors.password}>
											<InputLabel
												htmlFor="outlined-adornment-password"
												sx={{
													color: errors.password ? '#d32f2f' : undefined,
													'&.Mui-focused': {
														color: errors.password ? '#d32f2f' : undefined,
													}
												}}
											>
												パスワード
											</InputLabel>
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
										<FormControl variant="outlined" error={!!errors.confirmationpassword}>
											<InputLabel
												htmlFor="outlined-adornment-password"
												sx={{
													color: errors.confirmationpassword ? '#d32f2f' : undefined,
													'&.Mui-focused': {
														color: errors.confirmationpassword ? '#d32f2f' : undefined,
													}
												}}
											>
												パスワード(確認用)
											</InputLabel>
											<OutlinedInput
												{...field}
												id="outlined-adornment-confirmationpassword"
												type={showConfirmationPassword ? 'text' : 'password'}
												endAdornment={
													<InputAdornment position="end">
														<IconButton
															aria-label={
																showConfirmationPassword ? 'hide the password' : 'display the password'
															}
															onClick={handleClickShowConfirmationPassword}
															onMouseDown={handleMouseDownPassword}
															onMouseUp={handleMouseUpPassword}
															edge="end"
														>
															{showConfirmationPassword ? <VisibilityOff /> : <Visibility />}
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

					<Link to="/" style={{ textDecoration: 'none', display: 'block', textAlign: 'center', marginTop: '1rem' }}>
						ログイン
						<OpenInNewIcon />
					</Link>
				</Paper>
			</Box>
		</Box>
	)
}

export default SignUp
