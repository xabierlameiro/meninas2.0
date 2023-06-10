'use client';
import Image from 'next/image';
import styles from './test.module.css';
import React from 'react';

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
    const heightMasonry = parentRef.current?.scrollHeight;
    const indexes = [];

    if (!heightMasonry) return;

    const totalHeight = data.reduce((acc, product) => {
        const { height } = calculateImageSize(product);
        return acc + height + 16;
    }, 0);

    const columns = Math.ceil(totalHeight / heightMasonry);

    let startNewColumn = 0;
    for (let i = 0; i < columns; i++) {
        let heightColumn = 0;
        for (let j = startNewColumn; j < data.length; j++) {
            heightColumn += calculateImageSize(data[j]).height + 16;

            if (heightColumn > heightMasonry) {
                startNewColumn = j;
                break;
            }
            if (j === data.length - 1) {
                startNewColumn = data.length;
            }

            if (j === startNewColumn) {
                if (i > 1) {
                    indexes.push(j + 1);
                } else {
                    indexes.push(j);
                }
            }
        }
    }

    return indexes;
};

const ImageEPA = ({ priority, product }: any) => {
    const { widthForCloudinary, heightForCloudinary, width, height } = calculateImageSize(product);

    return (
        <>
            <Image
                className={styles.masonry__item__image}
                priority={priority}
                quality={100}
                src={`${process.env.NEXT_PUBLIC_CLOUDINARY_URL}h_${heightForCloudinary},w_${widthForCloudinary}/${product.portada.url}`}
                alt={product.nombre}
                width={width}
                height={height}
            />
        </>
    );
};

const Test = ({ data }: any) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [priorityImages, setPriorityImages] = React.useState<number[]>([]);

    React.useEffect(() => {
        const result = getPriorityImages(data, ref);
        if (!result) return;
        console.log('hola');
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
                        <p
                            style={{
                                position: 'absolute',
                                backgroundColor: 'white',
                                color: 'black',
                            }}
                        >
                            {index}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};
export default Test;
