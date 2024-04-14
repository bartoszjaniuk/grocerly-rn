import { useNavigation, NavigationProp } from "@react-navigation/native";
import React from "react";
import { GroceryList } from "../../../../../api/grocery";
import { useWebSocket } from "../../../../../providers/WebSocketProvider";
import { ListsTabParamList } from "../../../UserNavigationList";

export const useNavigateToCreatedList = () => {
	const { socket } = useWebSocket();
	const navigation = useNavigation<NavigationProp<ListsTabParamList>>();

	const newArticleListener = React.useCallback((newList: GroceryList[]) => {
		navigation.navigate("list", { id: newList[0].id });
	}, []);

	React.useEffect(() => {
		socket?.on("updateList", newArticleListener);

		return () => {
			socket?.off("updateList", newArticleListener);
		};
	}, [newArticleListener, socket]);
};
