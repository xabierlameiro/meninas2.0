import styles from './header.module.css';
import Cart from '@components/Cart';

const Header = () => {
    return (
        <header className={styles.header}>
            <div></div>
            <h1>Header</h1>
            <Cart />
        </header>
    );
};

export default Header;
