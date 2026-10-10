"use client";

import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AuthContext } from "./AuthContext";
import api from "@/services/api";

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [authReady, setAuthReady] = useState(() => !Cookies.get("access_token"));

    const refreshMe = useCallback(async () => {
        const response = await api.get("/me");
        setUser(response.data.user);
        return response.data.user;
    }, []);

    useEffect(() => {
        if (!Cookies.get("access_token")) return;

        Promise.resolve()
            .then(refreshMe)
            .catch((error) => {
                console.error("Unable to load the authenticated user:", error);
                Cookies.remove("access_token");
                setUser(null);
            })
            .finally(() => {
                setAuthReady(true);
            });
    }, [refreshMe]);

    return (
        <AuthContext.Provider value={{user, setUser, refreshMe, authReady}}>
            {children}
        </AuthContext.Provider>
    )
}