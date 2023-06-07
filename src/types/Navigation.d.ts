type NavigationProductsProps = {
    listOfProducts: Pick<Product, 'url'>[];
    productSlug: string;
    categorySlug: string;
};

type Urls = {
    prevItem: string | undefined | null;
    nextItem: string | undefined | null;
};

type SelectorProps = {
    options: string[];
    selectedSize: string;
    onChange: (option: string) => void;
};
