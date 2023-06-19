import { fetchGraphQL } from '@helpers/contentful';
import NavigationProducts from '@components/NavigationProducts';
import styles from './page.module.css';
import pdp from '@queries/pdp.graphql';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Icon from '@components/Icon';
import { headers } from 'next/headers';
import { ProductScheme, NavigationProductsScheme } from '@schemes/product';

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
        productDetail: ProductScheme.parse(data.detail.items[0]),
        navigation: NavigationProductsScheme.parse({
            ...data.products,
            productUrl: data.detail.items[0].url,
            category: category,
        }),
    };
};

const ProductPage = async ({ params }: PathParamsProps) => {
    const { product, category } = params;
    const { isMobile, productDetail, navigation } = await getProductBySlug(product, category);

    return (
        <>
            <div className={styles.pdp}>
                <div className={styles.pdp__image}>
                    <PDPImage product={productDetail} thumbNails={productDetail.thumbnails} isMobile={isMobile} />
                </div>
                <div className={styles.pdp__info}>
                    <NavigationProducts {...navigation} />
                    <div className={styles.pdp__name}>{productDetail.name}</div>
                    <div className={styles.pdp__description}>{productDetail.description}</div>
                    <div data-testid="price" className={styles.pdp__price}>
                        {productDetail.discount > 0 && (
                            <div className={styles.pdp__price__wrapper}>
                                <span className={styles.pdp__price__original}>
                                    {productDetail.priceWithoutDiscount}€
                                </span>
                                <span className={styles.pdp__price__discount__tag}>-{productDetail.discount}%</span>
                            </div>
                        )}
                        <span className={styles.pdp__price__final}>{productDetail.priceWithDiscount}€</span>
                        <span className={styles.pdp__price__vat}>IVA incluido</span>
                    </div>

                    {productDetail.shipping > 0 && (
                        <span className={styles.pdp__price__shipping}>
                            <Icon width={20} height={20} title="Envío" type="truck" />
                            {productDetail.shipping} € de envío por pedido
                        </span>
                    )}

                    <div className={styles.pdp__tags}>
                        {productDetail.categories.map((categoria) => (
                            <Link key={categoria.slug} href={`/${categoria.slug}`}>
                                {categoria.name}
                            </Link>
                        ))}
                    </div>

                    <AddToCart item={productDetail} />
                </div>
            </div>
        </>
    );
};

export default ProductPage;
