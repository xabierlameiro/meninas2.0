import React from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';

const Modal = React.memo(({ isOpen, onClose, actions, children }: ModalProps) => {
    const handleClose = React.useCallback(() => {
        onClose();
    }, [onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <>
            <div className={styles.modal__backdrop} />
            <div className={styles.modal}>
                <div className={styles.modal__content}>
                    <div className={styles.modal__header}>
                        <button className={styles.modal__close} onClick={handleClose}>
                            X
                        </button>
                    </div>
                    <div className={styles.modal__body}>{children}</div>
                    <div className={styles.modal__footer}>{actions}</div>
                </div>
            </div>
        </>,
        document.getElementById('modal') as HTMLElement
    );
});

Modal.displayName = 'Modal';

export default Modal;
