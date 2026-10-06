import { useRole } from "@/hooks/useRole";

const RoleGuard = ({ roles, children }) => {
    const hasRole = useRole(roles);

    return hasRole ? children : null;
}

export default RoleGuard;