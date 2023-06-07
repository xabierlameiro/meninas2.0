type NavigationProductsProps = {
    listOfProducts: Pick<CartProduct, 'url'>[];
    productSlug: string;
    categorySlug: string;
};

type SelectorProps = {
    options: string[];
    selectedSize: string;
    onChange: (option: string) => void;
};
