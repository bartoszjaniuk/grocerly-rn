import { PropsWithChildren } from "react";
import { AxiosContext } from "./AxiosContext";
import axios from "axios";
import { API_URL } from "../../constants";
import { StorageKeys } from "../../service/jwtAsyncStorage";
import * as SecureStore from "expo-secure-store";
import { useAuthV2 } from "../authV2/useAuthV2";
import createAuthRefreshInterceptor from "axios-auth-refresh";

export const AxiosProvider = ({ children }: PropsWithChildren) => {
	const { authState, setAuthState } = useAuthV2();

	const authAxios = axios.create({
		baseURL: API_URL,
		withCredentials: true,
	});

	authAxios.interceptors.request.use(
		async (config) => {
			if (!config.headers.Authorization) {
				config.headers.Authorization = `Bearer ${authState?.accessToken}`;
			}
			return config;
		},
		(error) => {
			return Promise.reject(error);
		},
	);

	const refreshAuthLogic = async (failedRequest: any) => {
		const options = {
			method: "GET",
			url: `${API_URL}/auth/session`,
			withCredentials: true,
			headers: {
				Authorization: `Bearer ${authState?.refreshToken}`,
			},
		};
		return axios(options)
			.then(async (tokenRefreshResponse) => {
				failedRequest.response.config.headers.Authorization =
					"Bearer " + tokenRefreshResponse.data.access_token;

				setAuthState({
					isAuthenticated: true,
					refreshToken: tokenRefreshResponse.data.refresh_token,
					accessToken: tokenRefreshResponse.data.access_token,
				});

				await SecureStore.setItemAsync(
					StorageKeys.ACCESS_TOKEN,
					tokenRefreshResponse.data.access_token,
				);
				await SecureStore.setItemAsync(
					StorageKeys.REFRESH_TOKEN,
					tokenRefreshResponse.data.refresh_token,
				);

				return Promise.resolve();
			})
			.catch((e) => {
				setAuthState({
					isAuthenticated: false,
					accessToken: null,
					refreshToken: null,
				});
			});
	};

	createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {});

	const value = { authAxios };

	return (
		<AxiosContext.Provider value={value}>{children}</AxiosContext.Provider>
	);
};
