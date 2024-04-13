import React, { PropsWithChildren } from "react";
import { AuthProvider } from "./AuthProvider";
import { WebSocketProvider } from "./WebSocketProvider";

export const AppProviders = ({ children }: PropsWithChildren) => {
	return (
		<AuthProvider>
			<WebSocketProvider>{children}</WebSocketProvider>
		</AuthProvider>
	);
};
