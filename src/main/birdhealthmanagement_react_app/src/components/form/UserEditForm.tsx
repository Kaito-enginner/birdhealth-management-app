import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Box, TextField, Stack, Button, Typography } from '@mui/material';
import { UserBirdDto, UserEditFormType } from '../../type/type';
import { modalStyle } from '../../theme/theme';

interface UserEditFormProps {
	userBirds: UserBirdDto | undefined;
	handleClose: () => void;
	handleReRender: () => void
}

const UserEditForm = ({ userBirds, handleClose, handleReRender }: UserEditFormProps) => {
	const BASE_URL = import.meta.env.VITE_API_BASE_URL;
	const { register, control, handleSubmit, setError, formState: { errors } } = useForm<UserEditFormType>({
		defaultValues: {
			name: userBirds && userBirds.userName,
			email: userBirds && userBirds.userEmail,
		}
	})


	// 送信処理(ユーザー情報を編集)
	const submitEditedUserInformation: SubmitHandler<UserEditFormType> = (data: UserEditFormType) => {
		fetch(`${BASE_URL}/api/mypage/useredit`, {
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
			<form onSubmit={handleSubmit(submitEditedUserInformation)}>
				<Stack spacing={2} sx={{ textAlign: 'center'}}>
					<Typography variant="h5">プロフィール編集</Typography>

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

					<Button type='submit' sx={{ bgcolor: "#1976d2", color: "white" }}>
						更新
					</Button>
				</Stack>
			</form>
		</Box>
	)
}

export default UserEditForm