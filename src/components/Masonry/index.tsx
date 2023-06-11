'use client';
import Image from './Image';
import styles from './masonry.module.css';
import React from 'react';
import { getPriorityImages } from '@helpers/image';

const Masonry = ({ data }: any) => {
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
                        {/* eslint-disable jsx-a11y/alt-text */}
                        <Image product={product} priority={priorityImages.includes(index)} />
                        <div className={styles.masonry__item__price}>{product.precio} €</div>
                        <div className={styles.masonry__item__info}>
                            <div className={styles.masonry__item__info__name}>{product.nombre}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default Masonry;
