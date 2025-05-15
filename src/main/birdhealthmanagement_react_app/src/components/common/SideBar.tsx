import { Box, Drawer, Toolbar } from '@mui/material'
import React, { CSSProperties } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Divider from '@mui/material/Divider';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Logout } from "../Logout";
import { useAuth } from '../security/AuthProvider';
import { Bird, MonthlyRecord } from '../../type/type';

interface SideBarProps {
	drawerWidth: number;
	mobileOpen: boolean;
	handleDrawerTransitionEnd: () => void;
	handleDrawerClose: () => void;
	setMonthlyRecords: React.Dispatch<React.SetStateAction<MonthlyRecord[] | undefined>>;
	setSelectedBird: React.Dispatch<React.SetStateAction<Bird | undefined>>
}

interface menuItem {
	text: string,
	path: string,
	icon: React.ComponentType
}

const SideBar = ({ drawerWidth, mobileOpen, handleDrawerTransitionEnd, handleDrawerClose, setMonthlyRecords, setSelectedBird }: SideBarProps) => {
	const { setRole } = useAuth();
	const { role } = useParams(); // URLからroleを取得
	const navigate = useNavigate();

	// ログアウト処理
	const handleLogout = async () => {
		try {
			await Logout();
			setRole(null);
			setMonthlyRecords([])
			setSelectedBird(undefined)
			sessionStorage.clear();
			navigate("/");
		} catch (error) {
			console.error(error);
			alert("ログアウトに失敗しました");
		}
	};

	const AdminMenuItems: menuItem[] = [
		{ text: "ホーム", path: `/${role}/home`, icon: HomeIcon },
		{ text: "管理ページ", path: `/${role}/management`, icon: SupervisorAccountIcon }
	]

	const GeneralMenuItems: menuItem[] = [
		{ text: "ホーム", path: `/home`, icon: HomeIcon },
		{ text: "マイページ", path: `/mypage`, icon: PersonIcon },
		{ text: "グラフ", path: `/chart`, icon: BarChartIcon },
		{ text: "お問い合わせ", path: `/contact`, icon: ContactMailIcon }
	]

	const baseLinkStyle: CSSProperties = {
		textDecoration: "none",
		color: "inherit",
		display: "flex"
	}

	const activeLinkStyle: CSSProperties = {
		backgroundColor: "rgba(0, 0, 0, 0.08)"
	}
	const drawer = (
		<div>
			<Toolbar />
			<Divider />
			{role === 'admin' ?
				<List>
					{AdminMenuItems.map((item, index) => (
						<NavLink key={item.text} to={item.path} style={({ isActive }) => {
							return {
								...baseLinkStyle,
								...(isActive ? activeLinkStyle : {})
							}
						}}>
							<ListItem key={index} disablePadding>
								<ListItemButton>
									<ListItemIcon>
										{/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
										<item.icon />
									</ListItemIcon>
									<ListItemText primary={item.text} />
								</ListItemButton>
							</ListItem>
						</NavLink>
					))}
				</List>
				:
				<List>
					{GeneralMenuItems.map((item, index) => (
						<NavLink key={item.text} to={item.path} style={({ isActive }) => {
							return {
								...baseLinkStyle,
								...(isActive ? activeLinkStyle : {})
							}
						}}>
							<ListItem key={index} disablePadding>
								<ListItemButton>
									<ListItemIcon>
										{/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
										<item.icon />
									</ListItemIcon>
									<ListItemText primary={item.text} />
								</ListItemButton>
							</ListItem>
						</NavLink>
					))}
				</List>
			}

			<Divider />
			<List>
				<ListItem key={"ログアウト"} onClick={handleLogout} disablePadding>
					<ListItemButton>
						<ListItemIcon>
							<LogoutIcon />
						</ListItemIcon>
						<ListItemText primary={"ログアウト"} />
					</ListItemButton>
				</ListItem>
			</List>
		</div>
	);

	return (
		<>
			<Box
				component="nav"
				sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
				aria-label="mailbox folders"
			>
				{/* モバイル用 */}
				<Drawer
					variant="temporary"
					open={mobileOpen}
					onTransitionEnd={handleDrawerTransitionEnd}
					onClose={handleDrawerClose}
					sx={{
						display: { xs: 'block', md: 'none' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
					slotProps={{
						root: {
							keepMounted: true, // Better open performance on mobile.
						},
					}}
				>
					{drawer}
				</Drawer>

				{/* PC用 */}
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: 'none', md: 'block' },
						'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
		</>
	)
}

export default SideBar
