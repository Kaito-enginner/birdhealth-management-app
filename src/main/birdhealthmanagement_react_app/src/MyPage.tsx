import { useState, useEffect } from "react";
import BirdRegsterForm from './components/form/BirdRegisterForm';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { BirdPreview, UserBirdDto } from "./type/type";
import { useParams } from "react-router-dom";
import { UserAndBirdInformation } from "./components/UserAndBirdInformation";

interface MyPageProps {
	handleSelectedBird: (bird: BirdPreview) => void;
	selectedBird: BirdPreview | undefined;
	setSelectedBird: React.Dispatch<React.SetStateAction<BirdPreview | undefined>>;
	userBirds: UserBirdDto | undefined;
	setUserBirds: React.Dispatch<React.SetStateAction<UserBirdDto | undefined>>;
	reRender: boolean;
	setReRender: React.Dispatch<React.SetStateAction<boolean>>;
}

const MyPage = ({handleSelectedBird, selectedBird, setSelectedBird, userBirds, setUserBirds, reRender, setReRender}: MyPageProps) => {
	const [open, setOpen] = useState(false);
	const { id } = useParams(); // URLからidを取得
	
	// フォームを開ける処理
	const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setOpen(true);
		if(e) {
			console.log(e)
			e.currentTarget.blur();
		}
	}
	
	// フォームを閉じる処理
	const handleClose = () => {
		setOpen(false);
		
		if(selectedBird) {
			setSelectedBird(undefined)
		}
	}
	
	// ユーザー＋愛鳥さんの情報を取得
	useEffect(() => {
			    fetch(`http://localhost:8080/mypage/${id}`, {
					method: 'GET'
				})
			      .then((res) => {
						return res.json()
					})
			      .then((data) => {
						return setUserBirds(data)
					})
			      .catch(error => console.error("リクエストエラー:", error));
		}, [reRender]);
	
	return (
		<>
		<UserAndBirdInformation reRender={reRender} handleSelectedBird={handleSelectedBird} handleOpen={handleOpen} userBirds={userBirds} />
		
		<Button onClick={handleOpen}>愛鳥さんを追加する</Button>
		
		<Modal
		      open={open}
		      onClose={handleClose}
		  >
		  <BirdRegsterForm setReRender={setReRender} reRender={reRender} selectedBird={selectedBird} handleClose={handleClose}/>
		</Modal>
		</>
	)
}

export default MyPage
