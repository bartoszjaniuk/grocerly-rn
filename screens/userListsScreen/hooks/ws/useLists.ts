import React from "react";
import { GroceryList } from "../../../../api/grocery";
import { useFetchFromWs } from "../../../../shared/hooks/useFetchFromWs";

export const useLists = () => {
	const { data, isLoading, setData, socket } =
		useFetchFromWs<GroceryList>("receiveUserLists");

	React.useEffect(() => {
		if (socket) socket.emit("getUserLists");

		return () => {
			setData([]);
		};
	}, [socket]);

	const removeArticleListener = React.useCallback(
		({
			articleId,
			groceryListId,
		}: {
			articleId: string;
			groceryListId: string;
		}) => {
			setData((prevLists) => {
				const listToUpdate = prevLists.find(
					(list) => list.id === groceryListId,
				);
				if (!listToUpdate) return prevLists;

				const updatedList = listToUpdate?.articles.filter(
					(article) => article.id !== articleId,
				);

				return prevLists.map((list) =>
					list.id === groceryListId ? { ...list, articles: updatedList } : list,
				);
			});
		},
		[],
	);

	React.useEffect(() => {
		socket?.on("removedArticle", removeArticleListener);

		return () => {
			socket?.off("removedArticle", removeArticleListener);
		};
	}, [removeArticleListener, socket]);

	const newArticleListener = React.useCallback((newLists: GroceryList[]) => {
		setData((prevlists) => [...prevlists, ...newLists]);
	}, []);

	React.useEffect(() => {
		socket?.on("updateList", newArticleListener);

		return () => {
			socket?.off("updateList", newArticleListener);
		};
	}, [newArticleListener, socket]);

	const deleteListListener = React.useCallback((groceryListId: string) => {
		setData((prevlists) =>
			prevlists.filter((list) => list.id !== groceryListId),
		);
	}, []);

	React.useEffect(() => {
		socket?.on("deleteList", deleteListListener);

		return () => {
			socket?.off("deleteList", deleteListListener);
		};
	}, [deleteListListener, socket]);

	return { isLoading, data, socket };
};
