import styles from './selector.module.css';
import useBoundStore from '@hooks/useBoundStore';
import Icons from '@components/Icon/icons.constants';
import dynamic from 'next/dynamic';

const Icon = dynamic(() => import('@components/Icon'), { ssr: true });

const Selector = ({ options, selectedSize, setSelectedSize }: SelectorProps) => {
    const { isSizeSelectorOpen, openSizeSelector, closeSizeSelector } = useBoundStore();

    return (
        <div className={styles.wrapper}>
            <div className={styles.select} onClick={openSizeSelector}>
                <div className={styles.selectedOption}>{selectedSize.split(':')[0] || 'Seleccionar talla'}</div>
                <Icon width={24} height={24} className={styles.icon}>
                    {Icons.chevronDown}
                </Icon>
            </div>
            <div className={styles.modalContainer}>
                <div className={`${styles.modal} ${isSizeSelectorOpen ? styles.modalOpen : styles.modalClosed}`}>
                    <div className={styles.modalContent}>
                        <Icon width={24} height={24} onClick={closeSizeSelector} className={styles.closeIcon}>
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
                                                closeSizeSelector();
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
