import Link from 'next/link';
import styles from './navigation.module.css';

const NavigationProducts = ({ listOfProducts, productSlug, categorySlug }: NavigationProductsProps) => {
    const currentIndex = listOfProducts.findIndex((item) => item.url === productSlug);
    const prevItem = listOfProducts[currentIndex - 1]?.url;
    const nextItem = listOfProducts[currentIndex + 1]?.url;
    return (
        <div className={styles.navigation}>
            {prevItem && (
                <Link href={`/${categorySlug}/${prevItem}#top`} title="ANTERIOR" className={styles.navigation__left}>
                    Anterior
                </Link>
            )}
            {nextItem && (
                <Link href={`/${categorySlug}/${nextItem}#top`} title="SIGUIENTE" className={styles.navigation__right}>
                    Siguiente
                </Link>
            )}
        </div>
    );
};

export default NavigationProducts;
