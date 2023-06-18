'use client';
import useBoundStore from '@hooks/useBoundStore';
import { useState } from 'react';
import dynamic from 'next/dynamic';

const AddButton = dynamic(() => import('./AddButton'), { ssr: true });
const SizesSelector = dynamic(() => import('./SizesSelector'), { ssr: true });

const AddToCart = ({ item }: AddtoCartProps) => {
    const cart = useBoundStore();

    return (
        <div>
            <SizesSelector
                options={cart.getAvailableSizes(item)}
                selectedSize={cart.selectedSize}
                setSelectedSize={cart.setSelectedSize}
            />
            <AddButton item={item} selectedSize={cart.selectedSize} setSelectedSize={cart.setSelectedSize} />
        </div>
    );
};

export default AddToCart;
