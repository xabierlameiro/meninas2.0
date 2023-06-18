type ImageProps = {
    priority?: boolean;
    product: Product;
    maxWidth?: number;
    category?: string;
};

type PDPImageProps = {
    product: Product;
    thumbNails?: ThumbNails;
    isMobile?: boolean;
};

type ThumbNailsProps = {
    images: ThumbNails;
    onLoading: (loading: boolean) => void;
    setSrc: (src: string) => void;
    isMobile?: boolean;
} & Pick<ImageProps, 'src'>;

type LoaderProps = { loading: boolean };
