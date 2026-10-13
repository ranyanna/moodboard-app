import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styles from "./Card.module.css";

function Card({ item, onDelete, onEdit }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={styles.card}
    >
      <img
        className={styles.image}
        src={item.imageUrl}
        alt={item.title}
        draggable={false}
      />
      <div className={styles.actions}>
        <button className={styles.actionButton} onClick={() => onEdit(item)}>
          ✎
        </button>
        <button
          className={styles.actionButton}
          onClick={() => onDelete(item.id)}
        >
          ✕
        </button>
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{item.title}</p>
      </div>
    </div>
  );
}

export default Card;
