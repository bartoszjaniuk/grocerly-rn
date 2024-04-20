import { useContext } from "react";
import { AxiosContext } from "./AxiosContext";

export const useAxios = () => {
	const context = useContext(AxiosContext);

	if (!context) throw new Error("AxiosContext must me wrapped around app");

	return context;
};
