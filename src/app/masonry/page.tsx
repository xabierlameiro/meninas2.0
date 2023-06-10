import { fetchGraphQL } from '@helpers/contentful';
import Image from 'next/image';
import plp from '@queries/plp.graphql';

export const runtime = 'edge';

const getProducts = async () => {
    const { data } = await fetchGraphQL(plp);
    return data.productoCollection.items as ContentfulProduct[];
};

function calculateImageSize(product: ContentfulProduct) {
    const maxWidth = 320; // Ancho máximo deseado
    const scale = Math.ceil(product.portada.width / maxWidth);

    const width = Math.floor(product.portada.width / scale);
    const height = Math.floor(product.portada.height / scale);

    const widthForCloudinary = Math.floor(width * 1.5);
    const heightForCloudinary = Math.floor(height * 1.5);

    return { width, height, widthForCloudinary, heightForCloudinary };
}

const Home = async () => {
    const data = await getProducts();
    return (
        <div
            style={{
                width: '100%',
                columns: 5,
            }}
        >
            {data.map((product, index) => {
                const { widthForCloudinary, heightForCloudinary, width, height } = calculateImageSize(product);

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
                            priority={index < 10}
                            quality={100}
                            src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}h_${heightForCloudinary},w_${widthForCloudinary}/${product.portada.url}`}
                            alt={product.nombre}
                            width={width}
                            height={height}
                            style={{
                                borderRadius: '15px',
                            }}
                        />
                        <p
                            style={{
                                userSelect: 'all',
                            }}
                        >
                            {product.portada.width}x{product.portada.height}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;
