import {useState} from 'react';
import {doc, updateDoc} from 'firebase/firestore';
import { db } from '../firebase';

function EditItem({ item, onClose }) {
    const [title, setTitle] = useState(item.title)
    const [imageUrl, setImageUrl] = useState(item.imageUrl)

    function handleSubmit(e) {
        e.preventDefault()

        updateDoc(doc(db, 'moodboards', item.id), {
            title: title,
            imageUrl: imageUrl
        })
        .then(() => {
            console.log('Item updated successfully!')
            onClose()
        })
        .catch((err) => {
            console.error('Error updating item:', err.message)
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            />

            <input 
            type="text" 
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)} 
            />

            <button type="submit">Salvar alterações</button>
            <button type="button" onClick={onClose}>Cancelar</button>
        </form>
    )
}

export default EditItem