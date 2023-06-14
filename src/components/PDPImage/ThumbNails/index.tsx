'use client';
import Image from 'next/image';
import styles from './thumbnails.module.css';
import { shimmer, toBase64 } from '@helpers/image';

const ThumbNails = ({ images, src, setSrc, onLoading }: ThumbNailsProps) => {
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
                        src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}h_${100},w_${100}/${image.url}`}
                        alt={image.title}
                        title={image.title}
                        placeholder="blur"
                        blurDataURL={`${process.env.NEXT_PUBLIC_BASE64_URL}${toBase64(shimmer(100, 100))}`}
                        onError={(e: any) => {
                            e.target.src = `${process.env.NEXT_PUBLIC_PLACEHOLDER_URL}`;
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
