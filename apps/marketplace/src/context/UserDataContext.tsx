import { create } from 'zustand';

type UserData = {
  userName: string | undefined;
  userId: string | undefined;
};

interface UpadateState {
  user: UserData;
  setUser: (value: UserData) => void;
}

const useUserStore = create<UpadateState>((set) => ({
  user: { userName: undefined, userId: undefined },
  setUser: (value: UserData) => set({ user: value }),
}));

export default useUserStore;
