import Link from 'next/link';
import styles from './navigation.module.css';

const NavigationProducts = ({ prevUrl, nextUrl }: NavigationProductsProps) => {
    return (
        <div className={styles.navigation}>
            <Link
                href={`/${prevUrl}#top`}
                title="ANTERIOR"
                className={`${styles.navigation__left}
                ${!prevUrl ? styles.navigation__disabled : ''}
            `}
            >
                Anterior
            </Link>
            <div className={styles.navigation__split}>/</div>
            <Link
                href={`/${nextUrl}#top`}
                title="SIGUIENTE"
                className={`${styles.navigation__right}
                ${!nextUrl ? styles.navigation__disabled : ''}
            `}
            >
                Siguiente
            </Link>
        </div>
    );
};

export default NavigationProducts;
