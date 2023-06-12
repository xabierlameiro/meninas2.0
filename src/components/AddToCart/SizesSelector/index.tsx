import styles from './selector.module.css';
import useSizeSelector from '@hooks/useSizeSelector';
import { useEffect } from 'react';
import Icons from '@components/Icon/icons.constants';
import dynamic from 'next/dynamic';

const Icon = dynamic(() => import('@components/Icon'), { ssr: true });

const Selector = ({ options, selectedSize, setSelectedSize }: SelectorProps) => {
    const { isOpen, close, open } = useSizeSelector();

    useEffect(() => {
        return () => {
            close();
        };
    }, [close]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.select} onClick={open}>
                <div className={styles.selectedOption}>{selectedSize.split(':')[0] || 'Seleccionar talla'}</div>
                <Icon width={24} height={24} className={styles.icon}>
                    {Icons.chevronDown}
                </Icon>
            </div>
            <div className={styles.modalContainer}>
                <div className={`${styles.modal} ${isOpen ? styles.modalOpen : styles.modalClosed}`}>
                    <div className={styles.modalContent}>
                        <Icon width={24} height={24} onClick={() => close()} className={styles.closeIcon}>
                            {Icons.close}
                        </Icon>
                        <div className={styles.container}>
                            {!options.length ? (
                                <div className={`${styles.option} ${styles.no_sizes_message}`}>
                                    No hay tallas disponibles
                                </div>
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
                                            onClick={() => {
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Selector;
