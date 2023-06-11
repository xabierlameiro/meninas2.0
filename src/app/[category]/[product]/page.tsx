import { fetchGraphQL } from '@helpers/contentful';
import NavigationProducts from '@components/NavigationProducts';
import styles from './page.module.css';
import pdp from '@queries/pdp.graphql';
import dynamic from 'next/dynamic';

const CartManager = dynamic(() => import('@components/CartManager'), { ssr: true });
const PDPImage = dynamic(() => import('@components/PDPImage'), { ssr: true });

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

    return (
        <>
            <div className={styles.pdp}>
                <div className={styles.pdp__image}>
                    <PDPImage product={detail} thumbnails={thumbnails} />
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
