import React, { PropsWithChildren, useEffect, useMemo, useState } from "react";
import * as SecureStore from "expo-secure-store";

import {
	AuthContext,
	AuthContextType,
	AuthState,
	UserCredentials,
} from "./AuthContext";
import { loginUser } from "../../auth/login";
import { registerUser } from "../../auth/register";
import { StorageKeys } from "../../service/jwtAsyncStorage";

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [authState, setAuthState] = useState<AuthState>({
		token: null,
		isAuthenticated: false,
	});

	useEffect(() => {
		const loadToken = async () => {
			const token = await SecureStore.getItemAsync(StorageKeys.ACCESS_TOKEN);
			if (token)
				setAuthState({
					token,
					isAuthenticated: true,
				});
		};
		loadToken();
	}, []);

	const onLogin = async (userCredentials: UserCredentials) => {
		const token = await loginUser(userCredentials);
		setAuthState({
			token,
			isAuthenticated: true,
		});

		await SecureStore.setItemAsync(StorageKeys.ACCESS_TOKEN, token);
	};

	const onLogout = async () => {
		await SecureStore.deleteItemAsync(StorageKeys.ACCESS_TOKEN);
		setAuthState({ token: null, isAuthenticated: false });
	};

	const onRegister = async (userCredentials: UserCredentials) => {
		const token = await registerUser(userCredentials);
		setAuthState({
			token,
			isAuthenticated: true,
		});
	};

	// const value: AuthContextType = useMemo(
	// 	() => ({
	// 		onLogin,
	// 		onRegister,
	// 		onLogout,
	// 		authState,
	// 	}),
	// 	[],
	// );

	const value: AuthContextType = {
		onLogin,
		onRegister,
		onLogout,
		authState,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
