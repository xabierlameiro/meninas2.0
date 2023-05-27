'use client';
import useCart from '@/hooks/useCart';

const Cart = () => {
    const cart = useCart();

    return (
        <div>
            <h1>Cart</h1>
            <p>Items in cart: {cart.total()}</p>
            {cart.items.map((item) => (
                <div key={item.id}>
                    <p>
                        {item.name} - {item.price} - {item.quantity} - {item.size}
                    </p>

                    <button onClick={() => cart.removeFromCart(item.id)}>Remove</button>
                </div>
            ))}
        </div>
    );
};

export default Cart;
