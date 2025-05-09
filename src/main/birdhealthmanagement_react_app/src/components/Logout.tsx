export async function Logout() {
	const BASE_URL = import.meta.env.VITE_API_BASE_URL;
	const response = await fetch(`${BASE_URL}/logout`, {
		method: "POST",
		credentials: "include", // Cookie送信
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		return true;
	} else {
		throw new Error("ログアウトに失敗しました");
	}
}
