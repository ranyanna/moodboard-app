import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import styles from "./NewItem.module.css";

function NewItem() {
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (title === "" || !imageFile) {
      setError("Preencha o título e escolha uma imagem antes de adicionar");
      return;
    }

    setError("");
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "moodboard_uploads");

    fetch("https://api.cloudinary.com/v1_1/vjwwsofs/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        return addDoc(collection(db, "moodboards"), {
          title: title,
          imageUrl: data.secure_url,
          userId: auth.currentUser.uid,
        });
      })
      .then(() => {
        console.log("Item added successfully!");
        setTitle("");
        setImageFile(null);
      })
      .catch((err) => {
        console.error("Error adding item:", err.message);
        setError("Não foi possivel adicionar a imagem. Tente novamente");
      })
      .finally(() => {
        setIsUploading(false);
      });
  }

  return (
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
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default NewItem;