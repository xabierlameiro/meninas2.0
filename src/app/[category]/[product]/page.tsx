import { fetchGraphQL } from '@helpers/contentful';
import NavigationProducts from '@components/NavigationProducts';
import styles from './page.module.css';
import pdp from '@queries/pdp.graphql';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Icons from '@components/Icon/icons.constants';
import Icon from '@components/Icon';
import { headers } from 'next/headers';

const AddToCart = dynamic(() => import('@components/AddToCart'), { ssr: true });
const PDPImage = dynamic(() => import('@components/PDPImage'), { ssr: true });

const getProductBySlug = async (product: string, category: string) => {
    const { data } = await fetchGraphQL(pdp, { product, category });
    const headersList = headers();
    const isMobile = headersList.get('user-agent')?.includes('Mobile');
    return {
        isMobile,
        detail: data?.detail.items[0] as ContentfulProduct,
        products: data?.products.items as ContentfulProduct[],
        thumbnails: data?.detail.items[0].thumbnails.items as ThumbNail[],
    };
};

const ProductPage = async ({ params }: PathParamsProps) => {
    const { product, category } = params;
    const {
        isMobile,
        detail,
        detail: { sys, nombre, precio, portada, stock, descripcion, categoriasCollection },
        products,
        thumbnails,
    } = await getProductBySlug(product, category);

    let maxDiscount = Math.max(...categoriasCollection.items.map((categoria) => categoria.descuento));

    maxDiscount = 0;

    const shipping = Math.max(...categoriasCollection.items.map((categoria) => categoria?.envio?.cantidad ?? 0));

    return (
        <>
            <div className={styles.pdp}>
                <div className={styles.pdp__image}>
                    <PDPImage product={detail} thumbnails={thumbnails} isMobile={isMobile} />
                </div>
                <div className={styles.pdp__info}>
                    <NavigationProducts listOfProducts={products} productSlug={product} categorySlug={category} />
                    <div className={styles.pdp__name}>{nombre}</div>
                    <div className={styles.pdp__description}>{descripcion}</div>

                    <div data-testid="price" className={styles.pdp__price}>
                        {maxDiscount > 0 && (
                            <div className={styles.pdp__price__wrapper}>
                                <span className={styles.pdp__price__original}>{precio}€</span>
                                <span className={styles.pdp__price__discount__tag}>-{maxDiscount}%</span>
                            </div>
                        )}
                        <span className={styles.pdp__price__final}>
                            {Math.round(precio - (precio * maxDiscount) / 100)} €
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
                        {categoriasCollection.items
                            .sort((a, b) => b.descuento - a.descuento)
                            .map((categoria) => (
                                <Link key={categoria.slug} href={`/${categoria.slug}`}>
                                    {categoria.nombre}
                                </Link>
                            ))}
                    </div>

                    <AddToCart
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
