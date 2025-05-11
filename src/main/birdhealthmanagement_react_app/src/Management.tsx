import { Box, Button, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import MessageMoadal from './components/MessageModal';


interface UserType {
	id: number;
	name: string;
	email: string;
	enabled: boolean;
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
	const BASE_URL = import.meta.env.VITE_API_BASE_URL;

	useEffect(() => {
		fetch(`${BASE_URL}/api/managementpage`, {
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
		fetch(`${BASE_URL}/api/managementpage/delete`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(id),
		})
			.then(async response => {
				if (!response.ok) {
					return response.text().then(errorMessage => {
						throw new Error(errorMessage);
					});
				}
				handleReRender()
				const message = await response.text()
				setDialogMessage(message)
				setOpenDialog(true)
			})
			.catch(error => {
				console.error("エラー発生:", error.message);
				setDialogMessage(error.message);
			});
	}

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', sortable: false, width: 70 },
		{ field: 'name', headerName: '名前', sortable: false, width: 150 },
		{ field: 'email', headerName: 'メールアドレス', sortable: false, width: 300 },
		{
			field: 'enabled',
			headerName: '状態',
			sortable: false,
			width: 150,
			renderCell: (params) => (
				params.row.enabled === true ? "有効" : "無効"
			)
		},
		{ field: 'consecutive_login_days', headerName: 'ログイン日数', sortable: false, width: 150 },
		{ field: 'updatedAt', headerName: '最終ログイン日', sortable: false, width: 150 },
		{ field: 'createdAt', headerName: 'アカウント作成日', sortable: false, width: 150 },
		{
			field: 'actions',
			headerName: '操作',
			width: 100,
			sortable: false,
			renderCell: (params) => (
				params.row.enabled === true ?
					<Button
						variant="contained"
						color="error"
						size="small"
						onClick={() => handleDelete(params.row.id)}
					>
						無効化
					</Button>
					:
					<Button
						variant="contained"
						color="success"
						size="small"
						onClick={() => handleDelete(params.row.id)}
					>
						有効化
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
			<MessageMoadal
				openDialog={openDialog}
				setOpenDialog={setOpenDialog}
				dialogMessage={dialogMessage}
			/>
		</Box>
	)
}

export default Management