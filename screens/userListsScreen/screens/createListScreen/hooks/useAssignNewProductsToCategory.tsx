import { useState } from "react";

type AssignProductToCategory = {
	title: string;
	category: string;
};

function groupItemsByCategory(
	items: AssignProductToCategory[],
): Record<string, string[]> {
	return items.reduce((acc, item) => {
		const key = item.category;
		if (!acc[key]) {
			acc[key] = [];
		}
		if (!acc[key].includes(item.title)) {
			acc[key].push(item.title);
		}
		return acc;
	}, {} as Record<string, string[]>);
}

export const useAssignNewProductsToCategory = () => {
	const [productsWithoutKnownCategory, setProductsWithoutKnownCategory] =
		useState<string[]>([]);
	const assignProductToCategory = (articles: AssignProductToCategory[]) => {
		let foundItems: AssignProductToCategory[] = [];
		productsWithoutKnownCategory.forEach((productName) => {
			const newProductWithSelectedCategory = articles.find(
				(article) => article.title === productName,
			);
			if (newProductWithSelectedCategory)
				foundItems.push(newProductWithSelectedCategory);
		});

		return groupItemsByCategory(foundItems);
	};

	const saveProductsWithoutKnownCategory = (productName: string) =>
		setProductsWithoutKnownCategory((prev) => [...prev, productName]);

	return { saveProductsWithoutKnownCategory, assignProductToCategory };
};
