import styles from './header.module.css';
import Cart from '@components/Cart';
import Menu from '@components/Menu';
import Link from 'next/link';

const Header = () => {
    return (
        <header className={styles.header}>
            {/* @ts-expect-error Server Component */}
            <Menu />
            <Link href="/" title="Link to go to the home page" aria-label="Home">
                <h1 className={styles.brand}>Meninas</h1>
            </Link>
            <Cart />
        </header>
    );
};

export default Header;
