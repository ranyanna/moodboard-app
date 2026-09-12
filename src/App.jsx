import { useEffect, useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'
import { collection, onSnapshot, query, where, deleteDoc, doc } from 'firebase/firestore'
import { db, auth } from './firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import NewItem from './components/NewItem'
import Card from './components/Card'
import EditItem from './components/EditItem'

function App() {
  const [showLogin, setShowLogin] = useState(true)
  const [user, setUser] = useState(null)
  const [images, setImages] = useState([])
  const [editingItem, setEditingItem] = useState(null)

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
    })

    return () => unsubscribeAuth()
  }, [])

  useEffect(() => {
    if (!user) return

    const q = query(collection(db, 'moodboards'), where('userId', '==', user.uid))

    const unsubscribeSnapshot = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }))
      setImages(data)
    })

    return () => unsubscribeSnapshot()
  }, [user])

  function handleDelete(id) {
    deleteDoc(doc(db, 'moodboards', id))
    .then(() => {
      console.log('Item deleted successfully')
    })
    .catch((err) => {
      console.error('Error deleting item:', err.message)
    })
  }

  function handleEdit(item) {
    setEditingItem(item)
  }

  function handleLogout() {
    signOut(auth)
    .then(() => {
      console.log('Logout successful!')
    })
    .catch((err) => {
      console.error('Error logging out:', err.message)
    })
  }

  return (
    <div>
      {user ? (
        <div>
          <p>Bem-vinda! Login realizado com sucesso</p>
          <button onClick={handleLogout}>Sair</button>
          <NewItem />
          {images.map((image) => (
            <Card key={image.id} item={image} onDelete={handleDelete} onEdit={handleEdit} />
          ))}
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
  )
}

export default App