import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React from "react";
import { HomeScreen } from "../screens/homeScreen/HomeScreen";
import { JoinToListScreen } from "../screens/JoinToListScreen";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../styles/styles";
import { AccountScreen } from "../screens/AccountScreen";
import { NavigatorScreenParams } from "@react-navigation/native";
import {
	ListsTabParamList,
	UserNavigationList,
} from "../screens/userListsScreen/UserNavigationList";
import { Pressable, Text } from "react-native";
import { useAuthV2 } from "../providers/authV2/useAuthV2";

export type TabsParamList = {
	home: undefined;
	userLists: NavigatorScreenParams<ListsTabParamList>;
	joinToList: undefined;
	account: undefined;
};

const Tabs = createBottomTabNavigator<TabsParamList>();

export const NavigationBottomTabs = () => {
	const { onLogout } = useAuthV2();
	return (
		<Tabs.Navigator>
			<Tabs.Screen
				name="home"
				component={HomeScreen}
				options={{
					headerRight: () => {
						return (
							<Pressable
								onPress={onLogout}
								style={{
									marginRight: 10,
									padding: 4,
									paddingHorizontal: 8,
									flexDirection: "row",
									alignItems: "center",
									gap: 2,
									borderWidth: 1,
									borderColor: "black",
								}}
							>
								<Text style={{ fontSize: 14 }}>Wyloguj</Text>
							</Pressable>
						);
					},
					headerShadowVisible: false,
					headerTitle: "",
					title: "Home",
					tabBarActiveTintColor: COLORS.main,
					tabBarIcon: ({ color, size, focused }) => (
						<AntDesign
							color={focused ? COLORS.main : color}
							name="home"
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="userLists"
				component={UserNavigationList}
				options={{
					lazy: false, // https://github.com/react-navigation/react-navigation/issues/7698
					headerShown: false,
					title: "Listy",
					tabBarActiveTintColor: COLORS.main,
					tabBarIcon: ({ color, size, focused }) => (
						<AntDesign
							color={focused ? COLORS.main : color}
							name="book"
							size={size}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="joinToList"
				component={JoinToListScreen}
				options={{
					title: "Dołącz",
					tabBarActiveTintColor: COLORS.main,
					tabBarIcon: ({ color, size, focused }) => (
						<AntDesign
							color={focused ? COLORS.main : color}
							name="addfolder"
							size={size}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="account"
				component={AccountScreen}
				options={{
					title: "Konto",
					tabBarActiveTintColor: COLORS.main,
					tabBarIcon: ({ color, size, focused }) => (
						<AntDesign
							color={focused ? COLORS.main : color}
							name="user"
							size={size}
						/>
					),
				}}
			/>
		</Tabs.Navigator>
	);
};

// WCHODZĘ W APKĘ TO MAM JEDEN SCREEN

// LOGOWANIA - REJESTRACJA
