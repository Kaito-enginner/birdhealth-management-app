import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

// User 型を定義
type User = {
  id: number;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};




export const ApiFetch = () => {
	const { id } = useParams(); // URLからidを取得
	const [user, setUser] = useState<User | null>(null);
	
	useEffect(() => {
	    fetch(`http://localhost:8080/mypage/${id}`) // IDを指定
	      .then((res) => {
				console.log(res)
				return res.json()
			})
	      .then((data) => {
			console.log(data)
				return setUser(data)
		  })
	      .catch(error => console.error("リクエストエラー:", error));
	}, []);
	
	return (
	    <div>
	      {user ? (
	        <>
	          <p>ID: {user.id}</p>
	          <p>Email: {user.email}</p>
	          <p>Created At: {user.createdAt}</p>
	          <p>Updated At: {user.updatedAt}</p>
	        </>
	      ) : (
	        <p>Loading...</p>
	      )}
	    </div>
	);
};