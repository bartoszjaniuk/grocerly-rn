import {
	Children,
	PropsWithChildren,
	createContext,
	useContext,
	useState,
} from "react";
import { Article } from "../../api/grocery";

type Props = {
	articles: Article[];
	setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
};

export const ListContext = createContext<Props | null>(null);

export const ListProvider = ({ children }: PropsWithChildren) => {
	const [articles, setArticles] = useState<Article[]>([]);
	const value = { articles, setArticles };
	return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export const useListFromContext = () => {
	const context = useContext(ListContext);

	if (!context) throw new Error("ListProvider must be wrapped around the app");
	return context;
};
