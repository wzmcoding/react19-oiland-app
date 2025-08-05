import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

export default function Personal() {
    return (
        <div className="w-full flex flex-col px-8 py-8">
            <div className="text-xl font-semibold">个人资料</div>

            <div className="mb-1.5 mt-11 text-lg font-semibold">基础信息</div>
            <Separator className="bg-foreground/10" />

            <div className="my-1.5 space-y-6">
                {/* 姓名 */}
                <div className="space-y-2">
                    <Label className="text-sm font-medium">姓名</Label>
                    <div className="text-sm text-muted-foreground">
                        请填写您的真实姓名
                    </div>
                    <div className="flex items-center gap-3">
                        <Input
                            disabled
                            placeholder="请填写您的真实姓名"
                            className="h-10"
                        />
                        <div className="w-[180px] flex items-center gap-2">
                            {/* 根据编辑状态切换显示 */}
                            <Button className="h-10 w-16 rounded-lg">修改</Button>
                            <Button className="h-10 w-16 rounded-lg">保存</Button>
                            <Button
                                variant="secondary"
                                className="h-10 w-16 rounded-lg bg-muted"
                            >
                                取消
                            </Button>
                        </div>
                    </div>
                </div>

                {/* 昵称 */}
                <div className="space-y-2">
                    <Label className="text-sm font-medium">昵称</Label>
                    <div className="flex items-center gap-3">
                        <Input
                            disabled
                            placeholder="请填写您的昵称"
                            className="h-10"
                        />
                        <div className="w-[180px] flex items-center gap-2">
                            <Button className="h-10 w-16 rounded-lg">修改</Button>
                            <Button className="h-10 w-16 rounded-lg">保存</Button>
                            <Button
                                variant="secondary"
                                className="h-10 w-16 rounded-lg bg-muted"
                            >
                                取消
                            </Button>
                        </div>
                    </div>
                </div>
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
                        )
                    )}

                    <Button className="mt-1 h-10 w-35 rounded-lg">加入班级</Button>
                </div>
            </div>
        </div>
    )
}
