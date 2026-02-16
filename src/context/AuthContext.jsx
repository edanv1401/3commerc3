import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (username, password) => {
        // Mock login
        if (username && password) {
            setUser({ username, role: username === "admin" ? "admin" : "user" });
            return true;
        }
        return false;
    };

    const register = (username, password) => {
        // Mock register (auto login)
        setUser({ username, role: "user" });
        return true;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
