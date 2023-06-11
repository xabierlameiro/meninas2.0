'use client';
import Image from 'next/image';
import styles from './thumbnails.module.css';

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
