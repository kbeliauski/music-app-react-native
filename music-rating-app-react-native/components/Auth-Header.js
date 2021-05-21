import * as SecureStore from 'expo-secure-store';

export default async function authHeader() {

    const user = JSON.parse(await SecureStore.getItemAsync("user"));
    console.log("USER IS : " + user)

    if (user && user.token) {
      console.log("auth header: " + user.token)
      return { Authorization : `JWT  ${user.token}` };

    } else return {};
}
