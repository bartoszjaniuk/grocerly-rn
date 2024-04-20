import { PropsWithChildren, useState } from "react";
import { AuthContextV2, AuthStateV2 } from "./AuthContextV2";
import * as SecureStore from "expo-secure-store";
import { StorageKeys } from "../../service/jwtAsyncStorage";
import { publicApiEndpoints } from "../../api/publicEndpoints";

type UserCredentials = {
	email: string;
	password: string;
};

export const AuthProviderV2 = ({ children }: PropsWithChildren) => {
	const [authState, setAuthState] = useState<AuthStateV2>({
		accessToken: null,
		refreshToken: null,
		isAuthenticated: false,
	});

	const onLogout = async () => {
		await SecureStore.deleteItemAsync(StorageKeys.REFRESH_TOKEN);
		await SecureStore.deleteItemAsync(StorageKeys.ACCESS_TOKEN);
		setAuthState({
			accessToken: null,
			refreshToken: null,
			isAuthenticated: false,
		});
	};

	const onLogin = async (userCredentials: UserCredentials) => {
		const res = await publicApiEndpoints.loginUser(userCredentials);

		const { access_token, refresh_token } = res.data;

		setAuthState({
			accessToken: access_token,
			refreshToken: refresh_token,
			isAuthenticated: true,
		});

		await SecureStore.setItemAsync(StorageKeys.ACCESS_TOKEN, access_token);
		await SecureStore.setItemAsync(StorageKeys.REFRESH_TOKEN, refresh_token);
	};

	const onRegister = async (userCredentials: UserCredentials) => {
		const response = await publicApiEndpoints.registerUser(userCredentials);

		const { access_token, refresh_token } = response.data;
		setAuthState({
			accessToken: access_token,
			refreshToken: refresh_token,
			isAuthenticated: true,
		});

		await SecureStore.setItemAsync(StorageKeys.ACCESS_TOKEN, access_token);
		await SecureStore.setItemAsync(StorageKeys.REFRESH_TOKEN, refresh_token);
	};

	const value = {
		authState,
		setAuthState,
		onLogout,
		onLogin,
		onRegister,
	};

	return (
		<AuthContextV2.Provider value={value}>{children}</AuthContextV2.Provider>
	);
};
