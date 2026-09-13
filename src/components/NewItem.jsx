import { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db, auth } from "../firebase"

function NewItem() {
  const [title, setTitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (title === '' || imageUrl === '') {
      return
    }

    addDoc(collection(db, 'moodboards'), {
      title: title,
      imageUrl: imageUrl,
      userId: auth.currentUser.uid
    })
      .then(() => {
        console.log('Item added successfully!')
        setTitle('')
        setImageUrl('')
      })
      .catch((err) => {
        console.error('Error adding item:', err.message)
      })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título da imagem"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="URL da imagem"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit">Adicionar ao mural</button>
    </form>
  )
}

export default NewItem