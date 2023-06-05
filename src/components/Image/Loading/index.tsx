import React from 'react';
import styles from './loading.module.css';

const Loader = ({ loading }: any) => {
    return (
        <div className={styles.loaderContainer}>
            <div className={styles.loaderBar}>{loading && <div className={styles.loaderProgress} />}</div>
        </div>
    );
};

export default Loader;
