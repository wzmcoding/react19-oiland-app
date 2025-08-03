import NavBar from "@/components/NavBar";
import { useUserStore } from "@/stores/user";
import { useEffect } from "react";
import HomeList from "@/components/home/list";
import HomeChat from "@/components/home/chat";
const Home = () => {
    const { setToken, setUser, token, user } = useUserStore();

    function init() {
        setToken(token);
        setUser(user);
    }

    useEffect(() => {
        init();
    }, []);
    return (
        <div className="h-full flex items-stretch bg-background">
            <NavBar />
            <div className="h-screen flex-1">
                <div className="h-full w-full">
                    <div className="h-full flex">
                        <div className="flex-1">
                            <HomeChat />
                        </div>
                        <HomeList />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
