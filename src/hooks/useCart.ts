import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useStore from '@/hooks/useStore';

const cart = create(
    persist<CartState>(
        (set, get) => ({
            items: [],
            totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
            totalCost: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
            addToCart: (item) =>
                set((state) => {
                    const exists = state.items.find((i) => i.id === item.id);
                    if (exists && exists.size === item.size) {
                        exists.quantity += item.quantity;
                        return { items: [...state.items] };
                    }
                    return { items: [...state.items, { ...item }] };
                }),

            removeFromCart: (id, size) => {
                set((state) => {
                    const index = state.items.findIndex((i) => i.id === id && i.size === size);
                    if (index !== -1) {
                        state.items.splice(index, 1);
                        return { items: [...state.items] };
                    }
                    return { items: [...state.items] };
                });
            },
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'cart-storage',
        }
    )
);

const useCart = () =>
    useStore(cart, (state) => state) ?? {
        items: [],
        totalItems: () => 0,
        totalCost: () => 0,
        addToCart: () => {},
        removeFromCart: () => {},
        clearCart: () => {},
    };

export default useCart;
