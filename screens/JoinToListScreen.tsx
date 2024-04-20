import React from "react";
import { View, Text, Button } from "react-native";
import * as Linking from "expo-linking";
import { inviteEndpoints } from "../api/invite";
import { useAxios } from "../providers/axios/useAxios";
import { AxiosInstance } from "axios";

// invite

const sendInvitationViaiMessage = (invitationLink: string) => {
	const message = `Join my grocery list: ${invitationLink}`;
	const url = `sms:?body=${encodeURIComponent(message)}`;

	Linking.canOpenURL(url)
		.then((supported) => {
			if (!supported) {
				console.log("Can't handle url: " + url);
			} else {
				return Linking.openURL(url);
			}
		})
		.catch((err) => console.error("An error occurred", err));
};

const handleAcceptInvitation = async (
	axios: AxiosInstance,
	event: { url: string },
) => {
	const { queryParams } = Linking.parse(event.url);
	const token = queryParams?.token as string;
	await inviteEndpoints.acceptInvitationToList(axios, token);
};

export const JoinToListScreen = () => {
	const { authAxios } = useAxios();
	Linking.addEventListener("url", (e) => handleAcceptInvitation(authAxios, e));
	const handleSendInvitation = async () => {
		const listId = "cluz6vv0d0004xisyzrqv904z";
		const userId = "clv0m7uts0000xuwu2dg8jqvy";
		const appUrl = "exp://192.168.0.13:8081";
		const link = await inviteEndpoints.inviteUserToList(authAxios, {
			listId,
			userId,
			appUrl,
		});

		console.log(link, "link");
		sendInvitationViaiMessage(link);
	};

	return (
		<View>
			<Text>HomeScreen</Text>

			<Button onPress={handleSendInvitation} title="Send link" />
		</View>
	);
};
