"use client";

import { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { getRequiredPermissions } from "@/utils/routePermissions";

export default function RouteAccessGuard({children}) {
    const {user, authReady} = useContext(AuthContext);
    const pathname = usePathname();
    const router = useRouter();

    const requiredPermissions = getRequiredPermissions(pathname);
    const userPermissions = Object.values(user?.permissions ?? {});
    const hasAccess = requiredPermissions !== null && (
        requiredPermissions.length === 0 ||
        requiredPermissions.some((permission) =>
            userPermissions.includes(permission)
        )
    );

    useEffect(() => {
        if (!authReady) return;

        if (!user) {
            router.replace("/login");
            return;
        }

        if (!hasAccess) {
            router.replace("/403");
        }
    }, [authReady, user, hasAccess, router]);

    if (!authReady || !user || !hasAccess) {
        return null;
    }

    return children;
}
