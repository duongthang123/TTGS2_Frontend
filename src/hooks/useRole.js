import {AuthContext} from "@/context/AuthContext";
import { useContext } from "react";

export const useRole = (roles) => {
    const {user} = useContext(AuthContext);
    const userRoles = Object.values(user?.roles ?? {});

    return roles.some(role => userRoles.includes(role));
}