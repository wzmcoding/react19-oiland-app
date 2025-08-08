import { useState } from "react";
import { useKnowledgeStore } from "@/stores/knowledge";
import { ChevronRight, ChevronDown, Star, Eye, Sun } from "lucide-react";

export default function List() {
    const list = useKnowledgeStore((state) => state.list);
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const toggleExpand = (id: string) => {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    // 父级背景颜色映射
    const colors = ["bg-green-500", "bg-purple-500", "bg-blue-500", "bg-pink-500"];

    // 图标映射
    const icons = [Star, Eye, Sun];

    return (
        <div className="min-w-60 h-screen overflow-y-auto bg-white">
            {list?.map((item, index) => {
                const isOpen = !expanded[item.id];
                const HeaderColor = colors[index % colors.length];

                return (
                    <div key={item.id} className="mb-1">
                        {/* 父分类 */}
                        <div
                            className={`${HeaderColor} text-white px-4 py-2 font-semibold flex items-center justify-between cursor-pointer`}
                            onClick={() => toggleExpand(item.id)}
                        >
                            <span>{item.name}</span>
                            {isOpen ? (
                                <ChevronDown className="w-4 h-4" />
                            ) : (
                                <ChevronRight className="w-4 h-4" />
                            )}
                        </div>

                        {/* 子项 */}
                        <div
                            className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-60" : "max-h-0"
                                }`}
                        >
                            <div className="flex flex-col py-2 overflow-y-auto max-h-60">
                                {item.children?.map((child, i) => {
                                    const Icon = icons[i % icons.length];
                                    return (
                                        <div
                                            key={child.id}
                                            className="flex items-center gap-3 px-4 py-1 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-gray-700 text-sm">{child.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
