import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { getShadowByRadius } from "../../../../styles/styles";
export const Invites = () => {
	return (
		<View style={styles.wrapper}>
			<View style={styles.header}>
				<Text style={styles.title}>Zaproszenia</Text>
			</View>
			<View style={styles.content}>
				<View style={[styles.singleInvite, getShadowByRadius(10)]}>
					<Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit</Text>
				</View>

				<View style={[styles.singleInvite, getShadowByRadius(10)]}>
					<Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit</Text>
				</View>

				<View style={[styles.singleInvite, getShadowByRadius(10)]}>
					<Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		minHeight: 250,
	},
	header: {
		width: "100%",
		backgroundColor: "black",
		justifyContent: "center",
		// alignItems: "center",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 12,
	},
	title: {
		color: "#fff",
		fontSize: 24,
	},
	content: {
		padding: 12,
		gap: 8,
	},
	singleInvite: {
		width: "100%",
		padding: 12,
	},
});
