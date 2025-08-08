import { service } from '@/api'
import { create } from 'zustand'
import type { LevelEntity } from '@/api/knowledge'

type State = {
    list: LevelEntity[]
}

type Actions = {
    getList: (list?: LevelEntity[]) => void
}

export const useKnowledgeStore = create<State & Actions>((set) => ({
    list: [],
    getList: async () => {
        const res = await service.knowledge.list()
        set({ list: res })
    }
}))
