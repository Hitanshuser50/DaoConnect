// Authentication and session management
import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { User, WalletConnection } from "./types"

interface AuthState {
  user: User | null
  wallet: WalletConnection | null
  isAuthenticated: boolean
  login: (user: User, wallet: WalletConnection) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      wallet: null,
      isAuthenticated: false,

      login: (user: User, wallet: WalletConnection) => {
        set({ user, wallet, isAuthenticated: true })
      },

      logout: () => {
        set({ user: null, wallet: null, isAuthenticated: false })
      },

      updateUser: (updates: Partial<User>) => {
        const currentUser = get().user
        if (currentUser) {
          set({ user: { ...currentUser, ...updates } })
        }
      },
    }),
    {
      name: "dao-connect-auth",
    },
  ),
)
