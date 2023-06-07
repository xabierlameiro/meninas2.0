import { fetchGraphQL } from '@helpers/contentful';
import Image from '@components/Image';
import Link from 'next/link';
import GridContainer from '@components/Layout/GridContainer';
import Card from '@components/Layout/Card';
import categories from '@queries/categories.graphql';

export const runtime = 'edge';

const getProductsByCategory = async (category: string) => {
    const { data } = await fetchGraphQL(categories, { category });
    return data.productoCollection.items as ContentfulProduct[];
};

const CategoryPage = async ({ params }: PathParamsProps) => {
    const products = await getProductsByCategory(params.category);

    return (
        <GridContainer>
            {products.map((product: ContentfulProduct, index: number) => (
                <Card key={product.url}>
                    <Link href={`/${params.category}/${product.url}`}>
                        <Image
                            fill
                            src={product.portada.url}
                            alt={product.nombre}
                            priority={index === 0}
                            width={572}
                            height={762}
                        />
                    </Link>
                </Card>
            ))}
            {products.length <= 5 ? (
                <>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </>
            ) : null}
        </GridContainer>
    );
};

export default CategoryPage;
