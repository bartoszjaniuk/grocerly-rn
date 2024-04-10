import React from "react";
import {
	Text,
	View,
	StyleSheet,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
	Pressable,
} from "react-native";
import { CustomInput } from "../shared/customInput/CustomInput";
import { AntDesign } from "@expo/vector-icons";
import { CustomButton } from "../shared/customButton/CustomButton";
import { AuthStackParamList } from "../navigation/NavigationForUnauthorizedUser";
import { StackScreenProps } from "@react-navigation/stack";

type Props = StackScreenProps<AuthStackParamList, "Register">;

export const RegisterScreen = ({ navigation }: Props) => {
	const handleRegister = () => {};

	const navigateToLogin = () => {
		navigation.navigate("Login");
	};
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
				<View style={styles.container}>
					<View style={styles.innerContainer}>
						<Text style={styles.heading}>REJESTRACJA</Text>
						<View style={styles.form}>
							<CustomInput
								placeholder="Email"
								icon={<AntDesign name="user" size={20} color="black" />}
							/>
							<CustomInput
								type="password"
								placeholder="Hasło"
								icon={<AntDesign name="lock" size={20} color="black" />}
							/>
							<CustomInput
								type="password"
								placeholder="Powtórz hasło"
								icon={<AntDesign name="lock" size={20} color="black" />}
							/>
						</View>
						<View>
							<View style={styles.note}>
								<Text>Masz juz konto?</Text>

								<Pressable onPress={navigateToLogin}>
									<Text style={styles.register}>Zaloguj się</Text>
								</Pressable>
							</View>
						</View>
						<CustomButton onPress={handleRegister} title="Załóz konto" />
					</View>
				</View>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
	},
	innerContainer: {
		// borderWidth: 1,
		// borderColor: "black",
		width: 300,
		height: 300,
		backgroundColor: "#fff",
	},
	heading: {
		textAlign: "center",
		fontWeight: "500",
		fontSize: 22,
	},
	form: {
		// borderWidth: 1,
		// borderColor: "black",
		paddingTop: 32,
	},
	note: {
		flexDirection: "row",
		gap: 4,
		justifyContent: "center",
	},
	register: {
		textDecorationLine: "underline",
	},
});
