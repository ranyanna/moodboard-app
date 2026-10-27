import { useEffect, useState } from "react";
import {
    collection,
    onSnapshot,
    query,
    where,
    deleteDoc,
    doc,
    writeBatch,
} from "firebase/firestore";
import { db } from "../firebase";

const NO_POSITION = Number.MAX_SAFE_INTEGER;

export function useMoodboard(user) {
    const [images, setImages] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [isLoadingImages, setIsLoadingImages] = useState(true);
    const [fetchError, setFetchError] = useState("");

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

    function reorderImages(reorderedImages) {
        setImages(reorderedImages);
        const batch = writeBatch(db);

        reorderedImages.forEach((image, index) => {
            batch.update(doc(db, "moodboards", image.id), { position: index });
        });

        batch.commit().catch((err) => {
            console.error("Error saving order:", err.message);
            alert("Não foi possível salvar a nova ordem. Tente novamente.");
        });
    }

    return {
        images,
        isLoadingImages,
        fetchError,
        editingItem,
        setEditingItem,
        handleDelete,
        handleEdit,
        reorderImages,
    };
}