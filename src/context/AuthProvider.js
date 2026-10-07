"use client";

import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext";
import api from "@/services/api";

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const refreshMe = useCallback(async () => {
        const response = await api.get("/me");
        setUser(response.data.user);
        return response.data.user;
    }, []);

    useEffect(() => {
        if (!Cookies.get("access_token")) return;

        refreshMe().catch(() => {});
    }, [refreshMe]);

    return (
        <AuthContext.Provider value={{user, setUser, refreshMe}}>
            {children}
        </AuthContext.Provider>
    )
}