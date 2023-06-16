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

    const maxDiscount = Math.max(...categoriasCollection.items.map((categoria) => categoria.descuento));

    return (
        <>
            <div className={styles.pdp}>
                <div className={styles.pdp__image}>
                    <PDPImage product={detail} thumbnails={thumbnails} isMobile={isMobile} />
                </div>
                <div className={styles.pdp__info}>
                    <NavigationProducts listOfProducts={products} productSlug={product} categorySlug={category} />
                    <div className={styles.pdp__name}>{nombre}</div>
                    <div data-testid="price" className={styles.pdp__price}>
                        {maxDiscount > 0 ? (
                            <span className={styles.pdp__price__discount}>
                                <span className={styles.pdp__price__original}>{precio}€</span>
                                <span className={styles.pdp__price__final}>
                                    {Math.round(precio - (precio * maxDiscount) / 100)} €
                                </span>
                            </span>
                        ) : (
                            <span className={styles.pdp__price__normal}>{precio} €</span>
                        )}
                        <span className={styles.pdp__price__vat}>IVA + envío incluido</span>
                    </div>
                    <div className={styles.pdp__tags}>
                        <Icon width={20} height={20} title="Categorias de la prenda">
                            {Icons.label}
                        </Icon>
                        {categoriasCollection.items
                            .sort((a, b) => b.descuento - a.descuento)
                            .map((categoria) => (
                                <Link
                                    key={categoria.slug}
                                    href={`/${categoria.slug}`}
                                    className={categoria.descuento === maxDiscount ? styles.pdp__tag__highlight : ''}
                                >
                                    {categoria.nombre}
                                    {categoria.descuento === maxDiscount && (
                                        <span className={styles.pdp__tag}> {categoria.descuento}%</span>
                                    )}
                                </Link>
                            ))}
                    </div>
                    <div className={styles.pdp__description}>{descripcion}</div>
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
