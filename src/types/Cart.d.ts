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
    item: Omit<CartProduct, 'size' | 'quantity'>;
    sizes: string[];
};

type CartProduct = {
    id: string;
    name: string;
    price: number;
    image?: string;
    size: string;
    quantity: number;
    url?: string;
    description?: string;
};

type PaymentProduct = {
    price_data: {
        currency: string;
        product_data: {
            name: string;
            description: string;
            images: string[];
            metadata?: Record<string, unknown>;
        };
        unit_amount_decimal: number;
        tax_behavior?: string;
    };
    quantity?: number;
    adjustable_quantity?: {
        enabled: boolean;
        minimum: number;
        maximum: number;
    };
};
