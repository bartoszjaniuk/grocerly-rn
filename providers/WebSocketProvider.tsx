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
import { useAuth } from "./AuthProvider";

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
	const { isAuthenticated, accessToken } = useAuth();

	const [isFetching, setIsFetching] = useState(false);
	const [socket, setSocket] = useState<Socket | null>(null);
	// console.log({ isAuthenticated, socket });

	useEffect(() => {
		if (!isAuthenticated) return;

		setIsFetching(true);
		const newSocket = io(API_URL, {
			withCredentials: true,
			extraHeaders: {
				authorization: accessToken ? `Bearer ${accessToken}` : "",
			},
		});

		if (isFetching) {
			setSocket(newSocket);
		}
		return () => {
			newSocket.close();
		};
	}, [isFetching, isAuthenticated]);

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
