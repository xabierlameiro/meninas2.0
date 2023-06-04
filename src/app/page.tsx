import { fetchGraphQL } from '@helpers/contentful';
import Image from '@components/Image';
import Link from 'next/link';
import GridContainer from '@components/Layout/GridContainer';
import Card from '@components/Layout/Card';
import plp from '@queries/plp.graphql';

export const runtime = 'edge';

async function getProducts() {
    const { data } = await fetchGraphQL(plp);
    return data?.productoCollection?.items;
}

export default async function Home() {
    const data = await getProducts();
    return (
        <GridContainer>
            {data?.map((producto: any, index: number) => (
                <Card key={producto.nombre}>
                    <Link
                        href={`/${producto.categoriaPrincipal.slug}/${producto.url}`}
                        style={{
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            position: 'inherit',
                        }}
                    >
                        <Image
                            fill
                            src={producto.portada.url}
                            alt={producto.nombre}
                            priority={index === 0}
                            width={356}
                            height={475}
                        />
                    </Link>
                </Card>
            ))}
        </GridContainer>
    );
}
