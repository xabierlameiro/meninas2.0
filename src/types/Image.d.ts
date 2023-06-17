type ImageProps = {
    thumbnails?: ThumbNail[];
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

type ThumbNailsProps = {
    images: ThumbNails;
    onLoading: (loading: boolean) => void;
    setSrc: (src: string) => void;
    isMobile?: boolean;
} & Pick<ImageProps, 'src'>;

type LoaderProps = { loading: boolean };
