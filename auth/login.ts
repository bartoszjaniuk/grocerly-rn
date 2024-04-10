import axios from "axios";
import { API_URL } from "../constants";
import { api } from "../api";
import { jwtAsyncStorage } from "../service/jwtAsyncStorage";
// TODO: CREATE AXIOS INSTANCE WITH DEFAULT API URL

type LoginUserPayload = {
	email: string;
	password: string;
};

type LoginResponse = {
	access_token: string;
	refresh_token: string;
	user: {
		email: string;
	};
};

export const loginUser = async (payload: LoginUserPayload) => {
	const response: LoginResponse = await api.post(`${API_URL}/auth/login`, {
		email: payload.email,
		password: payload.password,
	});

	return response.access_token;
};
