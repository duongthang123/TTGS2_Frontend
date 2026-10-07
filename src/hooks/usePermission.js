import {AuthContext} from "@/context/AuthContext";
import { useContext } from "react";

export const usePermission = (permissions) => {
    const {user} = useContext(AuthContext);
    const userPermissions = Object.values(user?.permissions ?? {});

    return permissions.some(permission => userPermissions.includes(permission));
}