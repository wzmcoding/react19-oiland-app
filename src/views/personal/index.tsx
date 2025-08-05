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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useUserStore } from "@/stores/user";
import { useState } from "react";

const formSchema = z.object({
    username: z.string().nonempty({
        message: "请填写您的真实姓名",
    }),
    nickname: z.string().nonempty({
        message: "请填写您的昵称",
    }),
});

export default function Personal() {
    const { user } = useUserStore();
    const [isEditField, setIsEditField] = useState<{ username: boolean; nickname: boolean }>({
        username: !!user?.username || false,
        nickname: !!user?.nickname || false,
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: user?.username || "",
            nickname: user?.nickname || "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("values -> ", values);
    }

    function handleEditField(field: 'username' | 'nickname') {
        setIsEditField({
            ...isEditField,
            [field]: !isEditField[field],
        })
    }

    function save(field: 'username' | 'nickname') {
        setIsEditField({
            ...isEditField,
            [field]: true,
        })
    }

    function cancel(field: 'username' | 'nickname') {
        handleEditField(field)
        form[field] = user?.[field] || ''
    }

    return (
        <div className="w-full flex flex-col px-8 py-8">
            <div className="text-xl font-semibold">个人资料</div>

            <div className="mb-1.5 mt-11 text-lg font-semibold">基础信息</div>
            <Separator className="bg-foreground/10" />

            <div className="my-1.5 space-y-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                                        : <>
                                                            <Button className="h-10 w-16 rounded-lg" onClick={() => save('username')}>保存</Button>
                                                            <Button
                                                                variant="secondary"
                                                                className="h-10 w-16 rounded-lg bg-muted"
                                                                onClick={() => cancel('username')}
                                                            >
                                                                取消
                                                            </Button>
                                                        </>
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
                                                        : <>
                                                            <Button className="h-10 w-16 rounded-lg" onClick={() => save('nickname')}>保存</Button>
                                                            <Button
                                                                variant="secondary"
                                                                className="h-10 w-16 rounded-lg bg-muted"
                                                                onClick={() => cancel('nickname')}
                                                            >
                                                                取消
                                                            </Button>
                                                        </>
                                                }

                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
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
                    {/* 无班级时显示 */}
                    <div>
                        <span className="text-red-500">*</span>班级
                    </div>

                    {/* 模拟班级列表 */}
                    {[{ gradeId: 1, gradeName: "高三（1）班", joined: false }].map(
                        (item) => (
                            <div
                                key={item.gradeId}
                                className="flex items-center justify-start gap-4"
                            >
                                <div className="min-w-[70px] border border-foreground/10 px-3 py-2 text-sm rounded-none">
                                    {item.gradeName}
                                </div>
                                <div>{item.joined === false ? "待审核" : ""}</div>
                            </div>
                        ),
                    )}

                    <Button className="mt-1 h-10 w-35 rounded-lg">加入班级</Button>
                </div>
            </div>
        </div>
    );
}
