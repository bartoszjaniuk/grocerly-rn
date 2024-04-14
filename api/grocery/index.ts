import { api } from "..";
import { API_URL } from "../../constants";

export type Article = {
	id: string;
	name: string;
	category: {
		id: string;
		label: string;
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

const getUserLists = async (): Promise<GetUserListsResponse[]> => {
	return await api.get(`${API_URL}/grocery`);
};

const getListById = async (id: string): Promise<GroceryList> => {
	return await api.get(`${API_URL}/grocery/${id}`);
};

const createGroceryList = async (
	payload: CreateGroceryListPayload,
): Promise<CreateGroceryListResponse> => {
	return await api.post(`${API_URL}/grocery`, payload);
};

export const groceryEndpoints = {
	getUserLists,
	getListById,
	createGroceryList,
};
