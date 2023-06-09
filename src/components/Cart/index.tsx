'use client';
import { useState, useEffect } from 'react';
import useCart from '@hooks/useCart';
import styles from './cart.module.css';
import Icon from '@components/Icon';

const Cart = () => {
    const cart = useCart();
    const [openCart, setOpenCart]: BooleanState = useState(false);
    const [animationStarted, setAnimationStarted]: BooleanState = useState(false);

    useEffect(() => {
        setAnimationStarted(true);
    }, [cart.items]);

    return (
        <div className={styles.cart}>
            <Icon
                viewBoxAspectRatio
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
                    {cart.items.length > 0 && (
                        <div className={styles.cart__dialog__header}>
                            <div className={styles.cart__dialog__header__name}>Prenda</div>
                            <div className={styles.cart__dialog__header__price}>Precio</div>
                            <div className={styles.cart__dialog__header__size}>Talla</div>
                            <div className={styles.cart__dialog__header__quantity}>Cantidad</div>
                            <div />
                        </div>
                    )}

                    {cart.items.map((item) => (
                        <div className={styles.cart__dialog__product} key={`${item.id}-${item.size}`}>
                            <div className={styles.cart__dialog__product__name}>
                                <div title={item.name}>{item.name}</div>
                            </div>
                            <div className={styles.cart__dialog__product__price}>{item.price} €</div>
                            <div className={styles.cart__dialog__product__size}>{item.size.split(':')[0]}</div>
                            <div className={styles.cart__dialog__product__quantity}>
                                <Icon onClick={() => cart.decrementQuantity(item.id, item.size)} width={20} height={20}>
                                    {Icon.type.decrement}
                                </Icon>
                                {item.quantity}
                                <Icon onClick={() => cart.incrementQuantity(item.id, item.size)} width={19} height={19}>
                                    {Icon.type.increment}
                                </Icon>
                            </div>
                            <div className={styles.cart__dialog__product__delete}>
                                <Icon onClick={() => cart.removeFromCart(item.id, item.size)} width={18} height={18}>
                                    {Icon.type.remove}
                                </Icon>
                            </div>
                        </div>
                    ))}
                </main>
                <footer>
                    {cart.items.length > 0 ? (
                        <div className={styles.footer__total}>
                            <div className={styles.footer__total__shipping}>
                                <div className={styles.footer__total__shipping__title}>Número de prendas</div>
                                <div className={styles.footer__total__shipping__value}>{cart.totalItems()}</div>
                            </div>
                            <div className={styles.footer__total__price}>
                                <div className={styles.footer__total__price__title}>Precio total</div>
                                <div className={styles.footer__total__price__value}>{cart.totalCost()} €</div>
                            </div>
                            <div className={styles.footer__disclaimer}>Envío y impuestos incluidos</div>
                            <form action="/api/checkout" method="POST">
                                <button type="submit" role="link" className={styles.footer__checkout}>
                                    Finalizar compra
                                </button>
                            </form>
                        </div>
                    ) : (
                        <p>No hay productos añadidos todavía</p>
                    )}
                </footer>
            </dialog>
        </div>
    );
};

export default Cart;
