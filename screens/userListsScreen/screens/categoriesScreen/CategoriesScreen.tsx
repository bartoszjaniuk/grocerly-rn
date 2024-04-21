import React from "react";
import {
	Text,
	View,
	StyleSheet,
	FlatList,
	ActivityIndicator,
	Pressable,
} from "react-native";
import { useCategories } from "./hooks/useCategories";
import { COLORS } from "../../../../styles/styles";
import { Card } from "../../../homeScreen/components/card/Card";
import { Category } from "../../../../api/categories";

export const CategoriesScreen = () => {
	const { data, error, isLoading } = useCategories();

	if (isLoading)
		return (
			<View style={{ flex: 1, justifyContent: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);

	if (!isLoading && error) {
		return (
			<View>
				<Text>An error has occured</Text>
			</View>
		);
	}

	if (!data.length || data.length <= 0)
		return (
			<View>
				<Text>Lista kategorii jest pusta</Text>
			</View>
		);

	return (
		<View style={styles.container}>
			<FlatList
				numColumns={2}
				data={data}
				keyExtractor={({ id }) => id}
				columnWrapperStyle={{
					justifyContent: "space-between",
					gap: 12,
					paddingVertical: 12,
				}}
				renderItem={({ item }) => (
					<Card
						style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
					>
						<CategoryItem category={item} />
					</Card>
				)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.backgroundColor,
		padding: 12,
		flex: 1,
	},
});

const CategoryItem = ({ category }: { category: Category }) => {
	return (
		<Pressable onPress={() => null} style={{ flex: 1 }}>
			<View style={styless.wrapper}>
				<Text style={styless.heading5}>{category.label}</Text>
			</View>
		</Pressable>
	);
};
const styless = StyleSheet.create({
	wrapper: {
		padding: 12,
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
	},
	heading5: {
		fontSize: 24,
		fontWeight: "400",
	},
});
