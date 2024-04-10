import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { CustomButton } from "../../../../shared/customButton/CustomButton";
export const Main = () => {
	return (
		<View style={styles.wrapper}>
			<View style={styles.contentContainer}>
				<View style={styles.headings}>
					<Text style={styles.heading1}>Szybkie </Text>
					<Text style={styles.heading1}>zakupy</Text>
				</View>
				<CustomButton onPress={() => {}} title="Zaczynamy!" />
			</View>
			<View style={styles.imageContainer}>
				<Image
					style={styles.headerImage}
					source={require("../../../../assets/undraw_shopping_app_flsj.png")}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		padding: 12,
		marginTop: 10,
		flexDirection: "row",
	},
	contentContainer: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "center",
	},
	imageContainer: {
		flex: 1,
		justifyContent: "center",
		// backgroundColor: "red",
	},
	headings: {
		gap: 2,
	},
	heading1: {
		fontSize: 24,
		fontWeight: "600",
	},
	textCenter: {
		textAlign: "center",
	},
	headerImage: {
		width: 180,
		height: 150,
		resizeMode: "center",
	},
});
