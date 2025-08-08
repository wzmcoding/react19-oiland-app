import { useUserStore } from "@/stores/user";
import { useEffect } from "react";
import HomeList from "@/components/home/list";
import HomeChat from "@/components/home/chat";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { useKnowledgeStore } from "@/stores/knowledge";
import './index.css'
const Home = () => {
    const { setToken, setUser, token, user } = useUserStore();
    const { getList } = useKnowledgeStore();

    function init() {
        setToken(token);
        setUser(user);
    }

    useEffect(() => {
        init();
        // 获取知识点列表
        getList();
    }, []);
    return (
        <div className="h-full w-full">
            <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[200px] w-full rounded-lg border md:min-w-[450px]"
            >
                <ResizablePanel defaultSize={80} minSize={60}>
                    <div className="flex-1">
                        <HomeChat />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={20} minSize={20} maxSize={28} >
                    <HomeList />
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}

export default Home;
