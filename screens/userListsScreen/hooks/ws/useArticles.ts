import React, { useState } from "react";
import { Article } from "../../../../api/grocery";
import { useListFromContext } from "../../../../providers/list/List";
import { useWebSocket } from "../../../../providers/WebSocketProvider";

export const useArticles = () => {
	const { socket } = useWebSocket();
	const [isLoading, setIsLoading] = useState(false);
	const { articles, setArticles } = useListFromContext();

	const dataListener = React.useCallback((newData: Article[]) => {
		setArticles((prevData) => [...prevData, ...newData]);
		setIsLoading(false);
	}, []);

	React.useEffect(() => {
		if (articles.length > 0) return;
		setIsLoading(true);
		socket?.on("receiveList", dataListener);

		return () => {
			socket?.off("receiveList", dataListener);
		};
	}, [dataListener, socket]);

	const removeArticleListener = React.useCallback(
		({ articleId }: { articleId: string }) => {
			setArticles((articles) =>
				articles.filter((article) => article.id !== articleId),
			);
		},
		[],
	);

	React.useEffect(() => {
		socket?.on("removedArticle", removeArticleListener);

		return () => {
			socket?.off("removedArticle", removeArticleListener);
		};
	}, [removeArticleListener, socket]);

	return { articles, isLoading };
};
