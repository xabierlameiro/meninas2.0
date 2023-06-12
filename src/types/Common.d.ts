type Children = {
    children?: React.ReactNode;
};

type PathParamsProps = {
    params: {
        product: string;
        category: string;
    };
};

type SetStore = (
    partial: BoundStore | Partial<BoundStore> | ((state: BoundStore) => BoundStore | Partial<BoundStore>),
    replace?: boolean | undefined
) => void;

type GetStore = () => BoundStore;

type CartActions = {
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
};

type MenuActions = {
    isMenuOpen: boolean;
    openMenu: () => void;
    closeMenu: () => void;
};

type SizeSelectorActions = {
    isSizeSelectorOpen: boolean;
    openSizeSelector: () => void;
    closeSizeSelector: () => void;
};

type BoundStore = CartActions &
    MenuActions &
    SizeSelectorActions & {
        items: CartProduct[];
        totalItems: () => number;
        totalCost: () => number;
        addToCart: (item: CartProduct) => void;
        incrementQuantity: (id: string, size: string) => void;
        decrementQuantity: (id: string, size: string) => void;
        isIncrementable: (id: string, size: string) => boolean;
        isDecrementable: (id: string, size: string) => boolean;
        removeFromCart: (id: string, size: string) => void;
    };
