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
                let width, height;
                if (product.portada.width > 2000) {
                    width = Math.floor(product.portada.width / 4);
                    height = Math.floor(product.portada.height / 4);
                } else if (product.portada.width > 1000) {
                    width = Math.floor(product.portada.width / 2);
                    height = Math.floor(product.portada.height / 2);
                } else {
                    width = product.portada.width;
                    height = product.portada.height;
                }

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
                            src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}h_${height},w_${width}/${product.portada.url}`}
                            alt={product.nombre}
                            width={width}
                            height={height}
                            quality={100}
                            layout="responsive"
                            style={{
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
