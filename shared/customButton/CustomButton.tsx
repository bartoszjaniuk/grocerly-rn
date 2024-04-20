import React from "react";
import {
	View,
	Pressable,
	Text,
	StyleSheet,
	ViewStyle,
	StyleProp,
} from "react-native";

type CustomButtonProps = {
	onPress: VoidFunction;
	title: string;
	isInverted?: boolean;
	isFullWidth?: boolean;
	otherStyles?: StyleProp<ViewStyle>;
};

const getStyles = (isInverted: boolean) =>
	isInverted ? stylesInverted : stylesDefault;

export const CustomButton = ({
	onPress,
	title,
	isInverted = false,
	isFullWidth = false,
	otherStyles,
}: CustomButtonProps) => {
	const styles = getStyles(isInverted);

	return (
		<View style={styles.wrapper}>
			<Pressable
				onPress={onPress}
				style={({ pressed }) => [
					styles.btn,
					pressed ? styles.btnOnPressed : null,
					isFullWidth ? { width: "100%", alignItems: "center" } : null,
					otherStyles,
				]}
			>
				{({ pressed }) => (
					<Text
						style={[
							styles.textButton,
							pressed ? styles.textButtonOnPressed : null,
						]}
					>
						{title}
					</Text>
				)}
			</Pressable>
		</View>
	);
};

const stylesInverted = StyleSheet.create({
	wrapper: {
		justifyContent: "center",
		alignItems: "center",
	},
	btn: {
		backgroundColor: "#fff",
		padding: 12,
		paddingHorizontal: 36,
		borderColor: "black",
		borderWidth: 1,
	},
	textButton: {
		color: "black",
		textTransform: "uppercase",
		fontWeight: "300",
	},

	textButtonOnPressed: {
		color: "#fff",
	},
	btnOnPressed: {
		backgroundColor: "black",
		borderWidth: 1,
		color: "#fff",
	},
});

const stylesDefault = StyleSheet.create({
	wrapper: {
		justifyContent: "center",
		alignItems: "center",
		paddingTop: 16,
		width: "100%",
	},
	btn: {
		backgroundColor: "black",
		padding: 12,
		paddingHorizontal: 36,
	},
	textButton: {
		color: "#fff",
		textTransform: "uppercase",
		fontWeight: "300",
	},
	textButtonOnPressed: {
		color: "black",
	},
	btnOnPressed: {
		backgroundColor: "#fff",
		borderWidth: 1,
		color: "black",
	},
});
