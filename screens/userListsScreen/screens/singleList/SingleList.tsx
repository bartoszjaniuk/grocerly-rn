import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import { FlatList, Text, View, StyleSheet, Alert } from "react-native";
import { ListsTabParamList } from "../../UserNavigationList";
import { useSingleList } from "../../hooks/useSingleList";
import { CustomSwipeable } from "../../../../shared/swipeable/Swipeable";
import { useWebSocket } from "../../../../providers/WebSocketProvider";
import { useJoinToList } from "../../hooks/ws/useJoinToList";
import { useArticles } from "../../hooks/ws/useArticles";

type Props = StackScreenProps<ListsTabParamList, "list">;

export const SingleList = ({ navigation, route }: Props) => {
	const groceryListId = route.params.id;
	const { data } = useSingleList(groceryListId);
	const { socket } = useWebSocket();
	useJoinToList(socket, groceryListId);

	const { data: articles, isLoading } = useArticles();

	const onSwipeRight = (articleId: string) =>
		socket?.emit("removeArticleFromList", { groceryListId, articleId });

	useEffect(() => {
		navigation.setOptions({
			title: data?.name,
		});
	}, [data]);
	if (isLoading)
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	if (!articles.length)
		return (
			<View>
				<Text>Wybrana lista jest pusta.</Text>
			</View>
		);

	return (
		<View style={styles.container}>
			<View style={styles.wrapper}>
				<Text>Sortuj wg. kategorii:</Text>
			</View>
			<FlatList
				data={articles}
				keyExtractor={({ id }) => id}
				renderItem={({ item: { name, id, category } }) => (
					<CustomSwipeable
						swipeableOpen={{ onSwipeRight: () => onSwipeRight(id) }}
					>
						<View style={styles.wrapper}>
							<Text style={styles.listTitle}>{name}</Text>
							<View
								style={{
									flex: 1,
									// backgroundColor: "purple",
									// alignSelf: "flex-end",
									alignItems: "flex-end",
								}}
							>
								<Text style={styles.category}>{category.label}</Text>
							</View>
						</View>
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
		borderTopColor: "gray",
		borderTopWidth: 1,
		padding: 12,
		height: 60,
		gap: 10,
		flexDirection: "row",
		// justifyContent: "space-evenly",
		alignItems: "center",
	},
	listTitle: {
		fontSize: 16,
		fontWeight: "700",
	},
	category: {
		fontSize: 12,
		borderWidth: 1,
		borderColor: "black",
		padding: 8,
		borderRadius: 12,
	},
});
