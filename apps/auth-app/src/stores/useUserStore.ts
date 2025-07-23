import { create } from 'zustand'

interface UserState {
  name: string
  setName: (name: string) => void
}

export const useUserStore = create<UserState>((set) => ({
  name: localStorage.getItem('user_name') || '',
  setName: (name: string) => {
    localStorage.setItem('user_name', name)
    set({ name })
  }
}))