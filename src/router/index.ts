import { createBrowserRouter } from "react-router";
import Login from "@/views/login/index.tsx";
import Home from "@/views/home/index.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        children: [
            { index: true, Component: Home },
        ],
    },
    { path: "login", Component: Login },
]);
