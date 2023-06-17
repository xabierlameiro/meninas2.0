declare module '*.graphql';

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
        items: (Product & { quantity: number; selectedSize: string })[];
        totalItems: () => number;
        totalCost: () => number;
        totalBasketPrice: () => number;
        addToCart: (item: Product & { selectedSize: string }) => void;
        getAvailableSizes: (item: Product) => Stock;
        hasShipping: () => number;
        incrementQuantity: (id: string, size: string) => void;
        decrementQuantity: (id: string, size: string) => void;
        isIncrementable: (id: string, size: string) => boolean;
        isDecrementable: (id: string, size: string) => boolean;
        removeFromCart: (id: string, size: string) => void;
        closeAll: () => void;
    };

type BooleanState = [boolean, React.Dispatch<boolean | ((prevState: boolean) => boolean)>];

type StringState = [string, React.Dispatch<React.SetStateAction<string>>];
