import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { z } from "zod";
import { useUserStore } from "@/stores/user";
import { useEffect, useState } from "react";
import { dialog } from "@/utils";
import { service } from "@/api";

const formSchema = z.object({
    username: z.string().nonempty({
        message: "请填写您的真实姓名",
    }),
    nickname: z.string().nonempty({
        message: "请填写您的昵称",
    }),
});
const classFormSchema = z.object({
    number: z.string().nonempty({
        message: "请输入班级码",
    }),
});

export default function Personal() {
    const [open, setOpen] = useState(false);
    const { user, refresh, setUser } = useUserStore();
    const [isEditField, setIsEditField] = useState<{ username: boolean; nickname: boolean }>({
        username: !!user?.username || false,
        nickname: !!user?.nickname || false,
    })

    useEffect(() => {
        console.log("user -> ", user);
        refresh(true)
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: user?.username || "",
            nickname: user?.nickname || "",
        },
    });
    const classForm = useForm<z.infer<typeof classFormSchema>>({
        resolver: zodResolver(classFormSchema),
        defaultValues: {
            number: "",
        },
    });

    async function confirm() {
        console.log("confirm -> ", classForm.getValues('number'));
        try {
            await service.auth.joinGrade({
                gradeNumber: classForm.getValues('number')
            })
            await refresh(true)
        } catch (error) {
            console.error("加入班级失败", error);
            dialog.toast("加入班级失败，请稍后再试~")
        }
        setOpen(false);
    }

    function handleEditField(field: 'username' | 'nickname') {
        setIsEditField({
            ...isEditField,
            [field]: !isEditField[field],
        })
    }

    async function save(field: 'username' | 'nickname') {
        console.log("save -> ", field);
        setIsEditField({
            ...isEditField,
            [field]: true,
        })
        const value = form.getValues(field)
        console.log("🚨 当前表单字段值：", field, value)

        const data = { ...user, [field]: form.getValues(field) }
        console.log("save data -> ", data);
        // 下面的代码执行会报错，页面直接不显示了 why?
        await service.auth.updateUser(data)
        setUser(data)
    }

    function cancel(field: 'username' | 'nickname') {
        handleEditField(field)
        form.setValue(field, user?.[field] || '')
    }

    function handleAddClass() {
        classForm.reset()
        if (!form.getValues('username')) {
            dialog.toast('请先填写姓名再加入班级~')
            return
        }
        setOpen(true)
    }

    return (
        <div className="w-full flex flex-col px-8 py-8">
            <div className="text-xl font-semibold">个人资料</div>

            <div className="mb-1.5 mt-11 text-lg font-semibold">基础信息</div>
            <Separator className="bg-foreground/10" />

            <div className="my-1.5 space-y-6">
                <Form {...form}>
                    <form className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>姓名</FormLabel>
                                    <FormDescription>请填写您的真实姓名</FormDescription>
                                    <FormControl>
                                        <div className="flex items-center gap-3">
                                            <Input placeholder="请填写您的真实姓名" {...field} disabled={isEditField.username} />
                                            <div className="w-46 flex items-center gap-2">
                                                {
                                                    isEditField.username ? <Button className="h-10 w-16 rounded-lg" onClick={() => handleEditField('username')}>修改</Button>
                                                        : <div className="flex items-center gap-2">
                                                            <Button className="h-10 w-16 rounded-lg" onClick={() => save('username')}>保存</Button>
                                                            <Button
                                                                variant="secondary"
                                                                className="h-10 w-16 rounded-lg bg-muted"
                                                                onClick={() => cancel('username')}
                                                            >
                                                                取消
                                                            </Button>
                                                        </div>
                                                }
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nickname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>昵称</FormLabel>
                                    <FormDescription>请填写您的昵称</FormDescription>
                                    <FormControl>
                                        <div className="flex items-center gap-3">
                                            <Input placeholder="请填写您的昵称" {...field} disabled={isEditField.nickname} />
                                            <div className="w-46 flex items-center gap-2">
                                                {
                                                    isEditField.nickname ? <Button className="h-10 w-16 rounded-lg" onClick={() => handleEditField('nickname')}>修改</Button>
                                                        : <div className="flex items-center gap-2">
                                                            <Button className="h-10 w-16 rounded-lg" onClick={() => save('nickname')}>保存</Button>
                                                            <Button
                                                                variant="secondary"
                                                                className="h-10 w-16 rounded-lg bg-muted"
                                                                onClick={() => cancel('nickname')}
                                                            >
                                                                取消
                                                            </Button>
                                                        </div>
                                                }

                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </div>

            {/* 班级信息 */}
            <div className="mt-10">
                <div className="mb-1.5 text-lg font-semibold">班级信息</div>
                <Separator className="bg-foreground/10" />
                <div className="mt-1.5 text-sm text-muted-foreground">
                    点击「加入班级」输入老师发给你的5位数的班级码。加入班级后，老师就可以了解你的学习进度、并在practix上检查你的作业并给出学习建议。
                </div>

                <div className="mt-4 space-y-2">
                    {
                        !user.gradeInfos?.length &&
                        <div>
                            <span className="text-red-500">*</span>班级
                        </div>
                    }

                    {/* 模拟班级列表 */}
                    {Array.isArray(user.gradeInfos) && user.gradeInfos?.map(
                        (item) => (
                            <div
                                key={item.gradeId}
                                className="flex items-center justify-start gap-4"
                            >
                                <div className="min-w-70 border cursor-pointer border-foreground/10 p-2 text-sm rounded-none">
                                    {item.gradeName}
                                </div>
                                <div>{item.joined === false ? "待审核" : ""}</div>
                            </div>
                        ),
                    )}
                    <Button className="mt-1 h-10 w-35 rounded-lg" onClick={handleAddClass}>加入班级</Button>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <Form {...classForm}>
                            <form className="space-y-8">
                                <DialogTrigger asChild>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                    <DialogHeader>
                                        <DialogTitle>加入班级</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4">
                                        <FormField
                                            control={classForm.control}
                                            name="number"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <div className="flex items-center gap-3">
                                                        <FormLabel>班级码</FormLabel>
                                                        <FormControl>
                                                            <div className="flex items-center gap-3 flex-1">
                                                                <Input placeholder="请输入班级码" {...field} />
                                                            </div>
                                                        </FormControl>
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <DialogFooter className="sm:justify-end">
                                        <DialogClose asChild>
                                            <Button type="button" variant="secondary">
                                                取消
                                            </Button>
                                        </DialogClose>
                                        <Button type="submit" onClick={confirm}>确定</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </form>
                        </Form>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
