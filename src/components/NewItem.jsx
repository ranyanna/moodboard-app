import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import styles from "./NewItem.module.css";
import toast from "react-hot-toast";

function NewItem() {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (title === "" || !imageFile) {
      toast.error("Preencha o título e escolha uma imagem antes de adicionar");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

    fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return addDoc(collection(db, "moodboards"), {
          title: title,
          imageUrl: data.secure_url,
          userId: auth.currentUser.uid,
          position: Date.now(),
        });
      })
      .then(() => {
        toast.success("Imagem adicionada ao mural!")
        setTitle("");
        setImageFile(null);
      })
      .catch((err) => {
        console.error("Error adding item:", err.message);
        toast.error("Não foi possível adicionar a imagem.");
      })
      .finally(() => {
        setIsUploading(false);
      });
  }

  return (
    <div className={styles.formWrapper}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.titleInput}
          type="text"
          placeholder="Título da imagem"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isUploading}
        />
        <input
          id="fileUpload"
          type="file"
          className={styles.hiddenInput}
          onChange={(e) => setImageFile(e.target.files[0])}
          disabled={isUploading}
        />
        <label
          htmlFor="fileUpload"
          className={`${styles.fileLabel} ${isUploading ? styles.fileLabelDisabled : ""}`}
        >
          {imageFile ? imageFile.name : "Escolher imagem do dispositivo"}
        </label>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isUploading}
        >
          {isUploading ? "Enviando..." : "Adicionar ao mural"}
        </button>
      </form>
    </div>
  );
}

export default NewItem;