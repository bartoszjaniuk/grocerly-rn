// PUBLIC ENDPOINTS

import axios from "axios";
import { API_URL } from "../../constants";

export type LoginUserPayload = {
	email: string;
	password: string;
};

export type LoginResponse = {
	access_token: string;
	refresh_token: string;
	user: {
		email: string;
	};
};

export type RegisterUserPayload = {
	email: string;
	password: string;
};

export type RegisterResponse = {
	access_token: string;
	refresh_token: string;
	user: {
		email: string;
	};
};

const api = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

const loginUser = async (payload: LoginUserPayload) => {
	const response = await api.post<LoginResponse>(`${API_URL}/auth/login`, {
		email: payload.email,
		password: payload.password,
	});

	return response;
};

const registerUser = async (payload: RegisterUserPayload) => {
	const response = await api.post<RegisterResponse>(
		`${API_URL}/auth/register`,
		{
			email: payload.email,
			password: payload.password,
		},
	);

	return response;
};

export const publicApiEndpoints = {
	loginUser,
	registerUser,
};
