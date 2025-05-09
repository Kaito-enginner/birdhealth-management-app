import { useEffect, useState } from "react";
import { AppBar, Toolbar, Box, Paper, Button, Stack, TextField, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, FormHelperText } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate, useLocation } from "react-router-dom";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


type LoginInformation = {
	email: string
	password: string
}

interface LoginProps {
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
}


const Login = ({ message, setMessage }: LoginProps) => {
	const [loginError, setLoginError] = useState("");
	const location = useLocation();
	const navigate = useNavigate();
	const { register, control, handleSubmit, formState: { errors } } = useForm<LoginInformation>({
		defaultValues: {
			email: "",
			password: ""
		}
	})

	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};
	const loginInformationSubmit: SubmitHandler<LoginInformation> = (data: LoginInformation) => {
		const formData = new URLSearchParams();
		formData.append('username', data.email);
		formData.append('password', data.password);

		fetch('http://localhost:8080/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: formData.toString(),
			credentials: 'include' // ← セッションのCookie送受信に必要
		})
			.then(async (response) => {
				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.error || "ログインに失敗しました");
				}
				return response.json();
			})
			.then(data => {
				const role = data.role
				//				setUserRole(role)
				if (role === 'ROLE_ADMIN') {
					navigate(`/${role}/home`, { state: { loginSuccess: true } });
				} else {
					navigate(`/home`, { state: { loginSuccess: true } });
				}
			})
			.catch(error => {
				console.error("ログインエラー:", error)
				setLoginError(error.message)
			});
	}

	useEffect(() => {
		if (location.state?.signupSuccess) {
			setMessage("会員登録が完了しました。");
			const timer = setTimeout(() => setMessage(""), 2000);
			return () => clearTimeout(timer);
		} else if (location.state?.changedSuccess) {
			setMessage("仮パスワードを送信しました。");
			const timer = setTimeout(() => setMessage(""), 2000);
			return () => clearTimeout(timer);
		}
	}, [location.state]);

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
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<Paper sx={{ p: '2rem' }}>
					{message && <Typography variant="h6" sx={{ fontweight: 'bold', color: 'deepskyblue' }}>{message}</Typography>}
					<form onSubmit={handleSubmit(loginInformationSubmit)}>
						<Stack spacing={3} sx={{ textAlign: 'center' }}>
							{loginError && <p style={{ color: 'red' }}>{loginError}</p>}
							<Typography variant="h5">ログイン</Typography>
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
											//											helperText={errors.password?.message as string}
											/>
											<FormHelperText sx={{ color: '#d32f2f' }}>{errors.password?.message}</FormHelperText>
										</FormControl>
									)
								}}
							/>

							<Button type='submit' sx={{ bgcolor: "#1976d2", color: "white" }}>
								ログイン
							</Button>
						</Stack>
					</form>

					<Link to="/signup" style={{ textDecoration: 'none', display: 'block', textAlign: 'center', marginTop: '1rem' }}>
						会員登録
						<OpenInNewIcon />
					</Link>

					<Link to="/reset" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>
						パスワードをお忘れですか？
						<OpenInNewIcon />
					</Link>
				</Paper>
			</Box>
		</Box>
	)
}

export default Login
