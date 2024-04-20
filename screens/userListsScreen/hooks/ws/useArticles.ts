import React from "react";
import { Article } from "../../../../api/grocery";
import { useFetchFromWs } from "../../../../shared/hooks/useFetchFromWs";

export const useArticles = () => {
	const { data, isLoading, socket, setData } =
		useFetchFromWs<Article>("receiveList");

	const removeArticleListener = React.useCallback(
		({ articleId }: { articleId: string }) => {
			setData((articles) =>
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

	return { data, isLoading };
};
