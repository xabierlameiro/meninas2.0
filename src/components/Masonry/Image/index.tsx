import NextImage from 'next/image';
import Link from 'next/link';
import styles from './image.module.css';
import { shimmer, toBase64, calculateImageSize } from '@helpers/image';

const Image = ({ priority, product }: { priority: boolean; product: ContentfulProduct }) => {
    const { widthForCloudinary, heightForCloudinary, width, height } = calculateImageSize(product);

    return (
        <Link href={`/${product.categoriaPrincipal.slug}/${product.url}`}>
            <NextImage
                className={styles.masonry__item__image}
                priority={priority}
                quality={90}
                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}h_${heightForCloudinary},w_${widthForCloudinary}/${product.portada.url}`}
                placeholder="blur"
                blurDataURL={`${process.env.NEXT_PUBLIC_BASE64_URL}${toBase64(shimmer(width, height))}`}
                alt={product.nombre}
                width={width}
                height={height}
            />
        </Link>
    );
};

export default Image;
