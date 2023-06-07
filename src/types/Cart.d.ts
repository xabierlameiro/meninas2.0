type CartProduct = {
    id: string;
    name: string;
    price: number;
    image?: string;
    size: string;
    quantity: number;
    url?: string;
};

type CartState = {
    items: CartProduct[];
    totalItems: () => number;
    totalCost: () => number;
    addToCart: (item: CartProduct) => void;
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

type WheelPickerProps = {
    options: string[];
    onChange: (selectedOption: Option) => void;
    initialOption?: string;
    selectedSize: string;
};
