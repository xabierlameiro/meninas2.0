import React from 'react';
import styles from './loading.module.css';

const Loader = ({ loading, className }: LoaderProps) => {
    return (
        <div className={`${styles.loaderContainer} ${className}`}>
            <div className={styles.loaderBar}>{loading && <div className={styles.loaderProgress} />}</div>
        </div>
    );
};

export default Loader;
