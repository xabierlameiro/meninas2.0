import { create } from 'zustand';
import {
    createBoundSlice,
    createCartSlice,
    createMenuSlice,
    createSizeManagerSlice,
    createSizeSelectorSlice,
} from '@helpers/store';

const useBoundStore = create<BoundStore>((set, get) => ({
    items: [],
    ...createMenuSlice(set),
    ...createCartSlice(set),
    ...createSizeSelectorSlice(set),
    ...createSizeManagerSlice(set),
    ...createBoundSlice(set, get),
    hasShipping: () => Math.max(...get().items.map((item) => item.shipping)),
    totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
    totalBasketPrice: () => get().items.reduce((acc, item) => acc + item.priceWithDiscount * item.quantity, 0),
    totalCost: () => get().totalBasketPrice() + get().hasShipping(),
    getAvailableSizes: (item) => {
        const sizes = item?.stock?.map((s) => s);
        const cartSizes = get()
            .items.filter((i) => i.id === item.id)
            .map((i) => {
                return { size: i.selectedSize, quantity: i.quantity };
            });
        return sizes?.filter((s) => !cartSizes.some((cs) => cs.size === s.size && cs.quantity === s.quantity)) ?? [];
    },
    addToCart: (item) => {
        if (get().isIncrementable(item.id, item.selectedSize)) {
            if (get().items.some((i) => i.id === item.id && i.selectedSize === item.selectedSize)) {
                set((state) => {
                    const index = state.items.findIndex(
                        (i) => i.id === item.id && i.selectedSize === item.selectedSize
                    );
                    if (index !== -1) {
                        state.items[index].quantity += 1;
                        return { items: [...state.items] };
                    }
                    return { items: [...state.items] };
                });
                return;
            }

            set((state) => {
                return { items: [...state.items, { ...item, quantity: 1 }] };
            });
        }
    },
    incrementQuantity: (id, selectedSize) => {
        if (!get().isIncrementable(id, selectedSize)) return;
        set((state) => {
            const index = state.items.findIndex((i) => i.id === id && i.selectedSize === selectedSize);
            if (index !== -1) {
                state.items[index].quantity += 1;
                return { items: [...state.items] };
            }
            return { items: [...state.items] };
        });
    },
    decrementQuantity: (id, selectedSize) => {
        if (!get().isDecrementable(id, selectedSize)) return;
        set((state) => {
            const index = state.items.findIndex((i) => i.id === id && i.selectedSize === selectedSize);
            if (index !== -1) {
                state.items[index].quantity -= 1;
                return { items: [...state.items] };
            }
            return { items: [...state.items] };
        });
    },
    isIncrementable: (id, selectedSize) => {
        const item = get().items.find((i) => i.id === id && i.selectedSize === selectedSize);
        return item?.stock?.some((s) => s.quantity >= item.quantity + 1) ?? true;
    },
    isDecrementable: (id, selectedSize) => {
        const item = get().items.find((i) => i.id === id && i.selectedSize === selectedSize);
        if (!item) return false;
        return item.quantity > 1;
    },
    removeFromCart: (id, selectedSize) => {
        set((state) => {
            const index = state.items.findIndex((i) => i.id === id && i.selectedSize === selectedSize);
            if (index !== -1) {
                state.items.splice(index, 1);
                return { items: [...state.items] };
            }
            return { items: [...state.items] };
        });
    },
}));

export default useBoundStore;
