import { useContext } from "react";
import { AuthContextV2 } from "./AuthContextV2";

export const useAuthV2 = () => {
	const context = useContext(AuthContextV2);

	if (!context) throw new Error("AuthProviderV2 must me wrapped around app");

	return context;
};
