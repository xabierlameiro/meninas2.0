'use client';
import React from 'react';
import { shimmer, toBase64, calculateImageSize } from '@helpers/image';
import NextImage from 'next/image';
import styles from './image.module.css';
import dynamic from 'next/dynamic';
import Loading from '@components/Image/Loading';

const ThumbNails = dynamic(() => import('@components/ThumbNails'), { ssr: true });

type SuperImageProps = {
    product: ContentfulProduct;
    thumbnails?: any;
};

const SuperImage = ({ product, thumbnails }: SuperImageProps) => {
    const { widthForCloudinary, heightForCloudinary, width, height } = calculateImageSize(product, 1200);
    const [src, setSrc]: StringState = React.useState(product.portada.url);
    const [loading, setLoading]: BooleanState = React.useState(true);

    return (
        <>
            <NextImage
                className={styles.masonry__item__image}
                priority
                quality={100}
                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}h_${heightForCloudinary},w_${widthForCloudinary}/${src}`}
                placeholder="blur"
                blurDataURL={`${process.env.NEXT_PUBLIC_BASE64_URL}${toBase64(shimmer(width, height))}`}
                alt={product.nombre}
                width={width}
                height={height}
                onLoadingComplete={() => setLoading(false)}
                onCompositionEnd={() => setLoading(false)}
                onLoadedData={() => setLoading(false)}
            />
            {thumbnails && <ThumbNails images={thumbnails} onClick={setSrc} onLoading={setLoading} src={src} />}
            <Loading loading={loading} />
        </>
    );
};

export default SuperImage;
