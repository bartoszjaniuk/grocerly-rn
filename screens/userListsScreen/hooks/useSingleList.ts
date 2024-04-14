import { useEffect, useState } from "react";
import { GroceryList, groceryEndpoints } from "../../../api/grocery";

export const useSingleList = (listId: string) => {
	const [data, setData] = useState<GroceryList>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const data = await groceryEndpoints.getListById(listId);
				setData(data);
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
