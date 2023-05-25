import styles from './header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <h1>Header</h1>
            <button className="snipcart-checkout">Click here to checkout</button>
            <span className="snipcart-items-count" />
            <span className="snipcart-total-price" />
            <button className="snipcart-customer-signin">My account</button>
        </header>
    );
};

export default Header;
