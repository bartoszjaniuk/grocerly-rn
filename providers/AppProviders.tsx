import React, { PropsWithChildren } from "react";
import { WebSocketProvider } from "./WebSocketProvider";
import { AuthProvider } from "./auth/AuthProvider";
import { AuthProviderV2 } from "./authV2/AuthProviderV2";
import { AxiosProvider } from "./axios/AxiosProvider";

export const AppProviders = ({ children }: PropsWithChildren) => {
	return (
		// <AuthProvider>
		// 	<WebSocketProvider>{children}</WebSocketProvider>
		// </AuthProvider>
		<AuthProviderV2>
			<AxiosProvider>
				<WebSocketProvider>{children}</WebSocketProvider>
			</AxiosProvider>
		</AuthProviderV2>
	);
};
