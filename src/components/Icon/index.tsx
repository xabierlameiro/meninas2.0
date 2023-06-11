'use client';
import styles from './icon.module.css';
import icons from './icons.constants';

const Icon: React.FC<IconProps> & { type: typeof icons } = ({
    onClick,
    children,
    width,
    height,
    fill = 'none',
    scale = 1,
    strokeWidth = 1.5,
    className,
    onAnimationEnd,
    viewBoxAspectRatio = false,
}: Children & IconProps) => {
    return (
        <svg
            tabIndex={0}
            xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            fill={fill}
            transform={`scale(${scale})`}
            viewBox={`${viewBoxAspectRatio ? '0 0 30 30' : '0 0 24 24'}`}
            onClick={() => onClick?.()}
            onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
            strokeWidth={strokeWidth}
            width={width}
            height={height}
            className={`${styles.icon} ${className}`}
            onAnimationEnd={onAnimationEnd}
        >
            {children}
        </svg>
    );
};

Icon.type = icons;

export default Icon;
