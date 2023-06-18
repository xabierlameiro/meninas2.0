type AddtoCartProps = {
    item: Product;
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

type AddButtonProps = {
    item: Product;
    selectedSize: string;
    setSelectedSize: (option: string) => void;
};

type SelectorProps = {
    options: Stock;
    selectedSize: string;
    setSelectedSize: (option: string) => void;
};
