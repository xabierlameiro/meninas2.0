'use client';
import React from 'react';
import { shimmer, toBase64, calculateImageSize } from '@helpers/image';
import NextImage from 'next/image';
import styles from './image.module.css';
import dynamic from 'next/dynamic';

const ThumbNails = dynamic(() => import('./ThumbNails'), { ssr: false });
const Loading = dynamic(() => import('./Loading'), { ssr: false });

type PDPImageProps = {
    product: ContentfulProduct;
    thumbnails?: any;
    isMobile?: boolean;
};

const PDPImage = ({ product, thumbnails, isMobile }: PDPImageProps) => {
    const { widthForCloudinary, heightForCloudinary, width, height } = calculateImageSize(
        product,
        isMobile ? 400 : 1200
    );
    const [src, setSrc]: StringState = React.useState(product.portada.url);
    const [loading, setLoading]: BooleanState = React.useState(true);

    return (
        <div style={{ position: 'relative' }}>
            <NextImage
                className={styles.image}
                style={{ maxWidth: width, maxHeight: height }}
                priority
                quality={100}
                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}h_${heightForCloudinary},w_${widthForCloudinary},f_auto/${src}`}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
                alt={product.nombre}
                width={width}
                height={height}
                onError={(e: any) => {
                    e.target.src = `${process.env.NEXT_PUBLIC_PLACEHOLDER_URL}`;
                    setLoading(false);
                }}
                onLoadingComplete={() => setLoading(false)}
            />
            {thumbnails && (
                <ThumbNails images={thumbnails} setSrc={setSrc} onLoading={setLoading} src={src} isMobile={isMobile} />
            )}
            <Loading loading={loading} />
        </div>
    );
};

export default PDPImage;
