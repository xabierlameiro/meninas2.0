'use client';
import { useState, useEffect } from 'react';
import useCart from '@/hooks/useCart';
import styles from './cart.module.css';

const Cart = () => {
    const cart = useCart();
    const [openCart, setOpenCart] = useState<boolean>(false);
    const [animationStarted, setAnimationStarted] = useState(false);

    useEffect(() => {
        setAnimationStarted(true);
    }, [cart.items]);

    return (
        <div className={styles.cart}>
            <div
                aria-label="Mi carrito de la compra"
                aria-haspopup="dialog"
                aria-expanded={openCart}
                onClick={() => setOpenCart(!openCart)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setOpenCart(!openCart);
                    }
                }}
                role="button"
                title="Mi carrito de la compra"
                tabIndex={0}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 -6 45 40"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    width={45}
                    height={40}
                    className={styles.cart__icon}
                >
                    <path
                        transform="scale(1.2)"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                    <text
                        x="26"
                        y="22"
                        fontSize="14px"
                        fontWeight={100}
                        dy=".3em"
                        onAnimationEnd={() => setAnimationStarted(false)}
                        className={` ${animationStarted ? styles.cart__icon__text__animation : ''}`}
                    >
                        {cart.totalItems()}
                    </text>
                </svg>
            </div>
            <dialog open={openCart} className={styles.cart__dialog}>
                <header>
                    <span className={styles.cart__dialog__title}>Mi carrito</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => setOpenCart(false)}
                        fill="none"
                        viewBox="5 -2 24 24"
                        strokeWidth={1.3}
                        stroke="currentColor"
                        width={24}
                        height={24}
                        className={styles.cart__dialog__close}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => cart.decrementQuantity(item.id, item.size)}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    width={20}
                                    height={20}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                </svg>
                                {item.quantity}
                                <svg
                                    onClick={() => cart.incrementQuantity(item.id, item.size)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    width={20}
                                    height={20}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                </svg>
                            </div>
                            <div className={styles.cart__dialog__product__delete}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    onClick={() => cart.removeFromCart(item.id, item.size)}
                                    width={20}
                                    height={20}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
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
