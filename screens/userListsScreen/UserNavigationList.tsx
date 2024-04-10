import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { View, Text, Pressable } from "react-native";
import { AddArticlesToListScreen } from "./screens/AddArticlesToList";
import { UserListsScreen } from "./screens/UserListsScreen";
import { AntDesign } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CreateListScreen } from "./screens/createListScreen/CreateListScreen";

export type ListsTabParamList = {
	home: undefined;
	create: undefined;
	addArticles: undefined;
};

const Stack = createStackNavigator<ListsTabParamList>();

export const UserNavigationList = () => {
	const navigation = useNavigation<NavigationProp<ListsTabParamList>>();
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="home"
				component={UserListsScreen}
				options={{
					title: "Listy",
					headerRight: () => {
						return (
							<Pressable
								onPress={() => navigation.navigate("create")}
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
								<Text style={{ fontSize: 12 }}>UTWÓRZ</Text>
								<AntDesign name="plus" size={12} color="black" />
							</Pressable>
						);
					},
				}}
			/>
			<Stack.Screen
				name="create"
				component={CreateListScreen}
				options={{ title: "Tworzenie listy" }}
			/>
			{/* TODO: NAVIAGTION */}
			<Stack.Screen name="addArticles" component={AddArticlesToListScreen} />
		</Stack.Navigator>
	);
};
