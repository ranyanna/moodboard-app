import { useEffect, useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import NewItem from "./components/NewItem";
import Card from "./components/Card";
import EditItem from "./components/EditItem";
import styles from "./App.module.css";
import { useMoodboard } from "./hooks/useMoodboard";

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState(null);

  const {
    images,
    isLoadingImages,
    fetchError,
    editingItem,
    setEditingItem,
    handleDelete,
    handleEdit,
    reorderImages,
  } = useMoodboard(user);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribeAuth();
  }, []);

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

    reorderImages(reorderedImages);
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
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
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
