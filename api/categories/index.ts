import { api } from "..";
import { API_URL } from "../../constants";

type UpdateCategoriesKeywordsPayload = {
	[key: string]: string[];
};

const updateCategoriesKeywords = async (
	payload: UpdateCategoriesKeywordsPayload,
) => {
	await api.put(`${API_URL}/grocery/category/keywords`, payload);
};

export const categoriesEndpoints = { updateCategoriesKeywords };
