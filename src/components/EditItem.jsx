import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import styles from "./EditItem.module.css";
import toast from "react-hot-toast";

function EditItem({ item, onClose }) {
  const [title, setTitle] = useState(item.title);
  const [imageUrl, setImageUrl] = useState(item.imageUrl);
  const [isUpdating, setIsUpdating] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setIsUpdating(true);

    updateDoc(doc(db, "moodboards", item.id), {
      title: title,
      imageUrl: imageUrl,
    })
      .then(() => {
        toast.success("Referência atualizada com sucesso!");
        onClose();
      })
      .catch((err) => {
        console.error("Error updating item:", err.message);
        toast.error("Não foi possível salvar as alterações.");
      })
      .finally(() => {
        setIsUpdating(false);
      });
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div>
            <span className={styles.eyebrow}>Editar referência</span>
            <h2 className={styles.modalTitle}>
              Ajustar <span className={styles.modalTitleAccent}>item</span>
            </h2>
          </div>
          <button
            className={styles.closeButton}
            onClick={onClose}
            disabled={isUpdating}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Título</label>
            <input
              className={styles.input}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isUpdating}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>URL da imagem</label>
            <input
              className={styles.input}
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              disabled={isUpdating}
            />
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={isUpdating}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={isUpdating}
            >
              {isUpdating ? "Salvando..." : "Salvar alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItem;