import { fetchGraphQL } from '@helpers/contentful';
import Image from '@components/BreadCrumb/Image';
import Link from 'next/link';
import GridContainer from '@components/Layout/GridContainer';
import Card from '@components/Layout/Card';
import plp from '@queries/plp.graphql';

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
                    <Link href={`/${producto.categoriaPrincipal.slug}/${producto.url}`}>
                        <Image
                            fill
                            src={producto.portada.url}
                            alt={producto.nombre}
                            priority={index === 0}
                            width={600}
                            height={850}
                        />
                    </Link>
                </Card>
            ))}
        </GridContainer>
    );
}
