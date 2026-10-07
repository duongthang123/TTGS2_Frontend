import { usePermission } from "@/hooks/usePermission";

const PermissionGuard = ({ permissions, children }) => {
    const hasPermission = usePermission(permissions);

    return hasPermission ? children : null;
}

export default PermissionGuard;