type IconProps = {
    title?: string;
    tabIndex?: number;
    fill?: string;
    onClick?: Function;
    width: number;
    height: number;
    strokeWidth?: number;
    scale?: number;
    className?: string;
    onAnimationEnd?: () => void;
    viewBoxAspectRatio?: boolean;
};

type Icon = React.ReactNode;

type Icons = {
    [key: string]: Icon;
};
