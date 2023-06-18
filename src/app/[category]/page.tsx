import { fetchGraphQL } from '@helpers/contentful';
import categories from '@queries/categories.graphql';
import Masonry from '@components/Masonry';
import { ProductsScheme } from '@schemes/product';

const getProductsByCategory = async (category: string) => {
    const { data } = await fetchGraphQL(categories, { category });
    return {
        products: ProductsScheme.parse(data.productoCollection.items),
    };
};

const CategoryPage = async ({ params }: PathParamsProps) => {
    const { products } = await getProductsByCategory(params.category);
    return <Masonry data={products} category={params.category} />;
};

export default CategoryPage;
