import { fetchGraphQL } from '@helpers/contentful';
import Image from '@components/Image';
import GridContainer from '@components/Layout/GridContainer';
import Card from '@components/Layout/Card';
import plp from '@queries/plp.graphql';
import Link from 'next/link';

export const runtime = 'edge';

const getProducts = async () => {
    const { data } = await fetchGraphQL(plp);
    return data.productoCollection.items as ContentfulProduct[];
};

const Home = async () => {
    const data = await getProducts();
    return (
        <GridContainer>
            {data.map((producto: ContentfulProduct, index: number) => (
                <Card key={producto.nombre}>
                    <Link href={`/${producto.categoriaPrincipal.slug}/${producto.url}`}>
                        <Image
                            fill
                            src={producto.portada.url}
                            alt={producto.nombre}
                            priority={index === 0}
                            width={572}
                            height={762}
                        />
                    </Link>
                </Card>
            ))}
        </GridContainer>
    );
};

export default Home;
