type ImageProps = {
    thumbnails?: [];
    onClick?: () => void;
    alt: string;
    title?: string;
    fill?: boolean;
    sizes?: string;
    priority?: boolean;
    src: string;
    width: number;
    height: number;
};
