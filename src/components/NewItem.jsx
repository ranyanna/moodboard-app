import { useState } from "react"
import { collection, addDoc } from "firebase/firestore"
import { db, auth } from "../firebase"

function NewItem() {
  const [title, setTitle] = useState('')
  const [imageFile, setImageFile] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()

    if (title === '' || !imageFile) {
      return
    }

    const formData = new FormData()
    formData.append('file', imageFile)
    formData.append('upload_preset', 'moodboard_uploads')

    fetch('https://api.cloudinary.com/v1_1/vjwwsofs/image/upload', {
      method: 'POST',
      body: formData
    })
    .then((response) => response.json())
    .then((data) => {
      return addDoc(collection(db, 'moodboards'), {
        title: title,
        imageUrl: data.secure_url,
        userId: auth.currentUser.uid
      })
    })
    .then(() => {
      console.log('Item added sucessfully!')
      setTitle('')
      setImageFile(null)
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
        type="file"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <button type="submit">Adicionar ao mural</button>
    </form>
  )
}

export default NewItem