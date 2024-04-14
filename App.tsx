import { StatusBar } from "expo-status-bar";

import { StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { AppProviders } from "./providers/AppProviders";
import { Screens } from "./screens/Screens";

export default function App() {
	return (
		<>
			<StatusBar style="auto" />
			<AppProviders>
				<Screens />
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
