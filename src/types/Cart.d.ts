type Product = {
    id: string;
    name: string;
    price: number;
    image?: string;
    size: string;
    quantity: number;
    juan?: string;
    url?: string;
};

type CartState = {
    items: Product[];
    totalItems: () => number;
    totalCost: () => number;
    addToCart: (item: Product) => void;
    incrementQuantity: (id: string, size: string) => void;
    decrementQuantity: (id: string, size: string) => void;
    isIncrementable: (id: string, size: string) => boolean;
    isDecrementable: (id: string, size: string) => boolean;
    removeFromCart: (id: string, size: string) => void;
    clearCart: () => void;
};

type AddtoCartProps = {
    item: {
        id: string;
        name: string;
        price: number;
        image?: string;
    };
    sizes: string[];
};
