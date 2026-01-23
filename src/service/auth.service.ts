import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../store";
import { userSlice } from "../reducer/user.reducer";

const isAuthenticated = async (): Promise<boolean> => {
  const authToken = Cookies.get("auth_token");
  if (!authToken) return false;

  try {
    const response = await axios.get("https://dummyjson.com/auth/me", {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    store.dispatch(userSlice.actions.setUser(response.data));
    if (response.status !== 200) {
      Cookies.remove("auth_token");
      return false;
    }
  } catch (error) {
    Cookies.remove("auth_token");
    console.error("Authentication check error:", error);
    store.dispatch(userSlice.actions.setUser(null));
    return false;
  }

  return true;
};

const login = async (username: string, password: string) => {
  try {
    const response = await axios.post("https://dummyjson.com/auth/login", {
      username,
      password,
      expiresInMins: 30,
    });

    if (response.status === 200) {
      const { accessToken } = response.data;
      Cookies.set("auth_token", accessToken);
      store.dispatch(userSlice.actions.setUser(response.data));
      return true;
    }
  } catch (error) {
    console.error("Login error:", error);
  }

  return false;
};

const logout = () => {
  Cookies.remove("auth_token");
  store.dispatch(userSlice.actions.setUser(null));
};

export { isAuthenticated, login, logout };
