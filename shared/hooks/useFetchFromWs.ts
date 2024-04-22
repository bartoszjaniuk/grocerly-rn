import React, { useState } from "react";
import { useWebSocket } from "../../providers/WebSocketProvider";

export const useFetchFromWs = <T>(wsTargetName: string) => {
	const { socket } = useWebSocket();

	const [data, setData] = useState<T[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	const dataListener = React.useCallback((newData: T[]) => {
		setData((prevData) => [...prevData, ...newData]);
		setIsLoading(false);
	}, []);

	React.useEffect(() => {
		if (data.length > 0) return;
		setIsLoading(true);
		socket?.on(wsTargetName, dataListener);

		return () => {
			socket?.off(wsTargetName, dataListener);
		};
	}, [dataListener, socket]);

	return { data, isLoading, socket, setData };
};
