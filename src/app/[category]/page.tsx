import { fetchGraphQL } from '@helpers/contentful';
import categories from '@queries/categories.graphql';
import Masonry from '@components/Masonry';

export const runtime = 'edge';

const getProductsByCategory = async (category: string) => {
    const { data } = await fetchGraphQL(categories, { category });
    return data.productoCollection.items as ContentfulProduct[];
};

const CategoryPage = async ({ params }: PathParamsProps) => {
    const data = await getProductsByCategory(params.category);

    return <Masonry data={data} />;
};

export default CategoryPage;
