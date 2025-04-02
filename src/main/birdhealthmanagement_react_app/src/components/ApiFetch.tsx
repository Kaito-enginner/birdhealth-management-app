import { useState, useEffect } from "react";


export const ApiFetch = () => {
	const [user, setUser] = useState([]);

	useEffect(() => {
		// APIをfetchする(呼び出す)
		fetch("http://localhost:8080/mypage")
			// レスポンスのデータ形式をjsonに設定
			.then((res) => res.json())
			// APIから渡されるレスポンスデータ(data)をstateにセットする
			.then((data) => setUser(data))
			.catch(error => console.error('リクエストエラー:', error));
	}, []);

	return (
		<div>
		{user.map((obj) => {
			console.log(obj);
			return obj
		})}
		</div>
	);
};
