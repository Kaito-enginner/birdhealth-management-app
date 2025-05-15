import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { } from "react";

interface MessageDialogProps {
	openDialog: boolean;
	setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
	dialogMessage: string;
}
const MessageDialog = ({ openDialog, setOpenDialog, dialogMessage }: MessageDialogProps) => {

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

export default MessageDialog
