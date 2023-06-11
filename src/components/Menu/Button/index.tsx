'use client';
import { useState } from 'react';
import styles from './button.module.css';
import dynamic from 'next/dynamic';
import Icons from '@components/Icon/icons.constants';

const Icon = dynamic(() => import('@components/Icon'), { ssr: true });

const Button = ({ children }: Children) => {
    const [openMenu, setOpenMenu]: BooleanState = useState(false);

    return (
        <div className={styles.container}>
            <Icon onClick={() => setOpenMenu((open) => !open)} width={22} height={24} strokeWidth={1.3} scale={1.2}>
                {Icons.menu}
            </Icon>
            <div className={`${styles.menu} ${openMenu ? styles.open : ''}`} onClick={() => setOpenMenu(false)}>
                <Icon onClick={() => setOpenMenu(false)} width={30} height={30} strokeWidth={1.2}>
                    {Icons.close}
                </Icon>
                {children}
            </div>
        </div>
    );
};

export default Button;
