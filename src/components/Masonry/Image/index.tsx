import NextImage from 'next/image';
import Link from 'next/link';
import styles from './image.module.css';
import { shimmer, toBase64, calculateImageSize } from '@helpers/image';

const Image = ({ priority = false, product, maxWidth = 320, category }: ImageProps) => {
    const { widthForCloudinary, heightForCloudinary, width, height } = calculateImageSize(product, maxWidth);

    return (
        <Link href={`/${category ?? product.category}/${product.url}#top`} id={product.url}>
            <NextImage
                className={styles.masonry__item__image}
                priority={priority}
                quality={100}
                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}h_${heightForCloudinary},w_${widthForCloudinary},f_auto/${product.image.url}`}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
                alt={product.name}
                width={width}
                height={height}
            />
        </Link>
    );
};

export default Image;
