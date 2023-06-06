import React, { useState } from 'react';
import Modal from '@components/SizesSelector/Modal';
import styles from './selector.module.css';
import useModal from '@hooks/useModal';
const Selector: React.FC<WheelPickerProps> = ({ options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState<string>('');
    const modal = useModal();

    return (
        <Modal>
            <div className={styles.container}>
                {!options.length ? (
                    <div className={`${styles.option} ${styles.no_sizes_message}`}>No sizes available</div>
                ) : (
                    options.map((option) => {
                        const [size, quantity] = option.split(':');
                        return (
                            <div
                                key={option}
                                className={`
                                    ${styles.option} 
                                    ${option === selectedOption ? styles.selected : ''}
                                    ${Number(quantity) <= 0 ? styles.out_of_stock : ''}
                                `}
                                onClick={() => {
                                    if (Number(quantity) <= 0) return;
                                    setSelectedOption(option);
                                    modal?.close();
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
    );
};

export default Selector;
