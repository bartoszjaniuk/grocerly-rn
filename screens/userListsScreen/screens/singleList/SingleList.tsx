import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect } from "react";
import {
	FlatList,
	Text,
	View,
	StyleSheet,
	ActivityIndicator,
	Pressable,
} from "react-native";
import { ListsTabParamList } from "../../UserNavigationList";
import { useSingleList } from "../../hooks/useSingleList";
import { CustomSwipeable } from "../../../../shared/swipeable/Swipeable";
import { useWebSocket } from "../../../../providers/WebSocketProvider";
import { useJoinToList } from "../../hooks/ws/useJoinToList";
import { useArticles } from "../../hooks/ws/useArticles";
import { useCategories } from "../categoriesScreen/hooks/useCategories";
import { useListFromContext } from "../../../../providers/list/List";

type Props = StackScreenProps<ListsTabParamList, "list">;

export const SingleList = ({ navigation, route }: Props) => {
	const {
		data: categories,

		isLoading: areCategoriesLoading,
	} = useCategories();

	const groceryListId = route.params.id;
	const { data } = useSingleList(groceryListId);
	const { socket } = useWebSocket();
	useJoinToList(socket, groceryListId);

	const { articles, isLoading } = useArticles();

	const onSwipeRight = (articleId: string) =>
		socket?.emit("removeArticleFromList", { groceryListId, articleId });

	useEffect(() => {
		navigation.setOptions({
			title: data?.name,
			headerRight: ({}) => {
				return (
					<Pressable
						onPress={() =>
							navigation.navigate("updateList", { id: groceryListId })
						}
						style={{
							marginRight: 10,
							padding: 4,
							paddingHorizontal: 8,
							flexDirection: "row",
							alignItems: "center",
							gap: 2,
							borderWidth: 1,
							borderColor: "black",
						}}
					>
						<Text style={{ fontSize: 14 }}>Dodaj</Text>
					</Pressable>
				);
			},
		});
	}, [data]);
	if (isLoading)
		return (
			<View style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
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
			{areCategoriesLoading && (
				<View>
					<ActivityIndicator />
				</View>
			)}
			{!areCategoriesLoading && categories.length > 0 && (
				<View style={styles.categoryContainer}>
					<Text>Sortuj wg. kategorii:</Text>
					<View>
						<FlatList
							contentContainerStyle={{
								gap: 8,
								backgroundColor: "#fff",
								paddingBottom: 8,
							}}
							horizontal
							data={categories}
							keyExtractor={({ id }) => id}
							renderItem={({ item }) => (
								<View
									style={[
										styles.categoryWrapper,
										{ backgroundColor: item.color },
									]}
								>
									<Text style={styles.category}>{item.label}</Text>
								</View>
							)}
						/>
					</View>
				</View>
			)}
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
									alignItems: "flex-end",
								}}
							>
								<Text
									style={[styles.category, { backgroundColor: category.color }]}
								>
									{category.label}
								</Text>
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
		alignItems: "center",
	},
	listTitle: {
		fontSize: 16,
		fontWeight: "700",
	},
	categoryContainer: {
		padding: 12,
		backgroundColor: "#fff",
		gap: 12,
	},
	categoryWrapper: {
		borderRadius: 12,
		justifyContent: "center",
	},
	category: {
		fontSize: 14,
		fontWeight: "300",
		borderWidth: 1,
		borderColor: "black",
		padding: 8,
		borderRadius: 12,
	},
});
