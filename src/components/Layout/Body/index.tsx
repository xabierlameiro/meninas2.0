import styles from './body.module.css';

const Body = ({ children }: Children) => {
    return <body className={styles.body}>{children}</body>;
};
export default Body;
