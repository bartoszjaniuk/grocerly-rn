import { AxiosInstance } from "axios";
import { createContext } from "react";

type AxiosContextType = {
	authAxios: AxiosInstance;
};

export const AxiosContext = createContext<AxiosContextType | undefined>(
	undefined,
);
