import React, { useState, useEffect, useRef } from 'react';
import styles from './selector.module.css';

interface Option {
    value: string;
    label: string;
}

interface WheelPickerProps {
    options: Option[];
    onChange: (selectedOption: Option) => void;
    initialOption?: Option;
}

const WheelPicker: React.FC<WheelPickerProps> = ({ options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState<Option>(options[0]);
    const wheelRef = useRef<HTMLDivElement>(null);

    const handleOptionClick = (option: Option) => {
        setSelectedOption(option);
        onChange(option);
        rotateToSelectedOption(option);
    };

    const rotateToSelectedOption = (option: Option) => {
        if (wheelRef.current) {
            const wheelHeight = wheelRef.current.offsetHeight;
            const optionHeight = 40;
            const selectedIndex = options.findIndex((item) => item.value === option.value);
            const centerIndex = Math.floor(options.length / 2);
            const rotation = (centerIndex - selectedIndex) * optionHeight - optionHeight / 2;
            console.log({
                wheelHeight,
                optionHeight,
                selectedIndex,
                centerIndex,
                rotation,
            });
            wheelRef.current.style.transform = `translateY(${rotation}px)`;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wheel} ref={wheelRef}>
                {options.map((option) => (
                    <div
                        key={option.value}
                        className={`${styles.option} ${option.value === selectedOption.value ? styles.selected : ''}`}
                        onClick={() => handleOptionClick(option)}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        </div>
    );
};

const Selector = () => {
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        { value: 'option4', label: 'Option 4' },
        { value: 'option5', label: 'Option 5' },
        { value: 'option6', label: 'Option 6' },
        { value: 'option7', label: 'Option 7' },
        { value: 'option8', label: 'Option 8' },
        { value: 'option9', label: 'Option 9' },
        { value: 'option10', label: 'Option 10' },
    ];

    const handleOptionChange = (selectedOption: any) => {
        console.log('Selected option:', selectedOption);
    };

    return (
        <div className={styles.app}>
            <WheelPicker options={options} onChange={handleOptionChange} />
        </div>
    );
};

export default Selector;
