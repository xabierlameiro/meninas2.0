'use client';
import useCart from '@/hooks/useCart';

const Cart = () => {
    const cart = useCart();
    return (
        <div>
            <h1>Cart</h1>
            <p>Items in cart: {cart.totalItems()}</p>
            <p>Total: {cart.totalCost()}</p>
            {cart.items.map((item) => (
                <div key={`${item.id}-${item.size}`}>
                    <p>
                        {item.name} - {item.price} - {item.quantity} - {item.size} - {item.id}
                    </p>

                    <button onClick={() => cart.removeFromCart(item.id, item.size)}>Remove from cart</button>
                    <button onClick={() => cart.clearCart()}>Clear cart</button>
                </div>
            ))}
        </div>
    );
};

export default Cart;
