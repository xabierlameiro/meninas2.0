import styles from './modal.module.css';
import Icon from '@components/Icon';
import useModal from '@hooks/useModal';
import { toggleBodyOverflow } from '@helpers/scroll';

const Modal = ({ children }: Children) => {
    const { close, isOpen } = useModal();

    toggleBodyOverflow(isOpen);

    return (
        <div className={styles.container}>
            <div className={`${styles.modal} ${isOpen ? styles.modalOpen : styles.modalClosed}`}>
                <div className={styles.modalContent}>
                    <Icon width={24} height={24} onClick={() => close()} className={styles.closeIcon}>
                        {Icon.type.close}
                    </Icon>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
