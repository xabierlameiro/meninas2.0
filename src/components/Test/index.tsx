'use client';
import Image from 'next/image';
import styles from './test.module.css';
import React from 'react';
import { shimmer, toBase64 } from '@helpers/image';
import Link from 'next/link';

const mediaQuerys = [
    { minWidth: 1536, columns: 5 },
    { minWidth: 1280, columns: 4 },
    { minWidth: 1024, columns: 3 },
    { minWidth: 600, columns: 2 },
    { minWidth: 0, columns: 1 },
];

const getColumns = (
    mediaQueries: {
        minWidth: number;
        columns: number;
    }[]
) => {
    const currentWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    const matchingQuery = mediaQueries.find((query) => currentWidth >= query.minWidth);
    return matchingQuery?.columns ?? 1;
};

function calculateImageSize(product: ContentfulProduct) {
    const maxWidth = 320; // Ancho máximo deseado
    const scale = Math.ceil(product.portada.width / maxWidth);

    const width = Math.floor(product.portada.width / scale);
    const height = Math.floor(product.portada.height / scale);

    const widthForCloudinary = Math.floor(width * 1.2);
    const heightForCloudinary = Math.floor(height * 1.2);

    return { width, height, widthForCloudinary, heightForCloudinary };
}

const getPriorityImages = (data: ContentfulProduct[], parentRef: React.RefObject<HTMLDivElement>) => {
    const heightMasonry = parentRef.current?.clientHeight;
    const indexes = [0];

    if (!heightMasonry) return;

    const columns = getColumns(mediaQuerys);

    let startNewColumn = 0;
    for (let i = 0; i < columns; i++) {
        let heightColumn = 0;
        for (let j = startNewColumn; j < data.length; j++) {
            heightColumn += calculateImageSize(data[j]).height + 16;

            if (heightColumn > heightMasonry) {
                if (columns === indexes.length) break;
                startNewColumn = j;
                indexes.push(j);
                break;
            }
        }
    }

    return indexes;
};

const ImageEPA = ({ priority, product }: any) => {
    const { widthForCloudinary, heightForCloudinary, width, height } = calculateImageSize(product);

    return (
        <Link href={`/${product.categoriaPrincipal.slug}/${product.url}`}>
            <Image
                className={styles.masonry__item__image}
                priority={priority}
                quality={100}
                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}h_${heightForCloudinary},w_${widthForCloudinary}/${product.portada.url}`}
                placeholder="blur"
                blurDataURL={`${process.env.NEXT_PUBLIC_BASE64_URL}${toBase64(shimmer(width, height))}`}
                alt={product.nombre}
                width={width}
                height={height}
            />
        </Link>
    );
};

const Test = ({ data }: any) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [priorityImages, setPriorityImages] = React.useState<number[]>([]);

    React.useEffect(() => {
        const result = getPriorityImages(data, ref);
        if (!result) return;
        setPriorityImages(result);
    }, [data, ref]);

    return (
        <div className={styles.masonry} ref={ref}>
            {data.map((product: ContentfulProduct, index: number) => {
                return (
                    <div key={index} className={styles.masonry__item}>
                        <ImageEPA
                            product={product}
                            index={index}
                            data={data}
                            parentRef={ref}
                            priority={priorityImages.includes(index)}
                        />
                        <div className={styles.masonry__item__price}>{product.precio} €</div>
                    </div>
                );
            })}
        </div>
    );
};
export default Test;
