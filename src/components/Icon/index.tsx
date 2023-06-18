'use client';
import styles from './icon.module.css';
import icons from './icons.constants';

const Icon = ({
    tabIndex,
    onClick,
    width,
    height,
    title,
    fill = 'none',
    scale = 1,
    strokeWidth = 1.5,
    className,
    onAnimationEnd,
    viewBoxAspectRatio = false,
    value,
    type,
}: Children & IconProps & { type: keyof typeof icons }) => {
    const Path = icons[type];

    return (
        <div title={title}>
            <svg
                tabIndex={tabIndex ?? 0}
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
                <Path value={value ?? 0} />
            </svg>
        </div>
    );
};

Icon.icons = icons;

export default Icon;
