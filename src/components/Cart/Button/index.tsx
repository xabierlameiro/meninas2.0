'use client';
import useCart from '@/hooks/useCart';

const AddToCartButton: React.FC<AddtoCartProps> = ({ item }) => {
    const cart = useCart();

    return (
        <div>
            <button onClick={() => cart.addToCart(item)}>Add to cart</button>
        </div>
    );
};

export default AddToCartButton;
