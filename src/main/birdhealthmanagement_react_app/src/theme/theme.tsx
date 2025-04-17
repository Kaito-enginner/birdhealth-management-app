import { createTheme } from '@mui/material/styles'
export const theme = createTheme({
	typography: {
		fontFamily: 'Noto Sans JP, Roboto, "Helvetica Neue", Arial, sans-serif',
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 700
	}
})

export const modalStyle = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};