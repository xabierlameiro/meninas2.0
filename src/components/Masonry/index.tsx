'use client';
import styles from './masonry.module.css';
import React from 'react';
import { getPriorityImages } from '@helpers/image';
import dynamic from 'next/dynamic';

const Image = dynamic(() => import('./Image'), { ssr: true });

const Masonry = ({ data, category }: { data: Products; category?: string }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const [priorityImages, setPriorityImages] = React.useState<number[]>([]);

    React.useEffect(() => {
        const result = getPriorityImages(data, ref);
        if (!result) return;
        setPriorityImages(result);
    }, [data, ref]);

    if (!data) return null;

    return (
        <div className={styles.masonry} ref={ref}>
            {data.map((product: Product, index: number) => {
                return (
                    <div key={index} className={styles.masonry__item}>
                        {/* eslint-disable jsx-a11y/alt-text */}
                        <Image product={product} priority={priorityImages.includes(index)} category={category} />
                        <div className={styles.masonry__item__price}>
                            {product.discount > 0 && (
                                <>
                                    <span className={styles.masonry__item__normal__price}>
                                        {product.priceWithoutDiscount} €
                                    </span>
                                    <div className={styles.masonry__item__discount__tag}>-{product.discount}%</div>
                                </>
                            )}
                            <span className={styles.masonry__item__discount__price}>{product.priceWithDiscount} €</span>
                        </div>
                        <div className={styles.masonry__item__info}>
                            <div className={styles.masonry__item__info__name}>{product.name}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default Masonry;
