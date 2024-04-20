import { AxiosInstance } from "axios";
import { API_URL } from "../../constants";

type InviteUserPayload = {
	userId: string;
	listId: string;
	appUrl: string;
};

type InviteUserByEmailPayload = {
	email: string;
	groceryListId: string;
};

const inviteUserToList = async (
	api: AxiosInstance,
	payload: InviteUserPayload,
): Promise<string> => {
	return await api.post(`${API_URL}/invite/list`, payload);
};

const acceptInvitationToList = async (
	api: AxiosInstance,
	param: string,
): Promise<string> => {
	return await api.post(`${API_URL}/invite/${param}`, {});
};

const inviteToListByEmail = async (
	api: AxiosInstance,
	payload: InviteUserByEmailPayload,
) => {
	return await api.post(`${API_URL}/invite/byEmail`, payload);
};

const sendInvitation = async (
	api: AxiosInstance,
	payload: InviteUserByEmailPayload,
) => {
	return await api.post(`${API_URL}/invite`, payload);
};

const getInvitationsList = async (api: AxiosInstance) => {
	return await api.get(`${API_URL}/invite`);
};

const acceptInvite = async (api: AxiosInstance, groceryListId: string) => {
	return await api.post(`${API_URL}/invite/accept`, { groceryListId });
};

const rejectInvite = async (api: AxiosInstance, groceryListId: string) => {
	return await api.post(`${API_URL}/invite/reject`, { groceryListId });
};

export const inviteEndpoints = {
	inviteUserToList,
	acceptInvitationToList,
	inviteToListByEmail,
	sendInvitation,
	getInvitationsList,
	acceptInvite,
	rejectInvite,
};
