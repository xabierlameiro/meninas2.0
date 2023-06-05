import React, { useState } from 'react';
import styles from './modal.module.css';

const Modal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.container}>
            <button onClick={toggleModal}>Abrir modal</button>

            <div className={`${styles.modal} ${isOpen ? styles.modalOpen : styles.modalClosed}`}>
                <div className={styles.modalContent}>
                    <h2>Seleccionar tallas o cantidad</h2>
                    {/* Aquí va el contenido del modal */}
                    <button onClick={toggleModal}>Cerrar modal</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
