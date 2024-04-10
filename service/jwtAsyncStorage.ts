import AsyncStorage from "@react-native-async-storage/async-storage";

export enum StorageKeys {
	ACCESS_TOKEN = "access_token",
	REFRESH_TOKEN = "refresh_token",
}

class JwtAsyncStorage {
	constructor() {}

	async getItem<T>(key: keyof typeof StorageKeys) {
		try {
			const value = await AsyncStorage.getItem(key);
			return (value ? (JSON.parse(value) as T) : value) as T | null;
		} catch (_) {
			return null;
		}
	}

	async setItem(key: keyof typeof StorageKeys, value: unknown) {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem(key, jsonValue);
		} catch (_) {
			return;
		}
	}

	async removeItem(key: keyof typeof StorageKeys) {
		try {
			await AsyncStorage.removeItem(key);
		} catch (_) {
			return;
		}
	}
}

export const jwtAsyncStorage = new JwtAsyncStorage();
