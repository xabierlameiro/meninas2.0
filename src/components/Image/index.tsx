'use client';
import { useState } from 'react';
import LegacyImage from 'next/image';
import ThumbNails from '@components/ThumbNails';
import Loading from './Loading';

const cloudinary = 'https://res.cloudinary.com/dlfkxcjkq/image/fetch/';

const Image = ({
    src,
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
    let props;
    const [source, setSource] = useState(src);
    const [loading, setLoading] = useState(false);

    if (!fill) {
        props = {
            width,
            height,
        };
    } else {
        props = {
            fill,
            sizes,
        };
    }

    const shimmer = (w: number, h: number) => `    
        <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="${w}" height="${h}" fill="#F0F0F0" />
        </svg>`;

    const toBase64 = (str: string) =>
        typeof window === 'undefined' ? Buffer.from(str).toString('base64') : window.btoa(str);

    return (
        <>
            <LegacyImage
                {...props}
                alt={alt}
                title={title}
                onClick={onClick}
                priority={priority}
                src={`${cloudinary}h_${height},w_${width},fl_immutable_cache/${source}`}
                quality={quality}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`}
                onError={() => setSource('https://via.placeholder.com/480x640.png?text=Image+not+found')}
                onLoadingComplete={() => setLoading(false)}
                onCompositionEnd={() => setLoading(false)}
                onLoadedData={() => setLoading(false)}
                style={{ cursor: 'pointer' }}
            />
            {thumbnails && (
                <ThumbNails images={thumbnails} onClick={setSource} onLoading={setLoading} source={source} />
            )}
            {showLoading && <Loading loading={loading} />}
        </>
    );
};

export default Image;
