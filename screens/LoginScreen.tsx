import React, { useState } from "react";
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
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "../navigation/NavigationForUnauthorizedUser";
import { useAuthV2 } from "../providers/authV2/useAuthV2";

type Props = StackScreenProps<AuthStackParamList, "Login">;

export const LoginScreen = ({ navigation }: Props) => {
	const { onLogin } = useAuthV2();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const handleLogin = async () => await onLogin?.({ email, password });

	const navigateToRegister = () => {
		navigation.navigate("Register");
	};

	const handleChangeEmail = (email: string) => setEmail(email);
	const handleChangePassword = (password: string) => setPassword(password);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
				<View style={styles.container}>
					<View style={styles.innerContainer}>
						<Text style={styles.heading}>LOGOWANIE</Text>
						<View style={styles.form}>
							<CustomInput
								value={email}
								onChangeText={handleChangeEmail}
								placeholder="Email"
								icon={<AntDesign name="user" size={20} color="black" />}
							/>
							<CustomInput
								value={password}
								onChangeText={handleChangePassword}
								type="password"
								placeholder="Hasło"
								icon={<AntDesign name="lock" size={20} color="black" />}
							/>
						</View>
						<View>
							<View style={styles.note}>
								<Text>Nie posiadasz konta?</Text>

								<Pressable onPress={navigateToRegister}>
									<Text style={styles.register}>Zarejestruj się</Text>
								</Pressable>
							</View>
						</View>
						<CustomButton onPress={handleLogin} title="Zaloguj się" />
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
