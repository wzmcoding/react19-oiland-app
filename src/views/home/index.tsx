import { useUserStore } from "@/stores/user";
import { useEffect } from "react";
import HomeList from "@/components/home/list";
import HomeChat from "@/components/home/chat";
const Home = () => {
    const { setToken, setUser, token, user } = useUserStore();

    function init() {
        console.log('init------',{ token, user  })
        setToken(token);
        setUser(user);
    }

    useEffect(() => {
        init();
    }, []);
    return (
        <div className="h-full w-full">
            <div className="h-full flex">
                <div className="flex-1">
                    <HomeChat />
                </div>
                <HomeList />
            </div>
        </div>
    );
}

export default Home;
