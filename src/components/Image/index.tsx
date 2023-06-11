'use client';
import { useState } from 'react';
import LegacyImage from 'next/image';
import { shimmer, toBase64 } from '@helpers/image';
import Loading from './Loading';
import styles from './image.module.css';
import dynamic from 'next/dynamic';

const ThumbNails = dynamic(() => import('@components/ThumbNails'), { ssr: true });

const Image = ({
    src: srcByDefault,
    title,
    fill = false,
    alt,
    width,
    height,
    priority,
    onClick,
    thumbnails,
    quality = 80,
    showLoading,
    sizes = '(max-width: 767px) 342px, (min-width: 768px)  457px',
}: ImageProps) => {
    let props = { fill, sizes } as Pick<ImageProps, 'fill' | 'sizes' | 'width' | 'height'>;
    const [src, setSrc]: StringState = useState(srcByDefault);
    const [loading, setLoading]: BooleanState = useState(true);

    if (!fill) {
        props = {
            width,
            height,
        };
    }

    return (
        <>
            <LegacyImage
                {...props}
                alt={alt}
                title={title}
                onClick={onClick}
                quality={quality}
                placeholder="blur"
                priority={priority}
                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}h_${height},w_${width},fl_immutable_cache/${src}`}
                blurDataURL={`${process.env.NEXT_PUBLIC_BASE64_URL}${toBase64(shimmer(width, height))}`}
                onError={() => setSrc(`${process.env.NEXT_PUBLIC_PLACEHOLDER_URL}`)}
                onLoadingComplete={() => setLoading(false)}
                onCompositionEnd={() => setLoading(false)}
                onLoadedData={() => setLoading(false)}
                className={styles.image}
            />
            {thumbnails && <ThumbNails images={thumbnails} onClick={setSrc} onLoading={setLoading} src={src} />}
            {showLoading && <Loading loading={loading} />}
        </>
    );
};

export default Image;
