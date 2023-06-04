type NavigationProductsProps = {
    listOfProducts: Product[];
    productSlug: string;
    categorySlug: string;
};

type Urls = {
    prevItem: string | undefined | null;
    nextItem: string | undefined | null;
};
