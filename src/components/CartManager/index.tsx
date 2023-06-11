'use client';
import useCart from '@hooks/useCart';
import { useState } from 'react';
import Selector from '@components/SizesSelector';
import dynamic from 'next/dynamic';

const AddToCartButton = dynamic(() => import('@components/AddToCartButton'), { ssr: true });

const CartManager = ({ item, sizes }: AddtoCartProps) => {
    const [selectedSize, setSelectedSize]: StringState = useState('');
    const cart = useCart();

    const sizesOnCart = new Set(
        cart.items.filter((i) => i.id === item.id && i.quantity >= Number(i.size.split(':')[1])).map((i) => i.size)
    );
    const options = sizes.filter((o) => !sizesOnCart.has(o));

    return (
        <div>
            <Selector options={options} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
            <AddToCartButton item={item} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
        </div>
    );
};

export default CartManager;
