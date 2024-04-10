import axios from "axios";
import { API_URL } from "../constants";
import { jwtAsyncStorage } from "../service/jwtAsyncStorage";

export const api = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

api.interceptors.request.use(async (config) => {
	const token = await jwtAsyncStorage.getItem("ACCESS_TOKEN");
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
});

// TODO: REFRESH TOKEN
// api.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		const originalRequest = error.config;
// 		if (error.response.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true;

// 			try {
// 				const refreshToken = jwtAsyncStorage.getItem("REFRESH_TOKEN");
// 				const response = await axios.post("/api/refresh-token", {
// 					refreshToken,
// 				});
// 				const { access_token, refresh_token } = response.data;

// 				jwtAsyncStorage.setItem("ACCESS_TOKEN", access_token);
// 				jwtAsyncStorage.setItem("REFRESH_TOKEN", refresh_token);

// 				originalRequest.headers.Authorization = `Bearer ${access_token}`;
// 				return axios(originalRequest);
// 			} catch (error) {
// 				// Handle refresh token error or redirect to login
// 			}
// 		}
// 		return Promise.reject(error);
// 	},
// );

api.interceptors.response.use((response) => response.data);
