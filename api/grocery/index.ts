import { AxiosInstance } from "axios";
import { API_URL } from "../../constants";

export type Article = {
	id: string;
	name: string;
	category: {
		id: string;
		label: string;
		color: string;
	};
};

export type GetUserListsResponse = {
	id: string;
	name: string;
	articles: Article[];
};

export type GroceryList = {
	id: string;
	name: string;
	articles: Article[];
};

export type CreateGroceryListPayload = {
	name: string;
	articles: { name: string; categoryId: string }[];
};

export type CreateGroceryListResponse = {
	id: string;
	userId: string;
	groceryListId: string;
};

const getUserLists = async (api: AxiosInstance) => {
	return await api.get<GetUserListsResponse[]>(`${API_URL}/grocery`);
};

const getListById = async (api: AxiosInstance, id: string) => {
	return await api.get<GroceryList>(`${API_URL}/grocery/${id}`);
};

const createGroceryList = async (
	api: AxiosInstance,
	payload: CreateGroceryListPayload,
): Promise<CreateGroceryListResponse> => {
	return await api.post(`${API_URL}/grocery`, payload);
};

export const groceryEndpoints = {
	getUserLists,
	getListById,
	createGroceryList,
};
