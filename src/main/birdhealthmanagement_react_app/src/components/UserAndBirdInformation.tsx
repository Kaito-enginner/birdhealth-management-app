import { Typography, Box, Grid, Paper, Button } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import LockResetIcon from '@mui/icons-material/LockReset';
import { Bird, UserBirdDto } from "../type/type";
import { ageCalcuration } from './calculation/AgeCalculation';


interface UserAndBirdInformationProps {
	reRender: boolean;
	handleSelectedBird: (bird: Bird) => void
	handleOpen: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	userBirds: UserBirdDto | undefined;
	setSelectedUserEdit: React.Dispatch<React.SetStateAction<boolean>>
	setSelectedPasswordEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserAndBirdInformation = ({ handleSelectedBird, handleOpen, userBirds, setSelectedUserEdit, setSelectedPasswordEdit }: UserAndBirdInformationProps) => {
	return (
		<Box>
			{userBirds ? (
				<Box>
					<Grid container>
						<Grid size={12}>
							<Paper elevation={3} sx={{ p: "1.5rem", m: ".5rem" }}>
								<Grid container spacing={2}>
									<Grid size={{xs: 12, sm: 6, lg: 8}}>
										<Typography sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
											あなたのプロフィール
										</Typography>
									</Grid>
									<Grid size={{xs: 12, sm: 3, lg: 2}} sx={{ display: "flex", justifyContent: {lg: "end"} }}>
										<Button
											variant="outlined"
											startIcon={<ModeEditIcon />}
											onClick={(e) => {
												setSelectedUserEdit(true)
												handleOpen(e)
											}}
										>
											プロフィール編集
										</Button>
									</Grid>
									<Grid size={{xs: 12, sm: 3, lg: 2}} sx={{ display: "flex", justifyContent: {lg: "center"} }}>
										<Button
											variant="outlined"
											startIcon={<LockResetIcon />}
											onClick={(e) => {
												setSelectedPasswordEdit(true)
												handleOpen(e)
											}}
										>
											パスワード変更
										</Button>
									</Grid>
									<Grid size={12}>
										名前：{userBirds.userName}
									</Grid>
									<Grid size={12}>
										メールアドレス：{userBirds.userEmail}
									</Grid>
								</Grid>
							</Paper>
						</Grid>

						{userBirds.birds.map((bird, index) => (
							<Grid key={index} size={{ xs: 12, sm: 6 }} sx={{ display: "flex", flexGrow: 1 }}>
								<Paper elevation={3} sx={{ p: "1.5rem", m: ".5rem" }}>
									<Grid container spacing={2}>
										<Grid size={{xs:12, lg: 7}}>
											<Typography sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
												愛鳥さんのプロフィール{index + 1}
											</Typography>
										</Grid>
										<Grid size={{xs:12, lg: 5}} sx={{ display: "flex", justifyContent: {lg: "end"} }}>
											<Button
												onClick={(e) => {
													handleSelectedBird(bird)
													handleOpen(e)
												}}
												variant="outlined"
												startIcon={<ModeEditIcon />}>
												プロフィール編集
											</Button>
										</Grid>
										<Grid size={12}>
											名前：{bird.name}
										</Grid>
										<Grid size={12}>
											性別：{bird.gender}
										</Grid>
										<Grid size={12}>
											年齢：{ageCalcuration(bird.birthday)}
										</Grid>
										<Grid size={12}>
											誕生日：{bird.birthday}
										</Grid>
										<Grid size={12}>
											適正体重：{bird.bestWeight}g
										</Grid>
									</Grid>
								</Paper>
							</Grid>
						))}
					</Grid>
				</Box>
			) : (
				<p>Loading...</p>
			)}
		</Box>
	);
};
