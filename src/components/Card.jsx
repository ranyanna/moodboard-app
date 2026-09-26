import styles from './Card.module.css'

function Card({ item, onDelete, onEdit }) {
    return (
        <div className={styles.card}>
            <img className={styles.image} src={item.imageUrl} alt={item.title} />
            <div className={styles.actions}>
                <button className={styles.actionButton} onClick={() => onEdit(item)}>✎</button>
                <button className={styles.actionButton} onClick={() => onDelete(item.id)}>✕</button>
            </div>
            <div className={styles.info}>
                <p className={styles.title}>{item.title}</p>
            </div>
        </div>
    )
}

export default Card