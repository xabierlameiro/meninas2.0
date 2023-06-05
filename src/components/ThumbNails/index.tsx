'use client';
import Image from '@components/Image';
import styles from './thumbnails.module.css';

const ThumbNails = ({ images, onClick }: any) => {
    return (
        <div className={styles.thumbnails__container}>
            {images.map((image: any) => (
                <div key={image.sys.id} className={styles.thumbnails__item}>
                    <Image
                        key={image.sys.id}
                        width={100}
                        height={100}
                        src={image.url}
                        alt={image.title}
                        title={image.title}
                        onClick={() => onClick(image.url)}
                    />
                </div>
            ))}
        </div>
    );
};
export default ThumbNails;
