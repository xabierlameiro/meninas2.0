import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useStore from '@hooks/useStore';

const modal = create(
    persist<Modal>(
        (set, get) => ({
            isOpen: false,
            open: () => set({ isOpen: true }),
            close: () => set({ isOpen: false }),
            toogle: () => set({ isOpen: !get().isOpen }),
        }),
        {
            name: 'modal',
        }
    )
);

const useModal = () => useStore(modal, (state) => state as Modal);

export default useModal;
