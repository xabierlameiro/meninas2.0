'use client';
import { useState } from 'react';
import styles from './button.module.css';

const Button = ({ children }: any) => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div className={styles.container}>
            <div
                aria-label="Mi carrito de la compra"
                aria-haspopup="dialog"
                aria-expanded={openMenu}
                onClick={() => setOpenMenu(!openMenu)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        setOpenMenu(!openMenu);
                    }
                }}
                role="button"
                title="Mi carrito de la compra"
                tabIndex={0}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 -4 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    width={30}
                    height={30}
                    className={styles.menuIcon}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </div>
            <dialog open={openMenu} onMouseLeave={() => setOpenMenu(false)} className={styles.menu}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setOpenMenu(false)}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.2}
                    stroke="currentColor"
                    className={styles.menu__close}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                {children}
            </dialog>
        </div>
    );
};

export default Button;
