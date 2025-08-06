import type { GradeInfo, UserInfo } from "@/stores/user"
import { api } from "./api"

export const apiAuth = {
  login: (data: {
    phone: string
    code: string
  }) => {
    return api.action({
      url: 'login/by-h5',
      method: 'post',
      data,
    })
  },
  code: (data: {
    phone: string
  }) => {
    return api.action({
      url: 'login/code',
      method: 'post',
      data,
    })
  },
  logout: () => {
    return api.request({
      url: 'logout',
    })
  },
  info: () => {
    return api.query({
      url: 'user/info',
    })
  },
  changePassword: (data: {
    oldPassword: string
    newPassword: string
    confirmPassword: string
  }) => {
    return api.update({
      url: 'user/changePassword',
      data,
    })
  },
  /**
   * 定时获取用户最后活跃时间
   */
  refresh: (): Promise<{ user: UserInfo }> => {
    return api.action({
      url: 'app/user/refresh',
      method: 'post',
      message: {
        error: {
          enable: false,
        },
      },
    })
  },
  /**
   * 加入班级
   * @param data
   */
  joinGrade: (data: Pick<GradeInfo, 'gradeNumber'>): Promise<unknown> => {
    return api.action({
      url: 'app/user/join/grade',
      method: 'post',
      data,
    })
  },
  /**
   * 更新用户信息
   * @param data
   */
  updateUser: (data: Partial<UserInfo>): Promise<UserInfo> => {
    return api.update({
      url: 'app/user/edit',
      data,
    })
  },
}
