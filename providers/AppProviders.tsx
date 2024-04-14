import React, { PropsWithChildren } from "react";
import { WebSocketProvider } from "./WebSocketProvider";
import { AuthProvider } from "./auth/AuthProvider";

export const AppProviders = ({ children }: PropsWithChildren) => {
	return (
		<AuthProvider>
			<WebSocketProvider>{children}</WebSocketProvider>
		</AuthProvider>
	);
};
