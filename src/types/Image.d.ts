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
    images: ThumbNail[];
    onLoading: (loading: boolean) => void;
    setSrc: (src: string) => void;
} & Pick<ImageProps, 'src'>;

type ThumbNail = {
    sys: {
        id: string;
    };
    url: string;
    title: string;
};

type LoaderProps = { loading: boolean };
