import { fetchGraphQL } from '@helpers/contentful';
import Image from '@components/Image';
import AddToCartButton from '@components/Cart/Button';
import NavigationProducts from '@components/NavigationProducts';
import styles from './page.module.css';
import pdp from '@queries/pdp.graphql';

export const runtime = 'edge';

async function getProductBySlug(product: string, category: string) {
    const { data } = await fetchGraphQL(pdp, { product, category });
    return {
        detail: data?.detail.items[0] as Detail,
        products: data?.products.items as Pick<Product, 'url'>[],
        thumbnails: data?.detail.items[0].thumbnails.items as ThumbNail[],
    };
}

export default async function Page({ params }: { params: { product: string; category: string } }) {
    const { product, category } = params;
    const {
        detail: { sys, nombre, precio, portada, stock },
        products,
        thumbnails,
    } = await getProductBySlug(product, category);

    return (
        <>
            <div className={styles.pdp}>
                <div className={styles.pdp__image}>
                    <Image
                        fill
                        priority
                        width={572}
                        height={762}
                        src={portada.url}
                        alt={nombre}
                        thumbnails={thumbnails}
                        showLoading
                        quality={100}
                        sizes="(max-width: 767px) 342px, (min-width: 768px) 924px"
                    />
                    <NavigationProducts listOfProducts={products} productSlug={product} categorySlug={category} />
                </div>
                <div className={styles.pdp__info}>
                    <div data-testid="price" className={styles.pdp__price}>
                        {precio} € <span className={styles.pdp__price__vat}>IVA + envío incluido</span>
                    </div>
                    <AddToCartButton
                        item={{
                            id: sys.id,
                            name: nombre,
                            price: precio,
                            image: portada.url,
                        }}
                        sizes={stock}
                    />
                </div>
            </div>
        </>
    );
}
