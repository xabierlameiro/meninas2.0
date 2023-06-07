import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useModalStore = create(
    persist<Modal>(
        (set, get) => ({
            isOpen: false,
            open: () => set({ isOpen: true }),
            close: () => set({ isOpen: false }),
            toggle: () => set({ isOpen: !get().isOpen }),
        }),
        {
            name: 'modal',
        }
    )
);

const useModal = (): Modal => {
    const { isOpen, open, close, toggle } = useModalStore();
    return { isOpen, open, close, toggle };
};

export default useModal;
