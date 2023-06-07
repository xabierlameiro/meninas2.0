'use client';
import useCart from '@hooks/useCart';
import { useMemo, useState } from 'react';
import styles from './button.module.css';
import useModal from '@hooks/useModal';
import Selector from '@components/SizesSelector';

const AddToCartButton: React.FC<AddtoCartProps> = ({ item, sizes }) => {
    const cart = useCart();
    const [selectedSize, setSelectedSize]: StringState = useState('');
    const { open } = useModal();

    const options = useMemo(() => {
        const sizesOnCart = cart.items
            .filter((i) => i.id === item.id && i.quantity >= Number(i.size.split(':')[1]))
            .map((i) => i.size);
        const restSizes = sizes.filter((o) => !sizesOnCart.find((s) => s === o));

        return restSizes;
    }, [cart.items, item.id, sizes]);

    return (
        <div className={styles.pdp__add_to_cart}>
            <>
                <Selector options={options} selectedSize={selectedSize} onChange={setSelectedSize} />
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
            </>
        </div>
    );
};

export default AddToCartButton;
