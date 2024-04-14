import { CreateGroceryListPayload } from "../../../../../api/grocery";
import { useWebSocket } from "../../../../../providers/WebSocketProvider";

export const useCreateList = () => {
	const { socket } = useWebSocket();

	const mutate = async (payload: CreateGroceryListPayload) => {
		socket?.emit("addNewList", payload);
	};

	return { mutate };
};
