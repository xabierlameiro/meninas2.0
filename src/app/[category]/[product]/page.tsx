import { fetchGraphQL } from '@helpers/contentful';
import Image from '@components/Masonry/Image';
import NavigationProducts from '@components/NavigationProducts';
import styles from './page.module.css';
import pdp from '@queries/pdp.graphql';
import dynamic from 'next/dynamic';
import { shimmer, toBase64, calculateImageSize } from '@helpers/image';
import NextImage from 'next/image';

const CartManager = dynamic(() => import('@components/CartManager'), { ssr: true });

export const runtime = 'edge';

const getProductBySlug = async (product: string, category: string) => {
    const { data } = await fetchGraphQL(pdp, { product, category });
    return {
        detail: data?.detail.items[0] as ContentfulProduct,
        products: data?.products.items as ContentfulProduct[],
        thumbnails: data?.detail.items[0].thumbnails.items as ThumbNail[],
    };
};

const ProductPage = async ({ params }: PathParamsProps) => {
    const { product, category } = params;
    const {
        detail,
        detail: { sys, nombre, precio, portada, stock, descripcion },
        products,
        thumbnails,
    } = await getProductBySlug(product, category);
    const { widthForCloudinary, heightForCloudinary, width, height } = calculateImageSize(detail, 800);

    return (
        <>
            <div className={styles.pdp}>
                <div className={styles.pdp__image}>
                    <NextImage
                        className={styles.masonry__item__image}
                        priority
                        quality={100}
                        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}h_${heightForCloudinary},w_${widthForCloudinary}/${detail.portada.url}`}
                        placeholder="blur"
                        blurDataURL={`${process.env.NEXT_PUBLIC_BASE64_URL}${toBase64(shimmer(width, height))}`}
                        alt={detail.nombre}
                        width={width}
                        height={height}
                    />
                    <NavigationProducts listOfProducts={products} productSlug={product} categorySlug={category} />
                </div>
                <div className={styles.pdp__info}>
                    <div data-testid="price" className={styles.pdp__price}>
                        {precio} € <span className={styles.pdp__price__vat}>IVA + envío incluido</span>
                    </div>
                    <CartManager
                        item={{
                            id: sys.id,
                            name: nombre,
                            description: descripcion,
                            price: precio,
                            image: portada.url,
                        }}
                        sizes={stock}
                    />
                </div>
            </div>
        </>
    );
};

export default ProductPage;
