import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { COLORS } from "../../../../styles/styles";
import { useInvitations } from "../../hooks/useInvitations";
import { CustomButton } from "../../../../shared/customButton/CustomButton";
export const Invites = () => {
	const { data, error, isLoading, acceptInvite, rejectInvite } =
		useInvitations();

	return (
		<View style={styles.wrapper}>
			<View style={styles.header}>
				<Text style={styles.title}>Zaproszenia</Text>
			</View>

			<View style={styles.content}>
				{isLoading && <Text>Loading ...</Text>}
				{!isLoading && error && <Text>error goes here</Text>}
				{!data?.length && (
					<View style={{ padding: 12 }}>
						<Text>Nie masz jeszcze zadnych zaproszeń</Text>
					</View>
				)}
				{data?.length > 0 && (
					<FlatList
						contentContainerStyle={{
							gap: 16,
							backgroundColor: "#fff",
							padding: 12,
						}}
						data={data}
						keyExtractor={({ groceryList }) => groceryList.id}
						renderItem={({ item }) => (
							<View style={styles.singleInvite}>
								<View>
									<Text style={styles.inviteTitle}>
										{item.groceryList.name}
									</Text>
									<Text>
										Liczba artykułów: {item.groceryList.articles.length}
									</Text>
								</View>
								<View
									style={{
										gap: 8,
										flex: 1,
									}}
								>
									<CustomButton
										title="Akceptuj"
										isInverted
										onPress={async () =>
											await acceptInvite(item.groceryList.id)
										}
										otherStyles={{ padding: 4, paddingHorizontal: 12 }}
										isFullWidth
									/>
									<CustomButton
										title="Odrzuć"
										isInverted
										onPress={async () =>
											await rejectInvite(item.groceryList.id)
										}
										otherStyles={{ padding: 4, paddingHorizontal: 12 }}
										isFullWidth
									/>
								</View>
							</View>
						)}
					/>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		minHeight: 250,
		backgroundColor: COLORS.backgroundColor,
	},
	header: {
		width: "100%",
		backgroundColor: "black",
		justifyContent: "center",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 12,
	},
	title: {
		color: "#fff",
		fontSize: 24,
	},
	content: {
		backgroundColor: COLORS.backgroundColor,

		flex: 1,
	},
	singleInvite: {
		width: "100%",
		padding: 12,
		backgroundColor: COLORS.backgroundColor,

		shadowColor: "#000000",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.16,
		shadowRadius: 1.51,
		elevation: 2,
		borderRadius: 10,
		flex: 1,
		flexDirection: "row",
		gap: 32,
	},

	inviteTitle: {
		fontSize: 18,
		fontWeight: "600",
	},
});
