import { StatusBar } from "expo-status-bar";

import { StyleSheet } from "react-native";
import React from "react";
import { AppProviders } from "./providers/AppProviders";
import { Screens } from "./screens/Screens";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
	return (
		<>
			<StatusBar style="auto" />
			<AppProviders>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<Screens />
				</GestureHandlerRootView>
			</AppProviders>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
// user@user.com
// password
// exp://192.168.0.13:8081/?token=clv0m7uts0000xuwu2dg8jqvy-clv0vrb4u0000mi9e9x3l65cf

// TODO: jeśli lista jest pusta to przy usuwaniu ostatenigo produktu usun listę.
// TODO: dodanie listy kategorii
// TODO: edycja listy (dodanie artykułów)
