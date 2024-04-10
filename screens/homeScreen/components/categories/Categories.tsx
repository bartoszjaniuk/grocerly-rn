import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
export const Categories = () => {
	return (
		<View style={styles.wrapper}>
			<Text style={styles.heading5}>Sprawdź</Text>
			<Text style={styles.heading5}>kategorie</Text>
			<Image
				style={styles.image}
				source={require("../../../../assets/undraw_breakfast_psiw.png")}
			/>
		</View>
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
