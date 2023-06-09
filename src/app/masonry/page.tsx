import { fetchGraphQL } from '@helpers/contentful';
import Image from 'next/image';
import plp from '@queries/plp.graphql';

export const runtime = 'edge';

const getProducts = async () => {
    const { data } = await fetchGraphQL(plp);
    return data.productoCollection.items as ContentfulProduct[];
};

const Home = async () => {
    const data = await getProducts();
    return (
        <div
            style={{
                width: '100%',
                columns: 4,
                columnGap: '1rem',
                margin: '1rem auto',
            }}
        >
            {data.map((product, index) => {
                return (
                    <div
                        key={index}
                        style={{
                            width: '100%',
                            marginBottom: '1rem',
                            breakInside: 'avoid',
                        }}
                    >
                        <Image
                            src={product.portada.url}
                            alt={product.nombre}
                            width={product.portada.width}
                            height={product.portada.height}
                            layout="responsive"
                            style={{
                                maxWidth: '100%',
                                borderRadius: '15px',
                            }}
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Home;
