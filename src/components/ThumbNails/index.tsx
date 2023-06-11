'use client';
import Image from 'next/image';
import styles from './thumbnails.module.css';
import { shimmer, toBase64 } from '@helpers/image';

const ThumbNails = ({ images, src, onClick, onLoading }: ThumbNailsProps) => {
    return (
        <div className={styles.thumbnails__container}>
            {images.map((image: ThumbNail) => (
                <div
                    key={image.sys.id}
                    className={`${styles.thumbnails__item} ${src === image.url ? styles.thumbnails__item_active : ''}`}
                >
                    <Image
                        key={image.sys.id}
                        width={100}
                        height={100}
                        src={image.url}
                        alt={image.title}
                        title={image.title}
                        placeholder="blur"
                        blurDataURL={`${process.env.NEXT_PUBLIC_BASE64_URL}${toBase64(shimmer(100, 100))}`}
                        onError={() => onLoading(false)}
                        onClick={() => {
                            onClick(image.url);
                            if (src !== image.url) onLoading(true);
                        }}
                    />
                </div>
            ))}
        </div>
    );
};

export default ThumbNails;
