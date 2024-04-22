import { createStackNavigator } from "@react-navigation/stack";
import { Pressable, Text } from "react-native";
import { CategoriesScreen } from "../userListsScreen/screens/categoriesScreen/CategoriesScreen";
import { CreateListScreen } from "../userListsScreen/screens/createListScreen/CreateListScreen";
import { HomeScreen } from "./HomeScreen";
import { useAuthV2 } from "../../providers/authV2/useAuthV2";

export type HomeParamList = {
	homepage: undefined;
	create: undefined;
	categories: undefined;
};

const Stack = createStackNavigator<HomeParamList>();

export const HomeNavigationStack = () => {
	const { onLogout } = useAuthV2();

	return (
		<Stack.Navigator screenOptions={{ title: "", headerShadowVisible: false }}>
			<Stack.Screen
				name="homepage"
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
				}}
			/>

			<Stack.Screen
				name="create"
				component={CreateListScreen}
				options={{ title: "Tworzenie listy" }}
			/>

			<Stack.Screen
				name="categories"
				component={CategoriesScreen}
				options={{ title: "Dostępne kategorie" }}
			/>
		</Stack.Navigator>
	);
};
