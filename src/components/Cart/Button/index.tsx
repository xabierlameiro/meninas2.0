'use client';
import useCart from '@/hooks/useCart';
import { useState } from 'react';

const AddToCartButton: React.FC<AddtoCartProps> = ({ item, sizes }) => {
    const cart = useCart();
    const [size, setSize] = useState<string>(sizes[0].split(':')[0]);

    return (
        <div>
            <button
                onClick={() =>
                    cart.addToCart({
                        ...item,
                        id: `${item.id}-${size}`,
                        size,
                    })
                }
            >
                Add to cart
            </button>

            <select name="size" id="size" onChange={(e) => setSize(e.target.value)}>
                {sizes.map((o: any) => {
                    const [size, quantity] = o.split(':');
                    const isInCart = cart.items.find((i) => i.id === `${item.id}-${size}`);

                    console.log(`${item.id}-${size}`, isInCart);

                    if (quantity === '0' || isInCart) {
                        return null;
                    }

                    return (
                        <option key={o} value={o}>
                            {size} ({quantity})
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

export default AddToCartButton;
