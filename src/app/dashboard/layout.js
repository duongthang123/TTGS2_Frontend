import RouteAccessGuard from "@/components/guards/RouteAccessGuard";

export default function DashboardRouteLayout({children}) {
    return (
        <RouteAccessGuard>
            {children}
        </RouteAccessGuard>
    );
}
