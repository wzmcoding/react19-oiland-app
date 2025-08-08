import { api } from "./api"

export interface LevelEntity {
  id: string
  createTime: string
  createBy: string
  updateTime: string
  updateBy: string
  parentId: string
  name: string
  sortIndex: number
  note: string
  enable: boolean
  subjectId: string
  parentNameJson: string
  subjectName: string
  children: LevelEntity[]
  hierarchy?: number
  showTips?: boolean
  totalCount: number
  completedCount: number
  lastVisited?: boolean
  isOpen?: boolean
  rightCount?: number
  lastPracticeTime?: string
  [key: number]: any
}

export const apiKnowledge = {
  list: (): Promise<LevelEntity[]> => {
    return api.query({
      url: 'directory/list',
    })
  },
  skip: (directoryId: string): Promise<any> => {
    return api.action({
      url: 'directory/skip',
      method: 'post',
      data: { directoryId },
    })
  },
}
