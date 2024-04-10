import React, { PropsWithChildren } from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";

export const Card = ({
	children,
	style,
}: PropsWithChildren<{ style?: StyleProp<ViewStyle> }>) => {
	return <View style={[styles.wrapper, style]}>{children}</View>;
};

const styles = StyleSheet.create({
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
		borderRadius: 20,
	},
});
