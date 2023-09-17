import * as SecureStore from 'expo-secure-store';
import { SecureStoreOptions } from 'expo-secure-store';

export async function setItemAsync(key: string, value: string, options?: SecureStoreOptions | undefined) {
  await SecureStore.setItemAsync(key, value, options);
}

export async function getItemAsync(key: string, options?: SecureStoreOptions | undefined) {
  return SecureStore.getItemAsync(key, options);
}

export async function deleteItemAsync(key: string, options?: SecureStoreOptions | undefined) {
  return SecureStore.deleteItemAsync(key, options);
}
