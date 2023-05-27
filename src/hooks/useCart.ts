import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useStore from '@/hooks/useStore';

const cart = create(
    persist<CartState>(
        (set, get) => ({
            items: [],
            total: () => get().items.length,
            addToCart: (item) =>
                set((state) => {
                    const exists = state.items.find((i) => i.id === item.id);
                    if (exists && exists.size === item.size) {
                        exists.quantity += 1;
                        return { items: [...state.items] };
                    }
                    return { items: [...state.items, { ...item, quantity: 1 }] };
                }),

            removeFromCart: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
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
        total: () => 0,
        addToCart: () => {},
        removeFromCart: () => {},
        clearCart: () => {},
    };

export default useCart;
