import { AxiosInstance } from "axios";
import { API_URL } from "../../constants";

type UpdateCategoriesKeywordsPayload = {
	[key: string]: string[];
};

export type Category = {
	id: string;
	label: string;
	keywords: string[];
};

const updateCategoriesKeywords = async (
	api: AxiosInstance,
	payload: UpdateCategoriesKeywordsPayload,
) => {
	await api.put(`${API_URL}/grocery/category/keywords`, payload);
};

const getCategories = async (api: AxiosInstance) => {
	return await api.get<Category[]>(`${API_URL}/grocery/categories`);
};

export const categoriesEndpoints = { updateCategoriesKeywords, getCategories };
