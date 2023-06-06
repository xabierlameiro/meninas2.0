'use client';
import useCart from '@hooks/useCart';
import { useCallback, useMemo, useState } from 'react';
import styles from './button.module.css';
import useModal from '@hooks/useModal';
import Selector from '@components/SizesSelector';

const AddToCartButton: React.FC<AddtoCartProps> = ({ item, sizes }) => {
    const cart = useCart();
    const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
    const [selectedQuantity, setSelectedQuantity] = useState<number | undefined>(undefined);
    const modal = useModal();

    const options = useMemo(() => {
        const sizesOnCart = cart.items
            .filter((i) => i.id === item.id && i.quantity >= Number(i.size.split(':')[1]))
            .map((i) => i.size);
        const restSizes = sizes.filter((o) => !sizesOnCart.find((s) => s === o));

        return restSizes;
    }, [cart.items, item.id, sizes]);

    const Sizes = useCallback(() => {
        const sizesOnCart = cart.items
            .filter((i) => i.id === item.id && i.quantity >= Number(i.size.split(':')[1]))
            .map((i) => i.size);
        const restSizes = sizes.filter((o) => !sizesOnCart.find((s) => s === o));

        if (!restSizes.length) return <p>Out of stock</p>;

        return (
            <select
                name="size"
                id="size"
                onChange={(e) => {
                    setSelectedSize(e.target.value);
                    setSelectedQuantity(1);
                }}
                value={selectedSize}
            >
                <option value="">Select size</option>
                {restSizes.map((stock: string) => {
                    const [size, quantity] = stock.split(':');

                    if (Number(quantity) <= 0) return null;

                    return (
                        <option key={stock} value={stock}>
                            {size} ({quantity})
                        </option>
                    );
                })}
            </select>
        );
    }, [cart.items, item.id, selectedSize, sizes]);

    const Quantity = useCallback(() => {
        const quantityOnCart = cart.items
            .filter((i) => i.id === item.id)
            .map((i) => i.quantity)
            .reduce((a, b) => a + b, 0);

        return (
            <input
                type="number"
                name="quantity"
                id="quantity"
                min="1"
                disabled={!selectedSize}
                max={String(Number(selectedSize?.split(':')[1]) - quantityOnCart)}
                onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                value={selectedQuantity}
                onWheel={(e) => e.currentTarget.blur()}
            />
        );
    }, [selectedSize, selectedQuantity, cart.items, item.id]);

    return (
        <div className={styles.pdp__add_to_cart}>
            <>
                <Selector options={options} onChange={(e) => console.log(e)} />
                <button
                    className={styles.pdp__add_to_cart__button}
                    onClick={() => {
                        modal?.open();
                        /*   selectedSize &&
                        cart.addToCart({
                            ...item,
                            id: item.id,
                            size: selectedSize,
                            quantity: selectedQuantity || 1,
                        });
           */
                    }}
                >
                    Añadir al carrito
                </button>
            </>
        </div>
    );
};

export default AddToCartButton;
