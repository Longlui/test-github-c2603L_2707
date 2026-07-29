import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export default function useAuth() {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem("user") || "null")
  );


  const logout = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    setUser(null);
  }, []);


  useEffect(() => {
    window.addEventListener("auth:expired",logout);

    return () => {
      window.removeEventListener("auth:expired",logout);
    };
  }, [logout]);


  const login = async (username, password) => {

    try {
      const { data } = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username,
          password,
        }
      );


      localStorage.setItem("accessToken",data.accessToken);
      localStorage.setItem("user",JSON.stringify(data));
      setUser(data);
      return data;

    } catch (err) {

      return null;

    }
  };


  return {
    user,
    login,
    logout,
  };
}