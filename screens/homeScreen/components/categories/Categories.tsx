import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { ListsTabParamList } from "../../../userListsScreen/UserNavigationList";
export const Categories = () => {
	const navigation = useNavigation<NavigationProp<ListsTabParamList>>();

	const handleNavigateToCategories = () => navigation.navigate("categories");
	return (
		<Pressable onPress={handleNavigateToCategories}>
			<View style={styles.wrapper}>
				<Text style={styles.heading5}>Sprawdź</Text>
				<Text style={styles.heading5}>kategorie</Text>
				<Image
					style={styles.image}
					source={require("../../../../assets/undraw_breakfast_psiw.png")}
				/>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		padding: 12,
		marginTop: 10,
		gap: 4,
	},
	heading5: {
		fontSize: 20,
		fontWeight: "400",
	},
	image: {
		width: "100%",
		height: 100,
	},
});
