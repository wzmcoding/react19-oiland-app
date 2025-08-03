import { createBrowserRouter } from "react-router";
import NotFound from "@/views/errors/404";
import Login from "@/views/login/index.tsx";
import Home from "@/views/home/index.tsx";
import HomeLayout from "@/layout/home-layout";
import ClassRoom from "@/views/classroom/index.tsx";
import RealQuestion from "@/views/real-question/index.tsx";
import Course from "@/views/course/index.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            { path: 'app', Component: Home },
            { path: "classroom", Component: ClassRoom },
            { path: "real-question", Component: RealQuestion },
            { path: "course", Component: Course },
        ],
    },
    { path: "login", Component: Login },
    { path: "*", Component: NotFound },
]);
