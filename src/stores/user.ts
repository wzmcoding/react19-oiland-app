import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type State = {
    token: string
    user: Partial<UserInfo>
}

type Actions = {
    setToken: (token: string) => void
    setUser: (user: Partial<UserInfo>) => void
    reset: () => void
}

export interface UserInfo {
    avatar: string
    username: string
    nickname: string
    uid: string
    phone: string
    level: string
    lastActivityTime: string // 最近活跃时间
    newUser: boolean // 是否新用户
    gradeInfos?: GradeInfo[]
}

export interface GradeInfo {
    gradeId: string // 班级ID
    gradeName: string // 班级名称
    gradeNumber: string // 班级码
    joined: boolean // 是否已加入班级
}

export const useUserStore = create<State & Actions>()(persist((set) => ({
    token: '',
    user: {},
    setToken: (token: string) => set(() => ({ token })),
    setUser: (user: Partial<UserInfo>) => set(() => ({ user })),
    reset: () => set(() => ({ token: '', user: {} })),
}), {
    name: 'user-storage',
}))
