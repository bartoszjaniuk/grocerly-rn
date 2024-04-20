import React, { useEffect, useState } from "react";
import { GetUserListsResponse, groceryEndpoints } from "../../../api/grocery";
import { useAxios } from "../../../providers/axios/useAxios";

export const useFetchUserLists = () => {
	const { authAxios } = useAxios();
	const [data, setData] = useState<GetUserListsResponse[]>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const data = await groceryEndpoints.getUserLists(authAxios);
				setData(data.data);
			} catch (error) {
				setError(error);
				console.log("useFetchUserLists error", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return { data, isLoading, error };
};
