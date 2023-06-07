'use client';
import { useState, useEffect } from 'react';
import useCart from '@hooks/useCart';
import styles from './cart.module.css';
import Icon from '@components/Icon';

const Cart = () => {
    const cart = useCart();
    const [openCart, setOpenCart] = useState<boolean>(false);
    const [animationStarted, setAnimationStarted] = useState(false);

    useEffect(() => {
        setAnimationStarted(true);
    }, [cart.items]);

    return (
        <div className={styles.cart}>
            <Icon
                onClick={() => setOpenCart((open) => !open)}
                width={43}
                height={27}
                strokeWidth={1.2}
                scale={1.2}
                onAnimationEnd={() => setAnimationStarted(false)}
                className={` ${animationStarted ? styles.cart__icon__animation : ''}`}
            >
                {Icon.type.cart(cart.totalItems().toString())}
            </Icon>
            <dialog open={openCart} className={styles.cart__dialog}>
                <header>
                    <span className={styles.cart__dialog__title}>Mi carrito</span>
                    <Icon onClick={() => setOpenCart(false)} width={30} height={30} strokeWidth={1.2}>
                        {Icon.type.close}
                    </Icon>
                </header>
                <main>
                    {cart.items.map((item) => (
                        <div className={styles.cart__dialog__product} key={`${item.id}-${item.size}`}>
                            <div className={styles.cart__dialog__product__name}>
                                <div>{item.name}</div>
                                <div>{`${item.price} €`}</div>
                                <div>{item.size.split(':')[0]}</div>
                            </div>
                            <div className={styles.cart__dialog__product__quantity}>
                                <Icon onClick={() => cart.decrementQuantity(item.id, item.size)} width={20} height={20}>
                                    {Icon.type.decrement}
                                </Icon>
                                {item.quantity}
                                <Icon onClick={() => cart.incrementQuantity(item.id, item.size)} width={20} height={20}>
                                    {Icon.type.increment}
                                </Icon>
                            </div>
                            <div className={styles.cart__dialog__product__delete}>
                                <Icon onClick={() => cart.removeFromCart(item.id, item.size)} width={24} height={24}>
                                    {Icon.type.remove}
                                </Icon>
                            </div>
                        </div>
                    ))}
                </main>
                <footer>
                    {cart.items.length > 0 ? (
                        <>
                            <p>Número de prendas: {cart.totalItems()}</p>
                            <p>Precio total: {cart.totalCost()} €</p>
                        </>
                    ) : (
                        <p>No hay productos añadidos todavía</p>
                    )}
                </footer>
            </dialog>
        </div>
    );
};

export default Cart;
