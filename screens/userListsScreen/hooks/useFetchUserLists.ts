import React, { useEffect, useState } from "react";
import { GetUserListsResponse, groceryEndpoints } from "../../../api/grocery";

export const useFetchUserLists = () => {
	const [data, setData] = useState<GetUserListsResponse[]>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const data = await groceryEndpoints.getUserLists();
				setData(data);
			} catch (error) {
				setError(error);
				console.log({ error });
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return { data, isLoading, error };
};
