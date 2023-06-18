import styles from './selector.module.css';
import useBoundStore from '@hooks/useBoundStore';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import { set } from 'zod';

const Icon = dynamic(() => import('@components/Icon'), { ssr: true });

const Selector = ({ options, selectedSize, setSelectedSize }: SelectorProps) => {
    const { isSizeSelectorOpen, openSizeSelector, closeSizeSelector } = useBoundStore();

    useEffect(() => {
        return () => {
            setSelectedSize('');
            closeSizeSelector();
        };
    }, [setSelectedSize, closeSizeSelector]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.select} onClick={openSizeSelector}>
                <div className={styles.selectedOption}>{selectedSize || 'Seleccionar talla'}</div>
                <Icon width={24} height={24} className={styles.icon} title="Seleccionar talla" type="chevronDown" />
            </div>
            <div className={styles.modalContainer}>
                <div className={`${styles.modal} ${isSizeSelectorOpen ? styles.modalOpen : styles.modalClosed}`}>
                    <div className={styles.modalContent}>
                        <Icon
                            width={24}
                            height={24}
                            onClick={closeSizeSelector}
                            className={styles.closeIcon}
                            title="Cerrar"
                            type="close"
                        />

                        <div className={styles.container}>
                            {!options.length ? (
                                <div className={`${styles.option} ${styles.no_sizes_message}`}>
                                    No hay tallas disponibles
                                </div>
                            ) : (
                                options.map((option) => {
                                    return (
                                        <div
                                            key={option.size}
                                            className={`
                                    ${styles.option} 
                                    ${option.size === selectedSize ? styles.selected : ''}
                                    ${option.quantity <= 0 ? styles.out_of_stock : ''}
                                `}
                                            onClick={() => {
                                                if (option.quantity <= 0) return;
                                                setSelectedSize?.(option.size);
                                                closeSizeSelector();
                                            }}
                                        >
                                            <div>
                                                {option.size}
                                                {option.quantity <= 0 ? <div>¡No disponible! Lo quiero</div> : null}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Selector;
