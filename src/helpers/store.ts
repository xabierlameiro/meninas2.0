export const createActionsSlice = (set: SetStore, get: GetStore, name: string) => ({
    [`is${name}Open`]: false,
    [`open${name}`]: () => set({ [`is${name}Open`]: true }),
    [`close${name}`]: () => set({ [`is${name}Open`]: false }),
});

export const createMenuSlice = (set: SetStore, get: GetStore) => createActionsSlice(set, get, 'Menu') as MenuActions;
export const createSizeSelectorSlice = (set: SetStore, get: GetStore) =>
    createActionsSlice(set, get, 'SizeSelector') as SizeSelectorActions;
export const createCartSlice = (set: SetStore, get: GetStore) => createActionsSlice(set, get, 'Cart') as CartActions;

export const createBoundSlice = (set: SetStore, get: GetStore) => ({
    openMenu: () => {
        createMenuSlice(set, get).openMenu();
        createSizeSelectorSlice(set, get).closeSizeSelector();
        createCartSlice(set, get).closeCart();
    },
    openSizeSelector: () => {
        createMenuSlice(set, get).closeMenu();
        createSizeSelectorSlice(set, get).openSizeSelector();
        createCartSlice(set, get).closeCart();
    },
    openCart: () => {
        createMenuSlice(set, get).closeMenu();
        createSizeSelectorSlice(set, get).closeSizeSelector();
        createCartSlice(set, get).openCart();
    },
    closeAll: () => {
        createMenuSlice(set, get).closeMenu();
        createSizeSelectorSlice(set, get).closeSizeSelector();
        createCartSlice(set, get).closeCart();
    },
});
