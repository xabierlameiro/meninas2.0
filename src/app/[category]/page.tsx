import { fetchGraphQL } from '@helpers/contentful';
import GridContainer from '@components/Layout/GridContainer';
import categories from '@queries/categories.graphql';
import dynamic from 'next/dynamic';

const Masonry = dynamic(() => import('@components/Masonry'), { ssr: false });

export const runtime = 'edge';

const getProductsByCategory = async (category: string) => {
    const { data } = await fetchGraphQL(categories, { category });
    return data.productoCollection.items as ContentfulProduct[];
};

const CategoryPage = async ({ params }: PathParamsProps) => {
    const data = await getProductsByCategory(params.category);

    return (
        <GridContainer>
            <Masonry data={data} />
        </GridContainer>
    );
};

export default CategoryPage;
