import { create } from "zustand";

interface Props {
  ids: string[];
  activeId?: string;
  setId: (id: string) => void;
  setIds: (ids: Array<string>) => void;
  reset: () => void;
}

const usePlayer = create<Props>((set) => ({
  ids: [],
  activeId: undefined,
  setId: (id: string) => set({ activeId: id }),
  setIds: (ids: Array<string>) => set({ ids: ids }),
  reset: () => set({ ids: [], activeId: undefined }),
}));

export default usePlayer;
