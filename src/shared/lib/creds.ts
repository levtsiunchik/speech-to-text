import * as SecureStore from "expo-secure-store";

const KEY_ID = "cf_account_id";
const KEY_TOKEN = "cf_api_token";

export const saveCreds = async (id: string, token: string) => {
  await SecureStore.setItemAsync(KEY_ID, id.trim());
  await SecureStore.setItemAsync(KEY_TOKEN, token.trim());
};

export const getCreds = async () => {
  const id = await SecureStore.getItemAsync(KEY_ID);
  const token = await SecureStore.getItemAsync(KEY_TOKEN);
  return { id, token };
};

export const deleteCreds = async () => {
  await SecureStore.deleteItemAsync(KEY_ID);
  await SecureStore.deleteItemAsync(KEY_TOKEN);
};
