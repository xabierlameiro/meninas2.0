'use client';
import useCart from '@/hooks/useCart';

const Cart = () => {
    const cart = useCart();

    return (
        <div>
            <h1>Cart</h1>
            <p>Items in cart: {cart.total()}</p>
            <button onClick={() => cart.addToCart({ id: '1', name: 'Test', price: 10, size: 'M', quantity: 1 })}>
                Add to cart
            </button>
            <button onClick={() => cart.removeFromCart('1')}>Remove from cart</button>
        </div>
    );
};

export default Cart;
