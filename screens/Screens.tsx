import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { NavigationBottomTabs } from "../navigation/NavigationBottomTabs";
import { NavigationForUnauthorizedUser } from "../navigation/NavigationForUnauthorizedUser";
import { useAuth } from "../providers/AuthProvider";

export const Screens = () => {
	const { accessToken } = useAuth();
	const isAuthorized = !!accessToken;
	return (
		<NavigationContainer>
			{isAuthorized && <NavigationBottomTabs />}
			{!isAuthorized && <NavigationForUnauthorizedUser />}
		</NavigationContainer>
	);
};
