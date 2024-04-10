import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { AuthStackParamList } from "../../../../navigation/NavigationForUnauthorizedUser";
import { TabsParamList } from "../../../../navigation/NavigationBottomTabs";

export const CreateList = () => {
	const navigation = useNavigation<NavigationProp<TabsParamList>>();
	const navigateToListCreation = () =>
		navigation.navigate("userLists", { screen: "create" });
	return (
		<Pressable style={styles.wrapper} onPress={navigateToListCreation}>
			<Text style={styles.heading5}>Utwórz</Text>
			<Text style={styles.heading5}>listę</Text>
			<Image
				style={styles.image}
				source={require("../../../../assets/undraw_Add_files_re_v09g.png")}
			/>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		padding: 12,
		marginTop: 10,
		gap: 4,
	},
	heading5: {
		fontSize: 20,
		fontWeight: "400",
	},
	image: {
		width: "100%",
		height: 100,
	},
});
