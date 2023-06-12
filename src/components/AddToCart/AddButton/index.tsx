import useCart from '@hooks/useCart';
import useSizeSelector from '@hooks/useSizeSelector';
import styles from './button.module.css';

const AddToCartButton = ({ item, selectedSize, setSelectedSize }: any) => {
    const { addToCart } = useCart();
    const { open } = useSizeSelector();

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
