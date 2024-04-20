import { useState, useEffect } from "react";
import { Category, categoriesEndpoints } from "../../../../../api/categories";
import { useAxios } from "../../../../../providers/axios/useAxios";

export const useCategories = () => {
	const { authAxios } = useAxios();
	const [data, setData] = useState<Category[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const data = await categoriesEndpoints.getCategories(authAxios);
				setData(data);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	return { data, isLoading, error };
};
