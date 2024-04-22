import { useEffect } from "react";
import { Socket } from "socket.io-client";

export const useJoinToList = (socket: Socket | null, id: string) => {
	useEffect(() => {
		console.log("JOIN TO LISTt");
		socket?.emit("joinToList", id);
	}, []);
};
