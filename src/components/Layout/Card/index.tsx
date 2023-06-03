import styles from './card.module.css';

const Card = ({ children, key }: Children & { key?: string }) => {
    return (
        <div className={styles.card} key={key}>
            {children}
        </div>
    );
};

export default Card;
