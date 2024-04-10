import React from "react";
import { View, StyleSheet, Text } from "react-native";

export const CreateList = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Utwórz nową listę zakupów</Text>
			<View></View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {},
	heading: {
		fontSize: 28,
	},
});
