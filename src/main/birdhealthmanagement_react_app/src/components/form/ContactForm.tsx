import { Box, Button, Paper, Stack, TextField, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { ContactFormType } from "../../type/type"

interface ContactFormProps {
	openDialog: boolean;
	setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
	dialogMessage: string;
	setDialogMessage: React.Dispatch<React.SetStateAction<string>>;
}
export const ContactForm = ({ openDialog, setOpenDialog, dialogMessage, setDialogMessage }: ContactFormProps) => {
	const { register, control, reset, handleSubmit, formState: { errors } } = useForm<ContactFormType>({
		defaultValues: {
			email: '',
			content: ''
		}
	})
	
	// フォーカスをはずす
	const removeForcus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
		e.currentTarget.blur();
	}

	// 送信処理(お問い合わせ内容を送信)
	const submitContactInformation: SubmitHandler<ContactFormType> = (data: ContactFormType) => {
		fetch(`http://localhost:8080/contactpage`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data),
			credentials: 'include'
		})
			.then(async response => {
				console.log(response)
				if (!response.ok) {
					throw new Error("送信に失敗しました")
				}
				const message = await response.text()
				setDialogMessage(message)
				setOpenDialog(true)
				reset()
			})
			.catch(error => {
				console.error(error);
				setDialogMessage("エラーが発生しました。もう一度お試しください。")
				setOpenDialog(true)
			});
	}

	return (
		<Box>
			<Paper sx={{ p: '2rem' }}>
				<form onSubmit={handleSubmit(submitContactInformation)}>
					<Stack spacing={2} sx={{ textAlign: 'center' }}>
						<Typography variant="h5">お問い合わせフォーム</Typography>

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

						{/* お問い合わせ内容 */}
						<Controller
							{...register('content', {
								required: 'お問い合わせ内容を入力してください。'
							})}
							name='content'
							control={control}
							render={({ field }) => {
								return (
									<TextField {...field} multiline label="お問い合わせ内容" rows={4} error={!!errors.content} helperText={errors.content?.message as string} />
								)
							}}
						/>

						<Button type='submit' size="large" sx={{ bgcolor: "#1976d2", color: "white" }}>
							送信
						</Button>
					</Stack>
				</form>
			</Paper>
			<Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
				<DialogTitle>お知らせ</DialogTitle>
				<DialogContent>
					<DialogContentText>{dialogMessage}</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={(e) => {
						removeForcus(e)
						setOpenDialog(false)
					}}>
						閉じる
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	)
}