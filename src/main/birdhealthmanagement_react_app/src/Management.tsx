import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';



interface UserType {
	id: number;
	name: string;
	email: string;
	consecutive_login_days: number;
	createdAt: string;
	updatedAt: string;
}

interface ManagementProps {
	openDialog: boolean;
	setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
	dialogMessage: string;
	setDialogMessage: React.Dispatch<React.SetStateAction<string>>;
	reRender: boolean;
	handleReRender: () => void;
}

const Management = ({ openDialog, setOpenDialog, dialogMessage, setDialogMessage, reRender, handleReRender }: ManagementProps) => {
	const [users, setUsers] = useState<UserType[]>([])

	// フォーカスをはずす
	const removeForcus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.currentTarget.blur();
	}

	useEffect(() => {
		fetch('http://localhost:8080/managementpage', {
			method: 'GET',
			credentials: 'include'
		})
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				setUsers(data)
			})
			.catch(error => console.error("リクエストエラー:", error));
	}, [reRender]);

	useEffect(() => {
		users.map((user) => {
			const changedUser = {
				createdAt: user.createdAt.substring(0, 10),
				updatedAt: user.updatedAt.substring(0, 10)
			}
			Object.assign(user, changedUser);
		})
	}, [users])

	const handleDelete = (id: number) => {
		fetch('http://localhost:8080/managementpage/delete', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(id),
		})
			.then(async response => {
				console.log(response)
				if (!response.ok) {
					throw new Error("送信に失敗しました")
				}
				handleReRender()
				const message = await response.text()
				setDialogMessage(message)
				setOpenDialog(true)
			})
			.catch(error => console.error("リクエストエラー:", error));
	}

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', sortable: false, width: 70 },
		{ field: 'name', headerName: '名前', sortable: false, width: 150 },
		{ field: 'email', headerName: 'メールアドレス', sortable: false, width: 300 },
		{ field: 'consecutive_login_days', headerName: 'ログイン日数', sortable: false, width: 150 },
		{ field: 'updatedAt', headerName: '最終ログイン日', sortable: false, width: 150 },
		{ field: 'createdAt', headerName: 'アカウント作成日', sortable: false, width: 150 },
		{
			field: 'actions',
			headerName: '操作',
			width: 100,
			sortable: false,
			renderCell: (params) => (
				<Button
					variant="contained"
					color="error"
					size="small"
					onClick={() => handleDelete(params.row.id)}
				>
					削除
				</Button>
			)
		}
	];

	const paginationModel = { page: 0, pageSize: 10 };

	return (
		<Box>
			<Paper sx={{ p: '2rem' }}>
				<Typography variant="h6" sx={{ mb: '1rem' }}>会員一覧</Typography>
				<DataGrid
					rows={users}
					columns={columns}
					initialState={{ pagination: { paginationModel } }}
					pageSizeOptions={[10]}
					sx={{ border: 0 }}
				/>
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

export default Management