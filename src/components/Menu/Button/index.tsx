'use client';
import styles from './button.module.css';
import dynamic from 'next/dynamic';
import Icons from '@components/Icon/icons.constants';
import useBoundStore from '@hooks/useBoundStore';

const Icon = dynamic(() => import('@components/Icon'), { ssr: true });

const Button = ({ children }: Children) => {
    const { isMenuOpen, openMenu, closeMenu } = useBoundStore();

    return (
        <div className={styles.container}>
            <Icon onClick={openMenu} width={22} height={24} strokeWidth={1.3} scale={1.2}>
                {Icons.menu}
            </Icon>
            <div className={`${styles.menu} ${isMenuOpen ? styles.open : ''}`} onClick={closeMenu}>
                <Icon onClick={closeMenu} width={30} height={30} strokeWidth={1.2} className={styles.close}>
                    {Icons.close}
                </Icon>
                {children}
            </div>
        </div>
    );
};

export default Button;
