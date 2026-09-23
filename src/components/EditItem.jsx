import {useState} from 'react';
import {doc, updateDoc} from 'firebase/firestore';
import { db } from '../firebase';

function EditItem({ item, onClose }) {
    const [title, setTitle] = useState(item.title)
    const [imageUrl, setImageUrl] = useState(item.imageUrl)
    const [isUpdating, setIsUpdating] = useState(false)
    const [error, setError] = useState('')

    function handleSubmit(e) {
        e.preventDefault()

        setError('')
        setIsUpdating(true)

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
            setError('Não foi possível salvar as alterações. Tente novamente')
        })
        .finally(() => {
            setIsUpdating(false)
        })

    }

    return (
        <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            disabled={isUpdating}
            />

            <input 
            type="text" 
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)} 
            disabled={isUpdating}
            />

            <button type="submit" disabled={isUpdating}>
                {isUpdating ? 'Salvando...' : 'Salvar alterações'}</button>
            <button type="button" onClick={onClose} disabled={isUpdating}>Cancelar</button>
            {error && <p className="error">{error}</p>}
        </form>
    )
}

export default EditItem