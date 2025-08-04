import NavBar from "@/components/NavBar";
import { Navigate, Outlet, useLocation } from "react-router";
import { useUserStore } from "@/stores/user";
export default function HomeLayout() {
    const { pathname } = useLocation();
    const { token } = useUserStore();

    return (
        <div className="h-full flex items-stretch bg-background">
            {
                pathname === '/' &&
                <Navigate to="/app" replace />
            }
            {
                !token &&
                <Navigate to="/login" replace />
            }
            <NavBar />
            <div className="h-screen flex-1">
                <Outlet />
            </div>
        </div>
    );
}