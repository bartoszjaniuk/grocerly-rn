import { createContext } from "react";

export type UserCredentials = {
	email: string;
	password: string;
};

export type AuthState = { token: string | null; isAuthenticated: boolean };

export type AuthContextType = {
	authState?: AuthState;
	onRegister?: (userCredentials: UserCredentials) => Promise<any>;
	onLogin?: (userCredentials: UserCredentials) => Promise<any>;
	onLogout?: () => Promise<any>;
};

export const AuthContext = createContext<AuthContextType>({});
