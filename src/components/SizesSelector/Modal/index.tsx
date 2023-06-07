import styles from './modal.module.css';
import Icon from '@components/Icon';
import useModal from '@hooks/useModal';

const Modal = ({ children }: Children) => {
    const modal = useModal();

    if (typeof window !== 'undefined') {
        if (modal?.isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.modal} ${modal?.isOpen ? styles.modalOpen : styles.modalClosed}`}>
                <div className={styles.modalContent}>
                    <Icon width={24} height={24} onClick={() => modal?.close()} className={styles.closeIcon}>
                        {Icon.type.close}
                    </Icon>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
