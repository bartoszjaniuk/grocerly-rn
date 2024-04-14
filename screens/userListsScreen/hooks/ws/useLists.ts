import React from "react";
import { Socket } from "socket.io-client";
import { GroceryList } from "../../../../api/grocery";

export const useLists = (socket: Socket | null) => {
	const [lists, setLists] = React.useState<GroceryList[]>([]);

	const listsListener = React.useCallback((lists: GroceryList[]) => {
		setLists((prevlists) => [...prevlists, ...lists]);
	}, []);

	React.useEffect(() => {
		if (socket) socket.emit("getUserLists");

		return () => {
			setLists([]);
		};
	}, [socket]);

	React.useEffect(() => {
		socket?.on("receiveUserLists", listsListener);

		return () => {
			socket?.off("receiveUserLists", listsListener);
		};
	}, [listsListener, socket]);

	const removeArticleListener = React.useCallback(
		({
			articleId,
			groceryListId,
		}: {
			articleId: string;
			groceryListId: string;
		}) => {
			setLists((prevLists) => {
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
		setLists((prevlists) => [...prevlists, ...newLists]);
	}, []);

	React.useEffect(() => {
		socket?.on("updateList", newArticleListener);

		return () => {
			socket?.off("updateList", newArticleListener);
		};
	}, [newArticleListener, socket]);

	const deleteListListener = React.useCallback((groceryListId: string) => {
		setLists((prevlists) =>
			prevlists.filter((list) => list.id !== groceryListId),
		);
	}, []);

	React.useEffect(() => {
		socket?.on("deleteList", deleteListListener);

		return () => {
			socket?.off("deleteList", deleteListListener);
		};
	}, [deleteListListener, socket]);

	return lists;
};
