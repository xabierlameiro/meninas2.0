import React from 'react';
import Modal from '@components/SizesSelector/Modal';
import styles from './selector.module.css';
import dynamic from 'next/dynamic';

const Icon = dynamic(() => import('@components/Icon'), { ssr: false }) as any;

const Selector = ({ options, selectedSize, setSelectedSize }: SelectorProps) => {
    return (
        <>
            <div
                className={styles.select}
                onClick={async () => {
                    const { open } = await import('@hooks/useModal').then((m) => m.default());
                    open();
                }}
            >
                <div className={styles.selectedOption}>{selectedSize.split(':')[0] || 'Seleccionar talla'}</div>
                <Icon width={24} height={24} className={styles.icon}>
                    {Icon.type.chevronDown}
                </Icon>
            </div>
            <Modal>
                <div className={styles.container}>
                    {!options.length ? (
                        <div className={`${styles.option} ${styles.no_sizes_message}`}>No hay tallas disponibles</div>
                    ) : (
                        options.map((option) => {
                            const [size, quantity] = option.split(':');
                            return (
                                <div
                                    key={option}
                                    className={`
                                    ${styles.option} 
                                    ${option === selectedSize ? styles.selected : ''}
                                    ${Number(quantity) <= 0 ? styles.out_of_stock : ''}
                                `}
                                    onClick={async () => {
                                        const { close } = await import('@hooks/useModal').then((m) => m.default());
                                        if (Number(quantity) <= 0) return;
                                        setSelectedSize?.(option);
                                        close();
                                    }}
                                >
                                    <div>
                                        {size}
                                        {Number(quantity) <= 0 ? <div>¡No disponible! Lo quiero</div> : null}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </Modal>
        </>
    );
};

export default Selector;
