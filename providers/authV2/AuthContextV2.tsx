import { createContext } from "react";

export type UserCredentialsV2 = {
	email: string;
	password: string;
};

export type AuthStateV2 = {
	accessToken: string | null;
	refreshToken: string | null;
	isAuthenticated: boolean;
};

export type AuthContextTypeV2 = {
	authState: AuthStateV2;
	setAuthState: React.Dispatch<React.SetStateAction<AuthStateV2>>;
	onRegister: (userCredentials: UserCredentialsV2) => Promise<any>;
	onLogin: (userCredentials: UserCredentialsV2) => Promise<any>;
	onLogout: () => Promise<any>;
};

export const AuthContextV2 = createContext<AuthContextTypeV2 | undefined>(
	undefined,
);
