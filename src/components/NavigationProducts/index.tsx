import Link from 'next/link';
import styles from './navigation.module.css';

const NavigationProducts = ({ listOfProducts, productSlug, categorySlug }: NavigationProductsProps) => {
    const { prevItem, nextItem } = listOfProducts.reduce(
        (acc: Urls, item: Product, index: number) => {
            if (item.url === productSlug) {
                acc.prevItem = listOfProducts[index - 1]?.url;
                acc.nextItem = listOfProducts[index + 1]?.url;
            }
            return acc;
        },
        { prevItem: null, nextItem: null }
    );
    return (
        <div className={styles.navigation}>
            {prevItem && (
                <Link href={`/${categorySlug}/${prevItem}`} title="ANTERIOR" className={styles.navigation__left}>
                    Anterior
                </Link>
            )}
            {nextItem && (
                <Link href={`/${categorySlug}/${nextItem}`} title="SIGUIENTE" className={styles.navigation__right}>
                    Siguiente
                </Link>
            )}
        </div>
    );
};

export default NavigationProducts;
