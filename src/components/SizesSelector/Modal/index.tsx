import styles from './modal.module.css';
import useModal from '@hooks/useModal';
import { useEffect } from 'react';
import Icons from '@components/Icon/icons.constants';
import dynamic from 'next/dynamic';

const Icon = dynamic(() => import('@components/Icon'), { ssr: false });

const Modal = ({ children }: Children) => {
    const { close, isOpen } = useModal();

    useEffect(() => {
        return () => {
            close();
        };
    }, [close]);

    return (
        <div className={styles.container}>
            <div className={`${styles.modal} ${isOpen ? styles.modalOpen : styles.modalClosed}`}>
                <div className={styles.modalContent}>
                    <Icon width={24} height={24} onClick={() => close()} className={styles.closeIcon}>
                        {Icons.close}
                    </Icon>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
