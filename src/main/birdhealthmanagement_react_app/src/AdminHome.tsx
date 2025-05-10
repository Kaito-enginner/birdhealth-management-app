import { useEffect, useState, useMemo } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { ContactTableType, UserContactDto } from './type/type';
import { MenuItem, Select } from '@mui/material';



interface HeadCell {
	disablePadding: boolean;
	id: keyof ContactTableType;
	label: string;
	numeric: boolean;
}

const headCells: readonly HeadCell[] = [
	{
		id: 'id',
		numeric: false,
		disablePadding: true,
		label: 'ID',
	},
	{
		id: 'name',
		numeric: true,
		disablePadding: false,
		label: '名前',
	},
	{
		id: 'email',
		numeric: true,
		disablePadding: false,
		label: 'メールアドレス',
	},
	{
		id: 'content',
		numeric: true,
		disablePadding: false,
		label: 'お問い合わせ内容',
	},
	{
		id: 'status',
		numeric: true,
		disablePadding: false,
		label: '対応状況',
	},
	{
		id: 'createdAt',
		numeric: true,
		disablePadding: false,
		label: '受付日時',
	},

];

interface EnhancedTableProps {
	numSelected: number;
	onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
	rowCount: number;
}

// ヘッダー
function EnhancedTableHead(props: EnhancedTableProps) {
	const { onSelectAllClick, numSelected, rowCount } = props;

	return (
		<TableHead>
			<TableRow>
				<TableCell padding="checkbox">
					<Checkbox
						color="primary"
						indeterminate={numSelected > 0 && numSelected < rowCount}
						checked={rowCount > 0 && numSelected === rowCount}
						onChange={onSelectAllClick}
						inputProps={{
							'aria-label': 'select all desserts',
						}}
					/>
				</TableCell>
				{headCells.map((headCell) => (
					<TableCell
						key={headCell.id}
						align={headCell.numeric ? 'right' : 'left'}
						padding={headCell.disablePadding ? 'none' : 'normal'}
					>
						{headCell.label}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
}

interface EnhancedTableToolbarProps {
	numSelected: number;
	statusFilter: 'all' | '対応' | '未対応';
	setStatusFilter: React.Dispatch<React.SetStateAction<'all' | '対応' | '未対応'>>;
	selected: readonly number[];
	setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
	BASE_URL: string;
}

// ツールバー
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
	const { numSelected, statusFilter, setStatusFilter, selected, setSelected, BASE_URL } = props;

	const handleStatusChange = () => {
		fetch(`${BASE_URL}/adminhomepage/complete`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(selected),
			credentials: 'include'
		})
			.then(() => setSelected([]))
			.catch(error => console.error("リクエストエラー:", error));
	}
	return (
		<Toolbar
			sx={[
				{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } },
				numSelected > 0 && {
					bgcolor: (theme) =>
						alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
				},
			]}
		>
			{numSelected > 0 ? (
				<Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
					{numSelected} 件を選択中
				</Typography>
			) : (
				<Typography
					sx={{ flex: '1 1 100%' }}
					variant="h6"
					id="tableTitle"
					component="div"
				>
					お問い合わせ一覧
				</Typography>
			)}

			{numSelected > 0 ? (
				<Tooltip title="完了">
					<IconButton onClick={handleStatusChange}>
						<DoneOutlineIcon />
					</IconButton>
				</Tooltip>
			) : (
				<Box sx={{ ml: 2 }}>
					<Select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value as 'all' | '対応' | '未対応')}
						displayEmpty
						size="small"
					>
						<MenuItem value="all">全て</MenuItem>
						<MenuItem value="対応">対応済み</MenuItem>
						<MenuItem value="未対応">未対応</MenuItem>
					</Select>
				</Box>
			)}
		</Toolbar>
	);
}

// メインコンテンツ
export default function AdminHome() {
	const BASE_URL = import.meta.env.VITE_API_BASE_URL;
	const [selected, setSelected] = useState<readonly number[]>([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [statusFilter, setStatusFilter] = useState<'all' | '対応' | '未対応'>('all');


	const [allContact, setAllContact] = useState<UserContactDto[]>([])

	// 全てのお問い合わせ情報を取得
	useEffect(() => {
		fetch(`${BASE_URL}/adminhomepage`, {
			method: 'GET',
			credentials: 'include'
		})
			.then((res) => res.json())
			.then((data) => {
				setAllContact(data)
			})
			.catch(error => console.error("リクエストエラー:", error));
	}, [selected]);

	const records = useMemo(() => {
		return allContact.map((contact) => ({
			id: contact.contact.id,
			name: contact.userName,
			email: contact.contact.email,
			content: contact.contact.content,
			status: contact.contact.status,
			createdAt: contact.contact.createdAt,
		}));
	}, [allContact]);

	const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.checked) {
			const newSelected = records.map((n) => n.id);
			setSelected(newSelected);
			return;
		}
		setSelected([]);
	};

	const handleClick = (_event: React.MouseEvent<unknown>, id: number) => {
		const selectedIndex = selected.indexOf(id);
		let newSelected: readonly number[] = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, id);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1),
			);
		}
		setSelected(newSelected);
	};

	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const filteredRecords = useMemo(() => {
		return records.filter((record) => {
			if (statusFilter === '対応') return record.status === true;
			if (statusFilter === '未対応') return record.status === false;
			return true; // 'all'
		});
	}, [records, statusFilter]);



	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - records.length) : 0;

	const visibleRows = useMemo(
		() => filteredRecords.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
		[page, rowsPerPage, filteredRecords],
	);

	return (
		<Box>
			<Paper sx={{ p: '1rem' }}>
				<EnhancedTableToolbar
					numSelected={selected.length}
					statusFilter={statusFilter}
					setStatusFilter={setStatusFilter}
					selected={selected}
					setSelected={setSelected}
					BASE_URL={BASE_URL}
				/>
				<TableContainer>
					<Table
						sx={{ minWidth: 750 }}
						aria-labelledby="tableTitle"
						size={'medium'}
					>
						<EnhancedTableHead
							numSelected={selected.length}
							onSelectAllClick={handleSelectAllClick}
							rowCount={records.length}
						/>
						<TableBody>
							{visibleRows.map((record, index) => {
								const isItemSelected = selected.includes(record.id);
								const labelId = `enhanced-table-checkbox-${index}`;

								return (
									<TableRow
										hover
										onClick={(event) => handleClick(event, record.id)}
										role="checkbox"
										aria-checked={isItemSelected}
										tabIndex={-1}
										key={record.id}
										selected={isItemSelected}
										sx={{ cursor: 'pointer' }}
									>
										<TableCell padding="checkbox">
											<Checkbox
												color="primary"
												checked={isItemSelected}
												inputProps={{
													'aria-labelledby': labelId,
												}}
											/>
										</TableCell>
										<TableCell
											component="th"
											id={labelId}
											scope="row"
											padding="none"
										>
											{record.id}
										</TableCell>
										<TableCell align="right">{record.name}</TableCell>
										<TableCell align="right">{record.email}</TableCell>
										<TableCell align="right">
											{record.content.split(/\r?\n/).map((line, index) => (
												<span key={index}>
													{line}
													<br />
												</span>
											))}
										</TableCell>
										<TableCell align="right">{record.status ? '対応済み' : '未対応'}</TableCell>
										<TableCell align="right">{record.createdAt.substring(0, 10)}</TableCell>
									</TableRow>
								);
							})}
							{emptyRows > 0 && (
								<TableRow
									style={{
										height: (53) * emptyRows,
									}}
								>
									<TableCell colSpan={6} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={filteredRecords.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
		</Box>
	);
}
