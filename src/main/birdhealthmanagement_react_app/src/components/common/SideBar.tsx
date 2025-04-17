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
import Divider from '@mui/material/Divider';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Logout } from "../Logout";

interface SideBarProps {
	drawerWidth: number,
	mobileOpen: boolean,
	handleDrawerTransitionEnd: () => void,
	handleDrawerClose: () => void
}

interface menuItem {
	text: string,
	path: string,
	icon: React.ComponentType
}

const SideBar = ({ drawerWidth, mobileOpen, handleDrawerTransitionEnd, handleDrawerClose }: SideBarProps) => {
	const { id } = useParams(); // URLからidを取得
	const navigate = useNavigate();

	// ログアウト処理
	const handleLogout = async () => {
		try {
			await Logout();
			navigate("/");
		} catch (error) {
			console.error(error);
			alert("ログアウトに失敗しました");
		}
	};

	const MemberMenuItems: menuItem[] = [
		{ text: "ホーム", path: `/${id}/home`, icon: HomeIcon },
		{ text: "マイページ", path: `/${id}/mypage`, icon: PersonIcon },
		{ text: "グラフ", path: `/${id}/chart`, icon: BarChartIcon },
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
			<List>
				{MemberMenuItems.map((item, index) => (
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
