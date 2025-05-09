import { createContext, useContext, useState } from "react";

type AuthContextType = {
  roleState: string | null;
  setRole: (newRole: string | null) => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [roleState, setRoleState] = useState<string | null>(() => {
		return sessionStorage.getItem("role");
	});

	const setRole = (newRole: string | null) => {
		if (newRole) {
			sessionStorage.setItem("role", newRole);
		} else {
			sessionStorage.removeItem("role");
		}
		setRoleState(newRole);
	}

	return (
		<AuthContext.Provider value={{ roleState, setRole }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) throw new Error("AuthenticationManagementの中で使用してください。");
	return context;
};

export default AuthProvider