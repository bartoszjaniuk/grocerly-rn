import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { Socket, io } from "socket.io-client";
import { API_URL } from "../constants";
import { useAuthV2 } from "./authV2/useAuthV2";

type WebSocketState = {
	socket: Socket | null;
};

export const WebSocketContext = createContext<WebSocketState | undefined>(
	undefined,
);

export const useWebSocket = () => {
	const context = useContext(WebSocketContext);
	if (!context) {
		throw Error("No WebSocketProvider available");
	}
	return context;
};

export const WebSocketProvider = ({ children }: PropsWithChildren) => {
	const { authState } = useAuthV2();

	const [isFetching, setIsFetching] = useState(false);
	const [socket, setSocket] = useState<Socket | null>(null);

	useEffect(() => {
		if (!authState?.isAuthenticated) return;

		setIsFetching(true);
		const newSocket = io(API_URL, {
			withCredentials: true,
			extraHeaders: {
				authorization: authState.accessToken
					? `Bearer ${authState.accessToken}`
					: "",
			},
		});

		if (isFetching) {
			setSocket(newSocket);
		}
		return () => {
			newSocket.close();
		};
	}, [isFetching, authState?.isAuthenticated, authState.accessToken]);

	const value = useMemo(
		() => ({
			socket,
		}),
		[socket],
	);
	return (
		<WebSocketContext.Provider value={value}>
			{children}
		</WebSocketContext.Provider>
	);
};
