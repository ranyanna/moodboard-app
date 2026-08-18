import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [mostrarLogin, setMostrarLogin] = useState(true)

  return (
    <div>
      {mostrarLogin ? (
        <Login onTrocarTela={() => setMostrarLogin(false)} />
      ) : (
        <Register onTrocarTela={() => setMostrarLogin(true)} />
      )}
    </div>
  )
}

export default App