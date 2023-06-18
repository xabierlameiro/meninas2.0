export const createSlice = (set: SetStore, name: string) => ({
    [`is${name}Open`]: false,
    [`open${name}`]: () => set({ [`is${name}Open`]: true }),
    [`close${name}`]: () => set({ [`is${name}Open`]: false }),
});

export const createMenuSlice = (set: SetStore) => createSlice(set, 'Menu') as MenuActions;

export const createCartSlice = (set: SetStore) => createSlice(set, 'Cart') as CartActions;

export const createSizeSelectorSlice = (set: SetStore) => createSlice(set, 'SizeSelector') as SizeSelectorActions;

export const createSizeManagerSlice = (set: SetStore) => ({
    selectedSize: '',
    setSelectedSize: (size: string) => set({ selectedSize: size }),
});

export const createBoundSlice = (set: SetStore, get: GetStore) => ({
    openMenu: () => {
        createMenuSlice(set).openMenu();
        createSizeSelectorSlice(set).closeSizeSelector();
        createCartSlice(set).closeCart();
    },
    openSizeSelector: () => {
        createMenuSlice(set).closeMenu();
        createSizeSelectorSlice(set).openSizeSelector();
        createCartSlice(set).closeCart();
    },
    openCart: () => {
        createMenuSlice(set).closeMenu();
        createSizeSelectorSlice(set).closeSizeSelector();
        createCartSlice(set).openCart();
    },
    closeAll: () => {
        createMenuSlice(set).closeMenu();
        createSizeSelectorSlice(set).closeSizeSelector();
        createCartSlice(set).closeCart();
    },
});
