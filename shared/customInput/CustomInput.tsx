import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	StyleSheet,
	TextInput,
	TextInputProps,
	View,
	Text,
} from "react-native";

type CustomInputProps = {
	icon?: JSX.Element;
	type?: "text" | "password" | "email";
	name?: string;
} & TextInputProps;

export const CustomInput = ({
	icon,
	type = "text",
	name,
	...props
}: CustomInputProps) => {
	const [showPassword, setShowPassword] = useState(false);
	const toggleShowPassword = () => setShowPassword((prev) => !prev);
	return (
		<View style={styles.inputContainer}>
			{icon}
			<Text
				style={{
					position: "absolute",
					top: "-30%",
					left: "3%",
					backgroundColor: "#fff",
				}}
			>
				{name}
			</Text>
			<TextInput
				placeholderTextColor="transparent"
				secureTextEntry={type === "password" && !showPassword}
				style={[styles.input, props.multiline && styles.inputMultiline]}
				{...props}
			/>
			{type === "password" && (
				<View style={styles.password}>
					{showPassword && (
						<AntDesign
							onPress={toggleShowPassword}
							name="eye"
							size={20}
							color="black"
						/>
					)}
					{!showPassword && (
						<AntDesign
							onPress={toggleShowPassword}
							name="eyeo"
							size={20}
							color="black"
						/>
					)}
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		marginHorizontal: 4,
		marginVertical: 16,
		// borderWidth: 1,
		// borderColor: "black",
		borderBottomWidth: 1,
		borderBottomColor: "black",
		flexDirection: "row",
		alignItems: "center",
		// paddingBottom: 4,
		// paddingLeft: 8,
		padding: 4,
		position: "relative",
	},
	input: {
		width: "100%",
		padding: 6,
		borderRadius: 6,
		fontSize: 14,
		color: "black",
		position: "relative",
		zIndex: 1,
	},
	inputMultiline: {
		minHeight: 100,
		textAlignVertical: "top",
	},
	password: {
		position: "absolute",
		right: 10,
		zIndex: 10,
	},
});
