import { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  collection,
  onSnapshot,
  query,
  where,
  deleteDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import { db, auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { DndContext } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import NewItem from "./components/NewItem";
import Card from "./components/Card";
import EditItem from "./components/EditItem";
import styles from "./App.module.css";

const NO_POSITION = Number.MAX_SAFE_INTEGER;

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isLoadingImages, setIsLoadingImages] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "moodboards"),
      where("userId", "==", user.uid),
    );

    const unsubscribeSnapshot = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        data.sort(
          (a, b) => (a.position ?? NO_POSITION) - (b.position ?? NO_POSITION),
        );
        setImages(data);
        setIsLoadingImages(false);
      },
      (err) => {
        console.error("Error fetching images:", err.message);
        setFetchError(
          "Não foi possível carregar suas imagens. Tente novamente.",
        );
        setIsLoadingImages(false);
      },
    );

    return () => unsubscribeSnapshot();
  }, [user]);

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este item?",
    );

    if (!confirmed) {
      return;
    }
    deleteDoc(doc(db, "moodboards", id))
      .then(() => {
        console.log("Item deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting item:", err.message);
        alert("Não foi possível excluir o item. Tente novamente.");
      });
  }

  function handleEdit(item) {
    setEditingItem(item);
  }

  function handleLogout() {
    signOut(auth)
      .then(() => {
        console.log("Logout successful!");
      })
      .catch((err) => {
        console.error("Error logging out:", err.message);
      });
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

      const oldIndex = images.findIndex((image) => image.id === active.id);
      const newIndex = images.findIndex((image) => image.id === over.id);
      const reorderedImages = arrayMove(images, oldIndex, newIndex);

      setImages(reorderedImages);
      saveOrder(reorderedImages);
  }

  function saveOrder(orderedImages) {
    const batch = writeBatch(db);

    orderedImages.forEach((image, index) => {
      batch.update(doc(db, "moodboards", image.id), { position: index });
    });

    batch.commit().catch((err) => {
      console.error("Error saving order:", err.message);
      alert("Não foi possível salvar a nova ordem. Tente novamente.")
    });
  }

  return (
    <div>
      {user ? (
        <div>
          <header className={styles.header}>
            <div className={styles.brand}>
              <span className={styles.brandName}>Moodboard</span>
              <span className={styles.brandTag}>Mural pessoal</span>
            </div>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Sair
            </button>
          </header>
          <section className={styles.hero}>
            <h1 className={styles.title}>
              Mural de <span className={styles.titleAccent}>referências</span>
            </h1>
          </section>
          <NewItem />
          {isLoadingImages ? (
            <p className={styles.stateMessage}>Carregando...</p>
          ) : fetchError ? (
            <p className="error">{fetchError}</p>
          ) : images.length === 0 ? (
            <p className={styles.stateMessage}>
              Nenhuma imagem ainda... Adicione a primeira!
            </p>
          ) : (
            <DndContext onDragEnd={handleDragEnd}>
              <SortableContext
                items={images.map((image) => image.id)}
                strategy={rectSortingStrategy}
              >
                <div className={styles.grid}>
                  {images.map((image) => (
                    <Card
                      key={image.id}
                      item={image}
                      onDelete={handleDelete}
                      onEdit={handleEdit}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
          {editingItem && (
            <EditItem item={editingItem} onClose={() => setEditingItem(null)} />
          )}
        </div>
      ) : showLogin ? (
        <Login onSwitchScreen={() => setShowLogin(false)} />
      ) : (
        <Register onSwitchScreen={() => setShowLogin(true)} />
      )}
    </div>
  );
}

export default App;
