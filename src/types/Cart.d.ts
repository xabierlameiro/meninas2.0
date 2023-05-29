type Product = {
    id: string;
    name: string;
    price: number;
    image?: string;
    size: string;
    quantity: number;
    juan?: string;
};

type CartState = {
    items: Product[];
    totalItems: () => number;
    totalCost: () => number;
    addToCart: (item: Product) => void;
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
