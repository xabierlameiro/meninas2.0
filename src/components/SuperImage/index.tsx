import { shimmer, toBase64, calculateImageSize } from '@helpers/image';
import NextImage from 'next/image';
import styles from './image.module.css';

type SuperImageProps = {
    product: ContentfulProduct;
};

const SuperImage = ({ product }: SuperImageProps) => {
    const { widthForCloudinary, heightForCloudinary, width, height } = calculateImageSize(product, 1200);

    return (
        <NextImage
            className={styles.masonry__item__image}
            priority
            quality={100}
            src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}h_${heightForCloudinary},w_${widthForCloudinary}/${product.portada.url}`}
            placeholder="blur"
            blurDataURL={`${process.env.NEXT_PUBLIC_BASE64_URL}${toBase64(shimmer(width, height))}`}
            alt={product.nombre}
            width={width}
            height={height}
        />
    );
};

export default SuperImage;
