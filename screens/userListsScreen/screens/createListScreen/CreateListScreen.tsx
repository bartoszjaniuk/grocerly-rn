import React from "react";
import {
	View,
	StyleSheet,
	TouchableWithoutFeedback,
	Keyboard,
	Text,
	TouchableOpacity,
} from "react-native";
import { useForm, useFieldArray, Controller } from "react-hook-form";

import { CustomInput } from "../../../../shared/customInput/CustomInput";
import { CustomButton } from "../../../../shared/customButton/CustomButton";
import { AntDesign } from "@expo/vector-icons";
import RNPickerSelect from "react-native-picker-select";
import { CATEGORIES } from "../../../../constants";
import { getShadowByRadius } from "../../../../styles/styles";
import { useAssignNewProductsToCategory } from "./hooks/useAssignNewProductsToCategory";
import { categoriesEndpoints } from "../../../../api/categories";
import { useCreateList } from "./hooks/useCreateList";
import { useNavigateToCreatedList } from "./hooks/useNavigateToCreatedList";
import { useAxios } from "../../../../providers/axios/useAxios";

type FormData = {
	listTitle: string;
	articles: { title: string; categoryId: string }[];
};

export const CreateListScreen = () => {
	const { authAxios } = useAxios();
	useNavigateToCreatedList();

	const { saveProductsWithoutKnownCategory, assignProductToCategory } =
		useAssignNewProductsToCategory();

	const { mutate } = useCreateList();

	const { control, handleSubmit, reset, setValue } = useForm<FormData>({
		defaultValues: {
			listTitle: "",
			articles: [{ title: "", categoryId: "" }],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "articles",
	});

	const onSubmitForm = async (data: FormData) => {
		const assignedProducts = assignProductToCategory(data.articles);
		await categoriesEndpoints.updateCategoriesKeywords(
			authAxios,
			assignedProducts,
		);

		const articles = data.articles.map((article) => ({
			name: article.title,
			categoryId: article.categoryId,
		}));

		await mutate({
			name: data.listTitle,
			articles,
		});

		reset({
			listTitle: "",
			articles: [{ title: "", categoryId: "" }],
		});
	};

	const getCategoryByProductName = (productName: string) => {
		const foundCategory = CATEGORIES.find((category) =>
			category.keywords.some((keyword) =>
				productName.toLowerCase().includes(keyword.toLowerCase()),
			),
		);

		if (!foundCategory) {
			saveProductsWithoutKnownCategory(productName);
			console.log(`Nie znaleziono odpowiedniej kategorii dla ${productName}`);
		}

		return foundCategory;
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<View style={styles.wrapper}>
				<Controller
					control={control}
					name="listTitle"
					render={({ field: { onChange, onBlur, value } }) => (
						<CustomInput
							onChangeText={(value) => onChange(value)}
							onBlur={onBlur}
							value={value}
							placeholder="Nazwa listy"
							name="Nazwa Listy"
						/>
					)}
				/>

				<View style={{ gap: 12 }}>
					{fields.map((field, index) => {
						return (
							<View
								key={field.id}
								style={[
									getShadowByRadius(10),
									{
										flexDirection: "row",
										alignItems: "center",
										paddingHorizontal: 10,
									},
								]}
							>
								<View style={{ flex: 1, padding: 10 }}>
									<Controller
										control={control}
										name={`articles.${index}.title`}
										render={({ field: { onChange, onBlur, value } }) => (
											<View>
												<CustomInput
													name="Nazwa produktu"
													{...field}
													onChangeText={(value) => {
														const category = getCategoryByProductName(value);
														onChange(value);
														if (category)
															setValue(
																`articles.${index}.categoryId`,
																category.value,
															);
													}}
													onBlur={onBlur}
													value={value}
													placeholder={`Produkt ${index + 1}`}
												/>
											</View>
										)}
									/>
									<Controller
										control={control}
										name={`articles.${index}.categoryId`}
										render={({ field }) => (
											<RNPickerSelect
												placeholder={{ label: "Wybierz kategorię", value: "" }}
												style={{
													inputIOS: {
														color: "black",
														fontSize: 16,
														marginHorizontal: 4,
														marginVertical: 16,
														borderBottomWidth: 1,
														borderBottomColor: "black",
														flexDirection: "row",
														alignItems: "center",
														paddingBottom: 10,
														paddingLeft: 8,
													},
												}}
												onValueChange={(value) => field.onChange(value)}
												value={field.value}
												items={CATEGORIES}
											/>
										)}
									/>
								</View>
								<AntDesign
									style={{ padding: 6 }}
									size={24}
									name="delete"
									color="black"
									onPress={() => remove(index)}
								/>
							</View>
						);
					})}
				</View>

				<TouchableOpacity
					onPress={() => append({ title: "", categoryId: "" })}
					style={{
						paddingTop: 24,
						flexDirection: "row",
						justifyContent: "flex-end",
						alignItems: "center",
						// backgroundColor: "red",
						alignSelf: "flex-end",
					}}
				>
					<Text
						style={{ color: "gray", textTransform: "uppercase", fontSize: 12 }}
					>
						dodaj produkt
					</Text>
					<AntDesign size={16} name="plus" color="gray" />
				</TouchableOpacity>
				<View style={{ paddingTop: 16 }}>
					<CustomButton
						isFullWidth
						onPress={handleSubmit(onSubmitForm)}
						title="Utwórz listę"
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
