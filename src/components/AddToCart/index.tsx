'use client';
import useCart from '@hooks/useCart';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const AddButton = dynamic(() => import('./AddButton'), { ssr: true });
const SizesSelector = dynamic(() => import('./SizesSelector'), { ssr: true });

const AddToCart = ({ item, sizes }: AddtoCartProps) => {
    const [selectedSize, setSelectedSize]: StringState = useState('');
    const cart = useCart();

    const sizesOnCart = new Set(
        cart.items.filter((i) => i.id === item.id && i.quantity >= Number(i.size.split(':')[1])).map((i) => i.size)
    );
    const options = sizes.filter((o) => !sizesOnCart.has(o));

    return (
        <div>
            <SizesSelector options={options} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
            <AddButton item={item} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
        </div>
    );
};

export default AddToCart;
