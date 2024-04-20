import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../styles/styles";
import { Card } from "./components/card/Card";
import { Main } from "./components/main/Main";
import { Categories } from "./components/categories/Categories";
import { CreateList } from "./components/createList/CreateList";
import { Invites } from "./components/invites/Invites";

export const HomeScreen = () => {
	return (
		<View style={styles.container}>
			<Card>
				<Main />
			</Card>
			<View style={styles.twoCardsContainer}>
				<Card style={{ flex: 1 }}>
					<Categories />
				</Card>
				<Card style={{ flex: 1 }}>
					<CreateList />
				</Card>
			</View>
			<Card>
				<Invites />
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.backgroundColor,
		paddingHorizontal: 10,
		paddingVertical: 10,
		gap: 12,
	},
	twoCardsContainer: {
		flexDirection: "row",
		gap: 12,
	},
});
