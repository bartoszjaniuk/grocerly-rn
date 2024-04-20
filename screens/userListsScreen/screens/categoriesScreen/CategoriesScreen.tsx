import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { useCategories } from "./hooks/useCategories";
import { COLORS } from "../../../../styles/styles";
import { Card } from "../../../homeScreen/components/card/Card";

export const CategoriesScreen = () => {
	const { data, error, isLoading } = useCategories();
	console.log({ error });

	if (isLoading)
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);

	if (!isLoading && error) {
		return (
			<View>
				<Text>error goes there</Text>
			</View>
		);
	}

	if (!data.length || data.length <= 0)
		return (
			<View>
				<Text>Nie posiadasz jeszcze zadnej listy zakupów.</Text>
			</View>
		);

	return (
		<View style={styles.container}>
			<FlatList
				data={data}
				keyExtractor={({ id }) => id}
				renderItem={({ item }) => (
					<Card>
						<Text>{item.label}</Text>
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
	},
});
