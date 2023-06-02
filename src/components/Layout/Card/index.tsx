import styles from './card.module.css';

const Card = ({ children, ...props }: any) => {
    return (
        <div className={styles.card} {...props}>
            {children}
        </div>
    );
};

export default Card;
