import { Typography, Box, Grid, Paper, Button } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { BirdPreview, UserBirdDto } from "../type/type";




interface UserAndBirdInformationProps {
	reRender: boolean;
	handleSelectedBird: (bird: BirdPreview) => void;
	handleOpen: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	userBirds: UserBirdDto | undefined;
}

export const UserAndBirdInformation = ({handleSelectedBird, handleOpen, userBirds}: UserAndBirdInformationProps) => {
	return (
	    <Box>
	      {userBirds ? (
	        <Box>
				<Grid container>
					<Grid size={12}>
						<Paper elevation={3} sx={{p: "1.5rem", m: ".5rem"}}>
							<Grid container spacing={2}>
							  <Grid size={8}>
							    <Typography sx={{fontWeight: "bold", fontSize: "1.25rem"}}>
								  あなたのプロフィール
								</Typography>
							  </Grid>
							  <Grid size={4} sx={{display: "flex", justifyContent: "end"}}>
							    <Button
								 variant="outlined"
								 startIcon={<ModeEditIcon />}
								 onClick={(e) => {
								 	handleOpen(e)
								 }} 
								>
							      編集
							    </Button>
							  </Grid>
							  <Grid size={12}>
							    会員ID：{userBirds.userId}
							  </Grid>
							  <Grid size={12}>
							    名前：{userBirds.userName}
							  </Grid>
							  <Grid size={12}>
							    年齢：{userBirds.userAge}才
							  </Grid>
							  <Grid size={12}>
							    メールアドレス：{userBirds.userEmail}
							  </Grid>
							</Grid>
						</Paper>
					</Grid>
					
					{userBirds.birds.map((bird, index) => (
						<Grid key={index} size={{xs: 12, sm: 6}} sx={{display: "flex", flexGrow: 1}}>
							<Paper elevation={3} sx={{p: "1.5rem", m: ".5rem"}}>
								<Grid container spacing={2}>
								  <Grid size={8}>
								    <Typography sx={{fontWeight: "bold", fontSize: "1.25rem"}}>
									  愛鳥さんのプロフィール{index + 1}
									</Typography>
								  </Grid>
									<Grid size={4} sx={{display: "flex", justifyContent: "end"}}>
									  <Button 
									  onClick={(e) => {
										handleSelectedBird(bird)
										handleOpen(e)
									  }} 
									  variant="outlined" 
									  startIcon={<ModeEditIcon />}>
									    編集
									  </Button>
									</Grid>
								  <Grid size={12}>
								    名前：{bird.name}
								  </Grid>
								  <Grid size={12}>
								    性別：{bird.gender}
								  </Grid>
								  <Grid size={12}>
								    年齢：{bird.age}才
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
