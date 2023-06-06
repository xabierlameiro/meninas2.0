import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useStore from '@hooks/useStore';

const cart = create(
    persist<CartState>(
        (set, get) => ({
            items: [],
            totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0) ?? 0,
            totalCost: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0) ?? 0,
            addToCart: (item) =>
                set((state) => {
                    const exists = state.items.find((i) => i.id === item.id);
                    if (exists && exists.size === item.size) {
                        exists.quantity += item.quantity;
                        return { items: [...state.items] };
                    }
                    return { items: [...state.items, { ...item }] };
                }),
            incrementQuantity: (id, size) => {
                set((state) => {
                    const index = state.items.findIndex((i) => i.id === id && i.size === size);

                    if (index !== -1) {
                        const max = Number(state.items[index].size.split(':')[1]);
                        if (state.items[index].quantity >= max) return { items: [...state.items] };
                        state.items[index].quantity += 1;
                        return { items: [...state.items] };
                    }
                    return { items: [...state.items] };
                });
            },
            decrementQuantity: (id, size) => {
                if (get().items.find((i) => i.id === id && i.size === size)?.quantity === 1) return;
                set((state) => {
                    const index = state.items.findIndex((i) => i.id === id && i.size === size);
                    if (index !== -1) {
                        state.items[index].quantity -= 1;
                        return { items: [...state.items] };
                    }
                    return { items: [...state.items] };
                });
            },
            isIncrementable: (id, size) => {
                const item = get().items.find((i) => i.id === id && i.size === size);
                if (!item) return false;
                const max = Number(item.size.split(':')[1]);
                return item.quantity < max;
            },
            isDecrementable: (id, size) => {
                const item = get().items.find((i) => i.id === id && i.size === size);
                if (!item) return false;
                return item.quantity > 1;
            },
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
        incrementQuantity: () => {},
        decrementQuantity: () => {},
        isIncrementable: () => false,
        isDecrementable: () => false,
        removeFromCart: () => {},
        clearCart: () => {},
    };

export default useCart;
