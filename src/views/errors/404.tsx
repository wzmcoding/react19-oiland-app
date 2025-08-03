import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-md shadow-xl rounded-2xl p-10 max-w-md text-center">
                <div className="flex justify-center mb-6 text-red-500">
                    <AlertTriangle className="h-12 w-12" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">404</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">页面未找到</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    很抱歉，您访问的页面不存在或已被移除。
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-all"
                >
                    返回首页
                </button>
            </div>
        </div>
    );
};

export default NotFound;
