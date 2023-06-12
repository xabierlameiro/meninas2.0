import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toggleBodyOverflow } from '@helpers/scroll';

const useMenu = create(
    persist<Modal>(
        (set, get) => ({
            isOpen: false,
            open: () => {
                set({ isOpen: true });
                toggleBodyOverflow(true);
            },
            close: () => {
                set({ isOpen: false });
                toggleBodyOverflow(false);
            },
            toggle: () => set({ isOpen: !get().isOpen }),
        }),
        {
            name: 'menu',
        }
    )
);

export default useMenu;
