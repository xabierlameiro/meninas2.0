import styles from './card.module.css';

const Card = ({ children }: Children) => {
    return <div className={styles.card}>{children}</div>;
};

export default Card;
