import * as SecureStore from "expo-secure-store"

const KEY = "CHAINREACT2019/CREDENTIALS"

/**
 * Saves some credentials securely.
 *
 * @param username The username
 * @param password The password
 * @param server The server these creds are for.
 */
export async function save(username: string, password: string) {
  return SecureStore.setItemAsync(KEY, JSON.stringify({ username, password }))
}

/**
 * Loads credentials that were already saved.
 *
 * @param server The server that these creds are for
 */
export async function load() {
  const rawCredentials = await SecureStore.getItemAsync(KEY)
  if (!rawCredentials) {
    return {
      username: null,
      password: null,
    }
  }

  return JSON.parse(rawCredentials)
}

/**
 * Resets any existing credentials for the given server.
 *
 * @param server The server which has these creds
 */
export async function reset() {
  return await SecureStore.deleteItemAsync(KEY)
}
