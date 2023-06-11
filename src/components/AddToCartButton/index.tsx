'use client';
import styles from './button.module.css';

const AddToCartButton = ({ item, selectedSize, setSelectedSize }: any) => {
    return (
        <div className={styles.pdp__add_to_cart}>
            <button
                className={styles.pdp__add_to_cart__button}
                onClick={async () => {
                    const cart = await import('@hooks/useCart').then((m) => m.default());
                    const { open } = await import('@hooks/useModal').then((m) => m.default());

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

export default AddToCartButton;
