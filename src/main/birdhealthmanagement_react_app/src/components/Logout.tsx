export async function Logout() {
  const response = await fetch("http://localhost:8080/logout", {
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
