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
    total: () => number;
    addToCart: (item: Product) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
};

type AddtoCartProps = {
    item: Product;
    sizes: string[];
};
