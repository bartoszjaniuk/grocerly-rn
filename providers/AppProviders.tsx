import React, { PropsWithChildren } from "react";
import { WebSocketProvider } from "./WebSocketProvider";
import { AuthProviderV2 } from "./authV2/AuthProviderV2";
import { AxiosProvider } from "./axios/AxiosProvider";
import { ListProvider } from "./list/List";

export const AppProviders = ({ children }: PropsWithChildren) => {
	return (
		// <AuthProvider>
		// 	<WebSocketProvider>{children}</WebSocketProvider>
		// </AuthProvider>
		<AuthProviderV2>
			<AxiosProvider>
				<WebSocketProvider>
					<ListProvider>{children}</ListProvider>
				</WebSocketProvider>
			</AxiosProvider>
		</AuthProviderV2>
	);
};
