import React from "react";
import { Socket } from "socket.io-client";
import { Article } from "../../../../api/grocery";

export const useArticles = (socket: Socket | null) => {
	const [articles, setArticles] = React.useState<Article[]>([]);

	const articlesListener = React.useCallback((articles: Article[]) => {
		setArticles((prevArticles) => [...prevArticles, ...articles]);
	}, []);

	React.useEffect(() => {
		socket?.on("receiveList", articlesListener);

		return () => {
			socket?.off("receiveList", articlesListener);
		};
	}, [articlesListener, socket]);

	const removeArticleListener = React.useCallback(
		(removedArticleId: string) => {
			setArticles((articles) =>
				articles.filter((article) => article.id !== removedArticleId),
			);
		},
		[],
	);

	React.useEffect(() => {
		socket?.on("removedArticle", removeArticleListener);

		return () => {
			socket?.off("removedArticle", removeArticleListener);
		};
	}, [articlesListener, socket]);

	return articles;
};
