import { AppBar, Toolbar, Box, Paper, Button, Stack, TextField, Typography } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


type EmailResetFormType = {
	email: string
}



const PasswordReset = () => {
	const navigate = useNavigate();

	const { register, reset, control, handleSubmit, setError, formState: { errors } } = useForm<EmailResetFormType>({
		defaultValues: {
			email: "",
		}
	})

	const emaiSubmit: SubmitHandler<EmailResetFormType> = (data: EmailResetFormType) => {
		fetch('http://localhost:8080/reset', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
		})
			.then(response => {
				if (!response.ok) {
					return response.text().then(message => {
						throw new Error(message);
					});
				}
				navigate('/', { state: { changedSuccess: true } }); reset()
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
			<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
				<Paper sx={{ p: '2rem' }}>
					<form onSubmit={handleSubmit(emaiSubmit)}>
						<Stack spacing={3} sx={{ textAlign: 'center' }}>
							<Typography variant="h5">パスワード再設定</Typography>
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

							<Button type='submit' sx={{ bgcolor: "#1976d2", color: "white" }}>
								送信
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

export default PasswordReset
