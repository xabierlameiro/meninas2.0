'use client';
import React from 'react';
import { shimmer, toBase64, calculateImageSize } from '@helpers/image';
import NextImage from 'next/image';
import styles from './image.module.css';
import dynamic from 'next/dynamic';

const ThumbNails = dynamic(() => import('./ThumbNails'), { ssr: true });
const Loading = dynamic(() => import('./Loading'), { ssr: true });

type PDPImageProps = {
    product: ContentfulProduct;
    thumbnails?: any;
};

const PDPImage = ({ product, thumbnails }: PDPImageProps) => {
    const { widthForCloudinary, heightForCloudinary, width, height } = calculateImageSize(product, 1200);
    const [src, setSrc]: StringState = React.useState(product.portada.url);
    const [loading, setLoading]: BooleanState = React.useState(true);

    return (
        <div style={{ position: 'relative' }}>
            <NextImage
                className={styles.image}
                priority
                quality={100}
                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}h_${heightForCloudinary},w_${widthForCloudinary}/${src}`}
                placeholder="blur"
                blurDataURL={`${process.env.NEXT_PUBLIC_BASE64_URL}${toBase64(shimmer(width, height))}`}
                alt={product.nombre}
                width={width}
                height={height}
                onError={() => {
                    setSrc(`${process.env.NEXT_PUBLIC_PLACEHOLDER_URL}`);
                    setLoading(false);
                }}
                onLoadingComplete={() => setLoading(false)}
                onCompositionEnd={() => setLoading(false)}
                onLoadedData={() => setLoading(false)}
            />
            {thumbnails && <ThumbNails images={thumbnails} onClick={setSrc} onLoading={setLoading} src={src} />}
            <Loading loading={loading} />
        </div>
    );
};

export default PDPImage;
