import { create } from 'zustand';

interface LayoutStore {
	viewportRef: React.RefObject<HTMLDivElement | null>;
	setViewportRef: (ref: React.RefObject<HTMLDivElement | null>) => void;
}

const defaultValue = {
	viewportRef: { current: null },
};

export const useLayoutStore = create<LayoutStore>((set) => ({
	...defaultValue,
	setViewportRef: (ref) => set({ viewportRef: ref }),
}));
