import React from "react";
import User from "@/components/User";
import { useLocation, Link } from "react-router";
import imgLogoText from "@/assets/logo-text.svg";

const nav = [
    {
        icon: '/menu/level.svg',
        label: '首页',
        value: '/',
    },
    {
        icon: '/menu/classroom.png',
        label: '小帕课堂',
        value: '/classroom',
    },
    {
        icon: '/menu/real.png',
        label: '真题练习',
        value: '/real-question',
    },
    {
        icon: '/menu/coursework.png',
        label: '课程作业',
        value: '/course',
    },
];

const NavBar: React.FC = () => {
    const location = useLocation();

    const isActive = (value: string) => location.pathname.startsWith(value);

    return (
        <nav className="h-screen w-62 flex flex-col justify-between border-r border-secondary-foreground/9 border-solid px-3.5 pt-7">
            <div>
                <div className="mb-5 cursor-pointer">
                    <img className="h-7.5 w-37" src={imgLogoText} alt="logo" />
                </div>
                {nav.map((item, index) => (
                    <Link
                        key={index}
                        to={item.value}
                        className={`my-3 flex cursor-pointer items-center gap-1 rounded-xl p-2 ${isActive(item.value)
                            ? "text-primary border border-solid border-primary bg-primary/20"
                            : ""
                            }`}
                    >
                        <img className="h-6 w-6" src={item.icon} alt={item.label} />
                        <div className="text-xl">{item.label}</div>
                    </Link>
                ))}
            </div>
            <User />
        </nav>
    );
};

export default NavBar;
