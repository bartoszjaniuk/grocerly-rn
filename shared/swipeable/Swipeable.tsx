import React, { PropsWithChildren, ReactNode } from "react";
import {
	Text,
	View,
	StyleSheet,
	Animated,
	I18nManager,
	Alert,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { RectButton } from "react-native-gesture-handler";

type AnimatedInterpolation = ReturnType<Animated.Value["interpolate"]>;

export const renderLeftActions = (
	progress: AnimatedInterpolation,
	dragAnimatedValue: AnimatedInterpolation,
	swipeable: Swipeable,
): ReactNode => {
	// TODO: HOW TO USE THAT
	const scale = dragAnimatedValue.interpolate({
		inputRange: [0, 80],
		outputRange: [0, 1],
		extrapolate: "clamp",
	});
	return (
		<RectButton style={styles.leftAction} onPress={() => Alert.alert("elo")}>
			<Text>Edytuj listę</Text>
		</RectButton>
	);
};

const renderRightActions = (
	progress: AnimatedInterpolation,
	dragAnimatedValue: AnimatedInterpolation,
	swipeable: Swipeable,
) => {
	const scale = dragAnimatedValue.interpolate({
		inputRange: [-80, 0],
		outputRange: [1, 0],
		extrapolate: "clamp",
	});
	return (
		<RectButton style={styles.rightAction}>
			<Text>Usuń listę</Text>
		</RectButton>
	);
};

const handleSwipe = (
	direction: "left" | "right",
	swipeableOpen?: {
		onSwipeLeft?: VoidFunction;
		onSwipeRight?: VoidFunction;
	},
) => {
	if (direction === "right") swipeableOpen?.onSwipeRight?.();
	if (direction === "left") swipeableOpen?.onSwipeLeft?.();
};

type Props = {
	swipeableOpen?: {
		onSwipeLeft?: VoidFunction;
		onSwipeRight?: VoidFunction;
	};
};

export const CustomSwipeable = ({
	children,
	swipeableOpen,
}: PropsWithChildren<Props>) => {
	return (
		<Swipeable
			friction={2}
			leftThreshold={80}
			rightThreshold={41}
			renderLeftActions={(progress, dragAnimatedValue, swipeable) =>
				renderLeftActions(progress, dragAnimatedValue, swipeable)
			}
			renderRightActions={renderRightActions}
			onSwipeableOpen={(direction) => handleSwipe(direction, swipeableOpen)}
		>
			{children}
		</Swipeable>
	);
};

const styles = StyleSheet.create({
	listTitle: {
		fontSize: 16,
		fontWeight: "700",
	},
	rightAction: {
		alignItems: "center",
		flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
		backgroundColor: "#cc0000",
		flex: 1,
		paddingRight: 12,
		justifyContent: "flex-end",
	},

	leftAction: {
		flex: 1,
		backgroundColor: "blue",
		justifyContent: "flex-end",
		alignItems: "center",
		flexDirection: I18nManager.isRTL ? "row" : "row-reverse",
	},
});
