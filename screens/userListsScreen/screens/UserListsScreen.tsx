import React from "react";
import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import { CustomSwipeable } from "../../../shared/swipeable/Swipeable";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ListsTabParamList } from "../UserNavigationList";
import { useFetchUserLists } from "../hooks/useFetchUserLists";
import { useWebSocket } from "../../../providers/WebSocketProvider";
import { useLists } from "../hooks/ws/useLists";

export const UserListsScreen = () => {
	const { socket } = useWebSocket();
	const lists = useLists(socket);

	// TODO: GET RID OF THAT AND ADD LOADING INTO WS
	const { data, isLoading } = useFetchUserLists();

	const navigation = useNavigation<NavigationProp<ListsTabParamList>>();

	const navigateToSingleList = (id: string) =>
		navigation.navigate("list", { id });

	const onSwipeRight = (groceryListId: string) =>
		socket?.emit("removeList", groceryListId);

	if (isLoading)
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);

	if (!lists.length)
		return (
			<View>
				<Text>Nie posiadasz jeszcze zadnej listy zakupów.</Text>
			</View>
		);

	return (
		<View style={styles.container}>
			<FlatList
				data={lists}
				keyExtractor={({ id }) => id}
				renderItem={({ item: { articles, name, id } }) => (
					<CustomSwipeable
						swipeableOpen={{ onSwipeRight: () => onSwipeRight(id) }}
					>
						<Pressable onPress={() => navigateToSingleList(id)}>
							<View style={styles.wrapper}>
								<Text style={styles.listTitle}>{name}</Text>
								<Text>Liczba artykułów: {articles?.length}</Text>
							</View>
						</Pressable>
					</CustomSwipeable>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	wrapper: {
		backgroundColor: "#fff",
		shadowColor: "#000000",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.16,
		shadowRadius: 1.51,
		elevation: 2,
		// borderRadius: 5,
		borderTopColor: "gray",
		borderTopWidth: 1,

		padding: 12,
		height: 80,
		gap: 10,
	},
	listTitle: {
		fontSize: 16,
		fontWeight: "700",
	},
});
