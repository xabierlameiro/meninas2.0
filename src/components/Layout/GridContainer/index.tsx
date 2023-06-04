import styles from './grid.module.css';

const GridContainer = ({ children }: Children) => {
    return <div className={styles.grid}>{children}</div>;
};

export default GridContainer;
