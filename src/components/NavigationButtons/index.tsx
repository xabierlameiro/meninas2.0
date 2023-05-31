import Link from 'next/link';
import styles from './navigation.module.css';

const NavigationButtons = ({ listOfProducts, productSlug, categorySlug }: NavigationButtonsProps) => {
    const { prevItem, nextItem } = listOfProducts.reduce(
        (acc: any, item: any, index: number) => {
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
            {prevItem && <Link href={`/${categorySlug}/${prevItem}`}>Anterior</Link>}
            {nextItem && <Link href={`/${categorySlug}/${nextItem}`}>Siguiente</Link>}
        </div>
    );
};

export default NavigationButtons;
