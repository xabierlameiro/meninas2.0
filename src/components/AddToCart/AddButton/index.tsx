import useBoundStore from '@hooks/useBoundStore';
import styles from './button.module.css';

const AddToCartButton = ({ item, selectedSize, setSelectedSize }: any) => {
    const { addToCart, openSizeSelector } = useBoundStore();

    return (
        <div className={styles.pdp__add_to_cart}>
            <button
                className={styles.pdp__add_to_cart__button}
                onClick={() => {
                    if (selectedSize) {
                        addToCart({
                            ...item,
                            id: item.id,
                            size: selectedSize,
                            quantity: 1,
                        });
                        setSelectedSize('');
                    } else {
                        openSizeSelector();
                    }
                }}
            >
                Añadir al carrito
            </button>
        </div>
    );
};

export default AddToCartButton;
