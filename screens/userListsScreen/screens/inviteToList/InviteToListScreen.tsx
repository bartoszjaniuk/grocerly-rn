import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
	Keyboard,
	TouchableWithoutFeedback,
	View,
	StyleSheet,
} from "react-native";
import { CustomButton } from "../../../../shared/customButton/CustomButton";
import { CustomInput } from "../../../../shared/customInput/CustomInput";
import { StackScreenProps } from "@react-navigation/stack";
import { ListsTabParamList } from "../../UserNavigationList";
import { inviteEndpoints } from "../../../../api/invite";
import { useAxios } from "../../../../providers/axios/useAxios";

type FormData = {
	recipientEmail: string;
};

type Props = StackScreenProps<ListsTabParamList, "invite">;

export const InviteToListScreen = ({ route }: Props) => {
	const { authAxios } = useAxios();

	const groceryListId = route.params.id;
	const { control, handleSubmit, reset } = useForm<FormData>({
		defaultValues: {
			recipientEmail: "",
		},
	});

	const onSubmitForm = async (data: FormData) => {
		inviteEndpoints.sendInvitation(authAxios, {
			email: data.recipientEmail,
			groceryListId,
		});
		reset({
			recipientEmail: "",
		});
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.wrapper}>
				<Controller
					control={control}
					name="recipientEmail"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomInput
							onChangeText={(value) => onChange(value)}
							onBlur={onBlur}
							value={value}
							placeholder="Email"
							name="Email"
						/>
					)}
				/>

				<View style={{ paddingTop: 16 }}>
					<CustomButton
						isFullWidth
						onPress={handleSubmit(onSubmitForm)}
						title="Wyślij zaproszenie"
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 12,
	},
});
