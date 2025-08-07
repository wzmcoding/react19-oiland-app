import { useUserStore } from "@/stores/user";
import { useEffect } from "react";
import HomeList from "@/components/home/list";
import HomeChat from "@/components/home/chat";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
const Home = () => {
    const { setToken, setUser, token, user } = useUserStore();

    function init() {
        console.log('init------', { token, user })
        setToken(token);
        setUser(user);
    }

    useEffect(() => {
        init();
    }, []);
    return (
        <div className="h-full w-full">
            <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[200px] w-full rounded-lg border md:min-w-[450px]"
            >
                <ResizablePanel defaultSize={75} minSize={60}>
                    <div className="flex-1">
                        <HomeChat />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={25} minSize={25} >
                    <HomeList />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}

export default Home;
