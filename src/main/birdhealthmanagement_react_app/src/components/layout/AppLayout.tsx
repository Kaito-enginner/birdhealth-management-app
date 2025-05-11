import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Outlet } from 'react-router-dom';
import SideBar from '../common/SideBar';
import { MonthlyRecord } from '../../type/type';
const drawerWidth = 240;

interface AppLayoutProps {
	setMonthlyRecords: React.Dispatch<React.SetStateAction<MonthlyRecord[] | undefined>>;
}

export default function AppLayout({ setMonthlyRecords }: AppLayoutProps) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: (theme) => theme.palette.grey[100], minHeight: '100vh' }}>
      <CssBaseline />
	  
	  {/*ヘッダー*/}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: {xs: 2, sm: 3}, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap component="div">
            小鳥の健康管理アプリ
          </Typography>
        </Toolbar>
      </AppBar>
	  
	  {/*サイドバー*/}
	  <SideBar
		drawerWidth={drawerWidth}
		mobileOpen={mobileOpen} 
		handleDrawerTransitionEnd={handleDrawerTransitionEnd}
		handleDrawerClose={handleDrawerClose}
		setMonthlyRecords={setMonthlyRecords}
	   />
	  
	  {/*メインコンテンツ*/}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { md: `calc(100% - ${drawerWidth}px)` , xs: '100vw' } }}
      >
        <Toolbar />
		<Outlet />
      </Box>
    </Box>
  );
}
