import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const register = async (name, email, password) => {
    const check = await api.get("/users", { params: { email } });
    if (check.data.length > 0) throw new Error("Email is already registered");
    await api.post("/users", { name, email, password });
  };

  const login = async (email, password) => {
    const res = await api.get("/users", { params: { email, password } });
    if (res.data.length === 0) throw new Error("Invalid email or password");
    // eslint-disable-next-line no-unused-vars
    const { password: _pw, ...safeUser } = res.data[0];
    setUser(safeUser);
    localStorage.setItem("user", JSON.stringify(safeUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
