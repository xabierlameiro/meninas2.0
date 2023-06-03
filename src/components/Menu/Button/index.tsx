'use client';
import { useState } from 'react';
import styles from './button.module.css';
import Icon from '@components/Icon';

const Button = ({ children }: Children) => {
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <div className={styles.container}>
            <Icon onClick={() => setOpenMenu((open) => !open)} width={20} height={18} strokeWidth={1.3} scale={1.2}>
                {Icon.type.menu}
            </Icon>
            <dialog open={openMenu} onMouseLeave={() => setOpenMenu(false)} className={styles.menu}>
                <Icon onClick={() => setOpenMenu(false)} width={30} height={30} strokeWidth={1.2}>
                    {Icon.type.close}
                </Icon>
                {children}
            </dialog>
        </div>
    );
};

export default Button;
