import NavBar from "@/components/NavBar";
import { Outlet, Navigate } from "react-router";

export default function HomeLayout() {
    return (
        <div className="h-full flex items-stretch bg-background">
            <Navigate to="/app" replace />
            <NavBar />
            <div className="h-screen flex-1">
                <Outlet />
            </div>
        </div>
    );
}