'use client';
import Image from 'next/image';
import styles from './thumbnails.module.css';
import { shimmer, toBase64 } from '@helpers/image';

const ThumbNails = ({ images, src, setSrc, onLoading, isMobile }: ThumbNailsProps) => {
    const width = isMobile ? 40 : 60;
    const height = isMobile ? 40 : 60;
    return (
        <div className={styles.thumbnails__container}>
            {images.map((image: ThumbNail) => (
                <div
                    key={image.sys.id}
                    className={`${styles.thumbnails__item} ${src === image.url ? styles.thumbnails__item_active : ''}`}
                >
                    <Image
                        key={image.sys.id}
                        width={width}
                        height={height}
                        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}h_${height},w_${width},f_auto/${image.url}`}
                        alt={image.title}
                        title={image.title}
                        placeholder="blur"
                        blurDataURL={`${process.env.NEXT_PUBLIC_BASE64_URL}${toBase64(shimmer(width, height))}`}
                        onError={(e: any) => {
                            e.target.style.display = 'none';
                            onLoading(false);
                        }}
                        onClick={() => {
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
