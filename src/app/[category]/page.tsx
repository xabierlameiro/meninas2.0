import { fetchGraphQL } from '@helpers/contentful';
import Image from '@components/BreadCrumb/Image';
import Link from 'next/link';
import GridContainer from '@components/Layout/GridContainer';
import Card from '@components/Layout/Card';
import categories from '@queries/categories.graphql';

async function getProductsByCategory(category: string) {
    const { data } = await fetchGraphQL(categories, { category });
    return data?.productoCollection?.items;
}

export default async function Page({ params }: { params: { category: string } }) {
    const products = await getProductsByCategory(params.category);

    return (
        <GridContainer>
            {products?.map((product: any, index: number) => (
                <Card key={product.url}>
                    <Link href={`/${params.category}/${product.url}`}>
                        <Image
                            fill
                            src={product.portada.url}
                            alt={product.nombre}
                            priority={index === 0}
                            width={600}
                            height={850}
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
}
