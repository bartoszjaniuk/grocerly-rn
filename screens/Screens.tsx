import { NavigationContainer } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { NavigationBottomTabs } from "../navigation/NavigationBottomTabs";
import { NavigationForUnauthorizedUser } from "../navigation/NavigationForUnauthorizedUser";
import * as SecureStore from "expo-secure-store";
import { StorageKeys } from "../service/jwtAsyncStorage";
import { useAuthV2 } from "../providers/authV2/useAuthV2";
import { Text, View } from "react-native";

export const Screens = () => {
	const { authState, setAuthState } = useAuthV2();
	const [appState, setAppState] = useState("loading");

	const loadJWT = useCallback(async () => {
		try {
			const accessToken = await SecureStore.getItemAsync(
				StorageKeys.ACCESS_TOKEN,
			);
			const refreshToken = await SecureStore.getItemAsync(
				StorageKeys.REFRESH_TOKEN,
			);

			setAuthState({
				accessToken: accessToken,
				refreshToken: refreshToken,
				isAuthenticated: accessToken !== null,
			});
			setAppState("success");
		} catch (error) {
			setAppState("error");
			setAuthState({
				accessToken: null,
				refreshToken: null,
				isAuthenticated: false,
			});
		}
	}, []);

	useEffect(() => {
		loadJWT();
	}, [loadJWT]);

	if (appState === "loading") {
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);
	}
	return (
		<NavigationContainer>
			{authState?.isAuthenticated && <NavigationBottomTabs />}
			{!authState?.isAuthenticated && <NavigationForUnauthorizedUser />}
		</NavigationContainer>
	);
};
