import { JSX } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

const AdminAuth = ({ children }: { children: JSX.Element }) => {
	const { roleState } = useAuth();
	
	if(!roleState) return <Navigate to="/login" />;
	
	if(roleState !== "ROLE_ADMIN")return <Navigate to="/home" />;
	
	return children;
}

export default AdminAuth