import axios from "axios";
import Cookies from "js-cookie";

const isAuthenticated = async (): Promise<boolean> => {
  const authToken = Cookies.get("auth_token");
  if (!authToken) return false;

  const response = await axios.get("https://dummyjson.com/auth/me", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (response.status !== 200) {
    Cookies.remove("auth_token");
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
      return true;
    }
  } catch (error) {
    console.error("Login error:", error);
  }

  return false;
};

export { isAuthenticated, login };
