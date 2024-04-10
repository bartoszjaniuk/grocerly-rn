import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { jwtAsyncStorage } from "../service/jwtAsyncStorage";

type AuthContextType =
	| {
			accessToken?: string;
			onAuthenticate: (token: string) => void;
	  }
	| undefined;

export const AuthContext = createContext<AuthContextType>(undefined);

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [accessToken, setAccessToken] = useState<string | undefined>(undefined);

	useEffect(() => {
		const fetchToken = async () => {
			const token: string | undefined | null = await jwtAsyncStorage.getItem(
				"ACCESS_TOKEN",
			);
			if (token) setAccessToken(token);
		};

		fetchToken();
	}, []);

	const onAuthenticate = (token: string) => {
		setAccessToken(token);
		jwtAsyncStorage.setItem("ACCESS_TOKEN", token);
	};

	const value = useMemo(
		() => ({
			accessToken,
			onAuthenticate,
		}),
		[accessToken],
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) throw new Error("AuthProvider must me wrapped around app");

	return context;
};
