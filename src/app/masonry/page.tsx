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
                columns: 5,
                columnGap: '1rem',
                margin: '1rem auto',
            }}
        >
            {data.map((product, index) => {
                let width, height;
                if (product.portada.width > 3000) {
                    width = Math.floor(product.portada.width / 10);
                    height = Math.floor(product.portada.height / 10);
                } else if (product.portada.width > 1800) {
                    width = Math.floor(product.portada.width / 6);
                    height = Math.floor(product.portada.height / 6);
                } else if (product.portada.width > 1000) {
                    width = Math.floor(product.portada.width / 3);
                    height = Math.floor(product.portada.height / 3);
                } else {
                    width = Math.floor(product.portada.width / 2.1);
                    height = Math.floor(product.portada.height / 2.1);
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
                            priority={index < 5}
                            src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}h_${height},w_${width}/${product.portada.url}`}
                            alt={product.nombre}
                            width={width}
                            height={height}
                            layout="responsive"
                            style={{
                                borderRadius: '15px',
                            }}
                        />
                        {/*  <p
                            style={{
                                userSelect: 'all',
                            }}
                        >
                            {product.portada.width}x{product.portada.height}
                        </p> */}
                    </div>
                );
            })}
        </div>
    );
};

export default Home;
