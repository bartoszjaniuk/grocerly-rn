import { useEffect, useState } from "react";
import { GroceryList, groceryEndpoints } from "../../../api/grocery";
import { useAxios } from "../../../providers/axios/useAxios";

export const useSingleList = (listId: string) => {
	const { authAxios } = useAxios();

	const [data, setData] = useState<GroceryList>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const data = await groceryEndpoints.getListById(authAxios, listId);
				setData(data.data);
			} catch (error) {
				console.log(error);
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return { data, isLoading, error };
};
