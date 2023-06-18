import useBoundStore from '@hooks/useBoundStore';
import styles from './button.module.css';

type AddButtonProps = {
    item: Product;
    selectedSize: string;
    setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
};

const AddButton = ({ item, selectedSize, setSelectedSize }: AddButtonProps) => {
    const { addToCart, openSizeSelector } = useBoundStore();

    return (
        <div className={styles.pdp__add_to_cart}>
            <button
                className={styles.pdp__add_to_cart__button}
                onClick={() => {
                    if (selectedSize) {
                        addToCart({ ...item, selectedSize });
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

export default AddButton;
