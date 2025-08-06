import { service } from '@/api'
import { api } from '@/api/api'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { useNavigate } from 'react-router'
import { ls } from '@/utils/storage'

type State = {
    token: string
    user: Partial<UserInfo>
}

type Actions = {
    setToken: (token: string) => void
    setUser: (user: Partial<UserInfo>) => void
    reset: () => void
    refresh: (immediate?: boolean) => void
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
let timer
export const useUserStore = create<State & Actions>()(persist((set) => ({
    token: '',
    user: {},
    setToken: (token: string) => set(() => {
        api.defaults.logoutHandler = async () => {
            // 登录失效处理
            return async () => {
                set(() => ({ token: '', user: {} }))
                timer = null
                useNavigate()('/login')
            }
        }
        // 设置token
        api.defaults.headers = {
            authorization: token,
        }
        ls.set('token', token)
        return { token }
    }),
    setUser: (user: Partial<UserInfo>) => set(() => ({ user })),
    reset: () => set(() => ({ token: '', user: {} })),
    /**
   * 每隔1分钟请求,更新用户活跃信息
   * @param immediate 是否立即执行
   */
    refresh: async (immediate = false) => {
        if (immediate) {
            const { user } = await service.auth.refresh()
            console.log('refresh user', user)
            set(() => ({ user }))
        }
        else {
            if (timer) {
                clearInterval(timer)
            }
            timer = setInterval(async () => {
                const { user } = await service.auth.refresh()
                set(() => ({ user }))
            }, 60 * 1000)
        }
    }
}), {
    name: 'user-storage',
}))
