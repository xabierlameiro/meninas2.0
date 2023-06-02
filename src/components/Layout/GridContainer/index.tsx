import styles from './grid.module.css';

const GridContainer = ({ children }: any) => {
    return <div className={styles.grid}>{children}</div>;
};

export default GridContainer;
