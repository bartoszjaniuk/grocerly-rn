import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";

export const useJoinToList = (socket: Socket | null, id: string) => {
	const [isFetching, setIsFetching] = useState(false);

	useEffect(() => {
		setIsFetching(true);
		if (isFetching && id) {
			socket?.emit("joinToList", id);
		}
	}, [isFetching, id, socket]);
};
