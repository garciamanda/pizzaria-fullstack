import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const { data } = await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(data);
      } catch (error) {
        console.error("Erro ao obter dados do usuário:", error);
        await refreshAccessToken();
      } finally {
        setLoading(false);
      }
    } else {
      await refreshAccessToken();
    }
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.post("/auth/refresh-token", { refreshToken });
      localStorage.setItem("accessToken", data.accessToken);
      setUserData(data);
    } catch (error) {
      console.error("Erro ao renovar o accessToken:", error);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
};
