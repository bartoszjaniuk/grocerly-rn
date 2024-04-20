import { useEffect, useState } from "react";
import { inviteEndpoints } from "../../../api/invite";
import { useAxios } from "../../../providers/axios/useAxios";

type Article = {
	id: string;
	name: string;
	groceryListId: string;
	categoryId: string;
};

type User = {
	id: string;
	email: string;
	avatar: string;
};

export type GroceryList = {
	id: string;
	name: string;
	articles: Article[];
	user: User;
};

export type Invite = {
	groceryList: GroceryList;
};

export const useInvitations = () => {
	const { authAxios } = useAxios();

	const [data, setData] = useState<Invite[] | []>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const data = await inviteEndpoints.getInvitationsList(authAxios);
				if (data) setData(data.data);
			} catch (error) {
				setError(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, []);

	const acceptInvite = async (groceryListId: string) => {
		await inviteEndpoints.acceptInvite(authAxios, groceryListId);
		setData((prevData) =>
			prevData.filter((item) => item.groceryList.id !== groceryListId),
		);
	};

	const rejectInvite = async (groceryListId: string) => {
		await inviteEndpoints.rejectInvite(authAxios, groceryListId);
		setData((prevData) =>
			prevData.filter((item) => item.groceryList.id !== groceryListId),
		);
	};

	return { data, isLoading, error, acceptInvite, rejectInvite };
};
