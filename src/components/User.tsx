import imgUser from '@/assets/user.svg';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUserStore } from '@/stores/user';
import { useNavigate } from 'react-router';

const User = () => {
    const navigate = useNavigate();
    const { user, reset } = useUserStore();
    function handleLogout() {
        navigate('/login');
        reset();
    }

    function handlePerson() {
        navigate('/personal');
    }
    return (
        <div className="h-full w-full flex items-end mb-7">
            <div className="flex justify-end pr-10 pt-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className='flex items-center gap-2 cursor-pointer'>
                                <img className="h-10 w-10" src={imgUser} />
                                <div className='text-primary text-xl font-500'>个人中心</div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="">
                        <DropdownMenuGroup>
                            <DropdownMenuItem className='cursor-pointer hover:bg-primary/20! hover:text-primary!'>
                                <div onClick={handlePerson}>个人资料</div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='cursor-pointer hover:bg-primary/20! hover:text-primary!'>
                                <div onClick={handleLogout}>退出登录</div>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

export default User;
