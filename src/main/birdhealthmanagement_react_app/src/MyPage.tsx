import { useState, useEffect } from "react";
import BirdRegsterForm from './components/form/BirdRegisterForm';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { BirdPreview, UserBirdDto } from "./type/type";
import { useParams } from "react-router-dom";
import { UserAndBirdInformation } from "./components/UserAndBirdInformation";
import UserEditForm from "./components/form/UserEditForm";

interface MyPageProps {
	handleSelectedBird: (bird: BirdPreview) => void;
	selectedBird: BirdPreview | undefined;
	setSelectedBird: React.Dispatch<React.SetStateAction<BirdPreview | undefined>>;
	userBirds: UserBirdDto | undefined;
	setUserBirds: React.Dispatch<React.SetStateAction<UserBirdDto | undefined>>;
	reRender: boolean;
	handleReRender: () => void
}

const MyPage = ({handleSelectedBird, selectedBird, setSelectedBird, userBirds, setUserBirds, reRender, handleReRender}: MyPageProps) => {
	const [ open, setOpen ] = useState(false);
	const { id } = useParams(); // URLからidを取得
	const [ selectedUser, setSelectedUser ] = useState(false)
	
	// フォームを開ける処理
	const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setOpen(true);
		if(e) {
			e.currentTarget.blur();
		}
	}
	
	// フォームを閉じる処理
	const handleClose = () => {
		setOpen(false);
		setSelectedBird(undefined)
		setSelectedUser(false)
	}
	
	// ユーザー＋愛鳥さんの情報を取得
	useEffect(() => {
			    fetch(`http://localhost:8080/mypage/${id}`, {
					method: 'GET',
					credentials: 'include'
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
		<UserAndBirdInformation reRender={reRender} handleSelectedBird={handleSelectedBird} handleOpen={handleOpen} userBirds={userBirds} setSelectedUser={setSelectedUser} />
		
		<Button onClick={handleOpen}>愛鳥さんを追加する</Button>
		
		<Modal
		      open={open}
		      onClose={handleClose}
		  >
		  {selectedUser ? 
			<UserEditForm userBirds={userBirds} handleClose={handleClose} handleReRender={handleReRender} />
			:
			<BirdRegsterForm selectedBird={selectedBird} handleClose={handleClose} handleReRender={handleReRender} />
		  }
		</Modal>
		</>
	)
}

export default MyPage
