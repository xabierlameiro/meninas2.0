'use client';
import styles from './button.module.css';
import dynamic from 'next/dynamic';
import Icons from '@components/Icon/icons.constants';
import useMenu from '@hooks/useMenu';

const Icon = dynamic(() => import('@components/Icon'), { ssr: true });

const Button = ({ children }: Children) => {
    const { isOpen, toggle, close } = useMenu();

    return (
        <div className={styles.container}>
            <Icon onClick={toggle} width={22} height={24} strokeWidth={1.3} scale={1.2}>
                {Icons.menu}
            </Icon>
            <div className={`${styles.menu} ${isOpen ? styles.open : ''}`} onClick={close}>
                <Icon onClick={close} width={30} height={30} strokeWidth={1.2} className={styles.close}>
                    {Icons.close}
                </Icon>
                {children}
            </div>
        </div>
    );
};

export default Button;
