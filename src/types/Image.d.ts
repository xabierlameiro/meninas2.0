type ImageProps = {
    thumbnails?: [];
    showLoading?: boolean;
    onClick?: () => void;
    alt: string;
    title?: string;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
    src: string;
    width: number;
    height: number;
    quality?: number;
};
