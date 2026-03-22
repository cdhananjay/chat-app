import { create } from 'zustand'

type UserState = {
    user: UserInfo,
    setUser: (user: UserInfo) => void;
}

export type UserInfo = {
    id: number,
    name: string,
    username: string,
}
const iniUser : UserInfo = {
    id: -1,
    name: "",
    username: ""
}
export const useUserStore = create<UserState>((set, _get)=> ({
    user: iniUser,
    setUser: (user) => set({user})
}))