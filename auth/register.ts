import { API_URL } from "../constants";
import { api } from "../api";

type RegisterUserPayload = {
	email: string;
	password: string;
};

type RegisterResponse = {
	access_token: string;
	refresh_token: string;
	user: {
		email: string;
	};
};

export const registerUser = async (payload: RegisterUserPayload) => {
	const response: RegisterResponse = await api.post(
		`${API_URL}/auth/register`,
		{
			email: payload.email,
			password: payload.password,
		},
	);

	return response.access_token;
};
