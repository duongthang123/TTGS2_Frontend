"use client";

import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import api from "@/services/api";

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/me");
                setUser(response.data.user);
            } catch {
                setUser(null);
            }
        }
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}