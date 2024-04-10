export const COLORS = {
	main: "black",
	inverted: "#fff",
	backgroundColor: "#fff",
	invertedBackgroundColor: "black",
};

export const getShadowByRadius = (borderRadius: number = 20) => {
	return {
		backgroundColor: "#fff",
		shadowColor: "#000000",
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowOpacity: 0.16,
		shadowRadius: 1.51,
		elevation: 2,
		borderRadius,
	};
};
