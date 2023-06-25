'use client';
import Image from 'next/image';
import styles from './thumbnails.module.css';
import { shimmer, toBase64 } from '@helpers/image';

const ThumbNails = ({ images, src, setSrc, onLoading, isMobile }: ThumbNailsProps) => {
    const width = isMobile ? 40 : 60;
    const height = isMobile ? 40 : 60;
    return (
        <div className={styles.thumbnails__container}>
            {images.map((image: (typeof images)[0]) => (
                <div
                    key={image.id}
                    className={`${styles.thumbnails__item} ${src === image.url ? styles.thumbnails__item_active : ''}`}
                >
                    <Image
                        key={image.id}
                        width={width}
                        height={height}
                        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}h_${height},w_${width},f_auto/${image.url}`}
                        alt={image.title}
                        title={image.title}
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
                        onError={(e: any) => {
                            e.target.src = `${process.env.NEXT_PUBLIC_PLACEHOLDER_URL}`;
                            e.target.style.cursor = 'not-allowed';
                            e.target.title = 'Lo sentimos, pero la imagen no se encuentra disponible';
                            onLoading(false);
                        }}
                        onClick={(e: any) => {
                            if (e.target.style.cursor === 'not-allowed') return;
                            setSrc(image.url);
                            if (src !== image.url) onLoading(true);
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default ThumbNails;
