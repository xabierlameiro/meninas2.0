import { fetchGraphQL } from '@helpers/contentful';
import NavigationProducts from '@components/NavigationProducts';
import styles from './page.module.css';
import pdp from '@queries/pdp.graphql';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Icons from '@components/Icon/icons.constants';
import Icon from '@components/Icon';
import { headers } from 'next/headers';

const AddToCart = dynamic(() => import('@components/AddToCart'), {
    ssr: false,
    loading: () => <div>Mirando el almacén...</div>,
});
const PDPImage = dynamic(() => import('@components/PDPImage'), { ssr: true });

const getProductBySlug = async (product: string, category: string) => {
    const { data } = await fetchGraphQL(pdp, { product, category });
    const headersList = headers();
    const isMobile = headersList.get('user-agent')?.includes('Mobile');
    return {
        isMobile,
        productDetail: data?.detail.items[0] as ContentfulProduct,
        otherProducts: data?.products.items as ContentfulProduct[],
        thumbnails: data?.detail.items[0].thumbnails.items as ThumbNail[],
    };
};

const ProductPage = async ({ params }: PathParamsProps) => {
    const { product, category } = params;
    const { isMobile, productDetail, otherProducts, thumbnails } = await getProductBySlug(product, category);

    const maxDiscount = Math.max(...productDetail.categoriasCollection.items.map((categoria) => categoria.descuento));

    const shipping = Math.max(
        ...productDetail.categoriasCollection.items.map((categoria) => categoria?.envio?.cantidad ?? 0)
    );

    return (
        <>
            <div className={styles.pdp}>
                <div className={styles.pdp__image}>
                    <PDPImage product={productDetail} thumbnails={thumbnails} isMobile={isMobile} />
                </div>
                <div className={styles.pdp__info}>
                    <NavigationProducts listOfProducts={otherProducts} productSlug={product} categorySlug={category} />
                    <div className={styles.pdp__name}>{productDetail.nombre}</div>
                    <div className={styles.pdp__description}>{productDetail.descripcion}</div>

                    <div data-testid="price" className={styles.pdp__price}>
                        {maxDiscount > 0 && (
                            <div className={styles.pdp__price__wrapper}>
                                <span className={styles.pdp__price__original}>{productDetail.precio}€</span>
                                <span className={styles.pdp__price__discount__tag}>-{maxDiscount}%</span>
                            </div>
                        )}
                        <span className={styles.pdp__price__final}>
                            {Math.round(productDetail.precio - (productDetail.precio * maxDiscount) / 100)} €
                        </span>
                        <span className={styles.pdp__price__vat}>IVA incluido</span>
                    </div>

                    {shipping > 0 && (
                        <span className={styles.pdp__price__shipping}>
                            <Icon width={20} height={20} title="Envío">
                                {Icons.truck}
                            </Icon>
                            {shipping} € de envío por pedido
                        </span>
                    )}
                    <div className={styles.pdp__tags}>
                        {productDetail.categoriasCollection.items
                            .sort((a, b) => b.descuento - a.descuento)
                            .map((categoria) => (
                                <Link key={categoria.slug} href={`/${categoria.slug}`}>
                                    {categoria.nombre}
                                </Link>
                            ))}
                    </div>

                    <AddToCart
                        item={{
                            id: productDetail.sys.id,
                            name: productDetail.nombre,
                            description: productDetail.descripcion,
                            price: productDetail.precio,
                            image: productDetail.portada.url,
                            discount: maxDiscount,
                            shipping,
                        }}
                        sizes={productDetail.stock}
                    />
                </div>
            </div>
        </>
    );
};

export default ProductPage;
