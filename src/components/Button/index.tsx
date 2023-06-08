'use client';
import useCart from '@hooks/useCart';
import styles from './button.module.css';
import useModal from '@hooks/useModal';

const Button = ({ item, selectedSize, setSelectedSize }: any) => {
    const cart = useCart();
    const { open } = useModal();

    return (
        <div className={styles.pdp__add_to_cart}>
            <button
                className={styles.pdp__add_to_cart__button}
                onClick={() => {
                    if (selectedSize) {
                        cart.addToCart({
                            ...item,
                            id: item.id,
                            size: selectedSize,
                            quantity: 1,
                        });
                        setSelectedSize('');
                    } else {
                        open();
                    }
                }}
            >
                Añadir al carrito
            </button>
        </div>
    );
};

export default Button;
