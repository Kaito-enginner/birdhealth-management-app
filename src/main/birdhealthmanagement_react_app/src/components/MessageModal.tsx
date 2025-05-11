import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { } from "react";

interface MessageMoadalProps {
	openDialog: boolean;
	setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
	dialogMessage: string;
}
const MessageMoadal = ({ openDialog, setOpenDialog, dialogMessage }: MessageMoadalProps) => {

	const removeForcus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.currentTarget.blur();
	}
	return (
		<Box>
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

export default MessageMoadal
