'use client';
import useBoundStore from '@hooks/useBoundStore';
import styles from './cart.module.css';
import dynamic from 'next/dynamic';

const Icon = dynamic(() => import('@components/Icon'), { ssr: true });

const Cart = () => {
    const cart = useBoundStore();

    const handleCheckout = async () => {
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: cart.items }),
            });

            if (!response.ok) throw new Error('Error creating checkout session');

            const { loadStripe } = await import('@stripe/stripe-js');
            const session = await response.json();
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

            if (!stripe) throw new Error('Stripe not loaded');

            await stripe.redirectToCheckout({
                sessionId: session.id,
            });
        } catch (error) {
            console.error(error);
            throw new Error(error as string);
        }
    };
    return (
        <div className={styles.cart}>
            <Icon
                viewBoxAspectRatio
                onClick={cart.openCart}
                width={43}
                height={27}
                strokeWidth={1.2}
                scale={1.2}
                title="Carrito"
                type="cart"
                value={cart.totalItems()}
            />

            <div className={`${styles.cart__dialog} ${cart.isCartOpen ? styles.open : ''}`}>
                <header>
                    <span className={styles.cart__dialog__title}>Mi carrito</span>
                    <Icon onClick={cart.closeCart} width={30} height={30} strokeWidth={1.2} type="close" />
                </header>
                <main>
                    {cart.items.length > 0 && (
                        <div className={styles.cart__dialog__header}>
                            <div className={styles.cart__dialog__header__name}>Prenda</div>
                            <div className={styles.cart__dialog__header__price}>Precio</div>
                            <div className={styles.cart__dialog__header__discount}>Descuento</div>
                            <div className={styles.cart__dialog__header__final_price}>P. Final</div>
                            <div className={styles.cart__dialog__header__size}>Talla</div>
                            <div className={styles.cart__dialog__header__quantity}>Unidades</div>
                            <div />
                        </div>
                    )}

                    {cart.items.map((item) => {
                        return (
                            <div className={styles.cart__dialog__product} key={`${item.id}-${item.selectedSize}`}>
                                <div className={styles.cart__dialog__product__name}>
                                    <div title={item.name}>{item.name}</div>
                                </div>
                                <div className={styles.cart__dialog__product__price}>{item.priceWithoutDiscount} €</div>
                                <div className={styles.cart__dialog__product__discount}>-{item.discount} %</div>
                                <div className={styles.cart__dialog__product__final_price}>
                                    {item.priceWithDiscount} €
                                </div>
                                <div className={styles.cart__dialog__product__size}>{item.selectedSize}</div>
                                <div className={styles.cart__dialog__product__quantity}>
                                    <Icon
                                        width={20}
                                        height={20}
                                        onClick={() => cart.decrementQuantity(item.id, item.selectedSize)}
                                        className={
                                            cart.isDecrementable(item.id, item.selectedSize) ? '' : styles.disabled
                                        }
                                        title={
                                            cart.isDecrementable(item.id, item.selectedSize)
                                                ? 'Quitar una unidad'
                                                : 'Lo sentimos, no puedes quitar más unidades'
                                        }
                                        type="decrement"
                                    />
                                    {item.quantity}
                                    <Icon
                                        width={19}
                                        height={19}
                                        onClick={() => cart.incrementQuantity(item.id, item.selectedSize)}
                                        className={
                                            cart.isIncrementable(item.id, item.selectedSize) ? '' : styles.disabled
                                        }
                                        title={
                                            cart.isIncrementable(item.id, item.selectedSize)
                                                ? 'Añadir una unidad'
                                                : 'Lo sentimos, no hay más unidades disponibles'
                                        }
                                        type="increment"
                                    />
                                </div>
                                <div className={styles.cart__dialog__product__delete}>
                                    <Icon
                                        onClick={() => cart.removeFromCart(item.id, item.selectedSize)}
                                        width={18}
                                        height={18}
                                        title={'Eliminar producto del carrito'}
                                        type="remove"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </main>
                <footer>
                    {cart.items.length > 0 ? (
                        <div className={styles.footer__total}>
                            <div className={styles.footer__basket__items}>
                                <div className={styles.footer__basket__items__title}>Número de prendas</div>
                                <div className={styles.footer__basket__items__value}>{cart.totalItems()}</div>
                            </div>
                            {cart.hasShipping() > 0 && (
                                <div className={styles.footer__total__shipping}>
                                    <div className={styles.footer__total__shipping__title}>Envío</div>
                                    <div className={styles.footer__total__shipping__value}>{cart.hasShipping()} €</div>
                                </div>
                            )}
                            <div className={styles.footer__basket__price}>
                                <div className={styles.footer__basket__price__title}>Precio de la cesta</div>
                                <div className={styles.footer__basket__price__value}>{cart.totalBasketPrice()} €</div>
                            </div>
                            <div className={styles.footer__total__price}>
                                <div className={styles.footer__total__price__title}>Precio final</div>
                                <div className={styles.footer__total__price__value}>{cart.totalCost()} €</div>
                            </div>
                            <div className={styles.footer__disclaimer}>Impuestos incluidos</div>
                            <button
                                type="submit"
                                role="link"
                                className={styles.footer__checkout}
                                onClick={handleCheckout}
                            >
                                Finalizar compra
                            </button>
                        </div>
                    ) : (
                        <p>No hay productos añadidos todavía</p>
                    )}
                </footer>
            </div>
        </div>
    );
};

export default Cart;
