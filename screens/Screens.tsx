import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { NavigationBottomTabs } from "../navigation/NavigationBottomTabs";
import { NavigationForUnauthorizedUser } from "../navigation/NavigationForUnauthorizedUser";
import { useAuth } from "../providers/auth/useAuth";

export const Screens = () => {
	const { authState } = useAuth();
	return (
		<NavigationContainer>
			{authState?.isAuthenticated && <NavigationBottomTabs />}
			{!authState?.isAuthenticated && <NavigationForUnauthorizedUser />}
		</NavigationContainer>
	);
};
