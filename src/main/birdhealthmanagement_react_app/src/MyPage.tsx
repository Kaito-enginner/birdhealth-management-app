import { useState, useEffect } from "react";
import BirdRegsterForm from './components/form/BirdRegisterForm';
import PassWordEditForm from './components/form/PassWordEditForm';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { BirdFormType, UserBirdDto } from "./type/type";
import { UserAndBirdInformation } from "./components/UserAndBirdInformation";
import UserEditForm from "./components/form/UserEditForm";

interface MyPageProps {
	handleSelectedBird: (bird: BirdFormType) => void;
	selectedBird: BirdFormType | undefined;
	setSelectedBird: React.Dispatch<React.SetStateAction<BirdFormType | undefined>>;
	userBirds: UserBirdDto | undefined;
	setUserBirds: React.Dispatch<React.SetStateAction<UserBirdDto | undefined>>;
	reRender: boolean;
	handleReRender: () => void;
}

const MyPage = ({ handleSelectedBird, selectedBird, setSelectedBird, userBirds, setUserBirds, reRender, handleReRender }: MyPageProps) => {
	const BASE_URL = import.meta.env.VITE_API_BASE_URL;
	const [open, setOpen] = useState(false);
	const [selectedUserEdit, setSelectedUserEdit] = useState(false)
	const [selectedPasswordEdit, setSelectedPasswordEdit] = useState(false);

	// フォームを開ける処理
	const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setOpen(true);
		if (e) {
			e.currentTarget.blur();
		}
	}

	// フォームを閉じる処理
	const handleClose = () => {
		setOpen(false);
		setSelectedBird(undefined)
		setSelectedUserEdit(false)
		setSelectedPasswordEdit(false)
	}

	// ユーザー＋愛鳥さんの情報を取得
	useEffect(() => {
		fetch(`${BASE_URL}/api/mypage`, {
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

	const formSelect = () => {
		if (selectedUserEdit) {
			return <UserEditForm userBirds={userBirds} handleClose={handleClose} handleReRender={handleReRender} />
		} else if (selectedPasswordEdit) {
			return <PassWordEditForm handleClose={handleClose} />
		} else {
			return <BirdRegsterForm selectedBird={selectedBird} handleClose={handleClose} handleReRender={handleReRender} />
		}
	}

	return (
		<>
			<UserAndBirdInformation
				reRender={reRender}
				handleSelectedBird={handleSelectedBird}
				handleOpen={handleOpen} userBirds={userBirds}
				setSelectedUserEdit={setSelectedUserEdit}
				setSelectedPasswordEdit={setSelectedPasswordEdit}
			/>

			<Button onClick={handleOpen}>愛鳥さんを追加する</Button>

			<Modal open={open} onClose={handleClose}>
				{formSelect()}
			</Modal>
		</>
	)
}

export default MyPage
