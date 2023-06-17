'use client';
import useBoundStore from '@hooks/useBoundStore';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const AddButton = dynamic(() => import('./AddButton'), { ssr: true });
const SizesSelector = dynamic(() => import('./SizesSelector'), { ssr: true });

const AddToCart = ({ item }: AddtoCartProps) => {
    const [selectedSize, setSelectedSize]: StringState = useState('');
    const cart = useBoundStore();
    const options = cart.getAvailableSizes(item);

    return (
        <div>
            <SizesSelector options={options} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
            <AddButton item={item} selectedSize={selectedSize} setSelectedSize={setSelectedSize} />
        </div>
    );
};

export default AddToCart;
