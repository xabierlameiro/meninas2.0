'use client';
import useBoundStore from '@hooks/useBoundStore';
import styles from './cart.module.css';
import dynamic from 'next/dynamic';
import Icons from '@components/Icon/icons.constants';

const Icon = dynamic(() => import('@components/Icon'), { ssr: true });

const Cart = () => {
    const cart = useBoundStore();

    return (
        <div className={styles.cart}>
            <Icon viewBoxAspectRatio onClick={cart.openCart} width={43} height={27} strokeWidth={1.2} scale={1.2}>
                {Icons.cart(cart.totalItems().toString())}
            </Icon>
            <div className={`${styles.cart__dialog} ${cart.isCartOpen ? styles.open : ''}`}>
                <header>
                    <span className={styles.cart__dialog__title}>Mi carrito</span>
                    <Icon onClick={cart.closeCart} width={30} height={30} strokeWidth={1.2}>
                        {Icons.close}
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
                                <Icon
                                    width={20}
                                    height={20}
                                    onClick={() => cart.decrementQuantity(item.id, item.size)}
                                    className={cart.isDecrementable(item.id, item.size) ? '' : styles.disabled}
                                    title={
                                        cart.isDecrementable(item.id, item.size)
                                            ? 'Quitar una unidad'
                                            : 'Lo sentimos, no puedes quitar más unidades'
                                    }
                                >
                                    {Icons.decrement}
                                </Icon>
                                {item.quantity}
                                <Icon
                                    width={19}
                                    height={19}
                                    onClick={() => cart.incrementQuantity(item.id, item.size)}
                                    className={cart.isIncrementable(item.id, item.size) ? '' : styles.disabled}
                                    title={
                                        cart.isIncrementable(item.id, item.size)
                                            ? 'Añadir una unidad'
                                            : 'Lo sentimos, no hay más unidades disponibles'
                                    }
                                >
                                    {Icons.increment}
                                </Icon>
                            </div>
                            <div className={styles.cart__dialog__product__delete}>
                                <Icon
                                    onClick={() => cart.removeFromCart(item.id, item.size)}
                                    width={18}
                                    height={18}
                                    title={'Eliminar producto del carrito'}
                                >
                                    {Icons.remove}
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
                            <button type="submit" role="link" className={styles.footer__checkout}>
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
