'use client';
import { useState } from 'react';
import LegacyImage from 'next/image';
import ThumbNails from '@components/ThumbNails';
import { shimmer, toBase64 } from '@helpers/image';
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
    let props = { fill, sizes } as Pick<ImageProps, 'fill' | 'sizes' | 'width' | 'height'>;
    const [source, setSource]: StringState = useState(src);
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
