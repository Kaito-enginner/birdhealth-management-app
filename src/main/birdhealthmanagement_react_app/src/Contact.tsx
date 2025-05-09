import { Box } from '@mui/material';
import { } from 'react';
import { ContactForm } from './components/form/ContactForm';

interface ContactProps {
	openDialog: boolean;
	setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
	dialogMessage: string;
	setDialogMessage: React.Dispatch<React.SetStateAction<string>>;
}
const Contact = ({ openDialog, setOpenDialog, dialogMessage, setDialogMessage }: ContactProps) => {
	return (
		<Box>
			<ContactForm
				openDialog={openDialog}
				setOpenDialog={setOpenDialog}
				dialogMessage={dialogMessage}
				setDialogMessage={setDialogMessage}
			/>
		</Box>
	)
}

export default Contact