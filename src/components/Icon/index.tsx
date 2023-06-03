import styles from './icon.module.css';
import icons from './icons.constants';

const Icon = ({
    onClick,
    children,
    width,
    height,
    fill = 'none',
    scale = 1,
    strokeWidth = 1.5,
}: Children & IconProps) => {
    return (
        <svg
            tabIndex={0}
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            fill={fill}
            transform={`scale(${scale})`}
            viewBox={`0 0 ${width} ${height}`}
            onClick={() => onClick?.()}
            onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
            strokeWidth={strokeWidth}
            width={width}
            height={height}
            className={styles.icon}
        >
            {children}
        </svg>
    );
};

Icon.type = icons;

export default Icon;
