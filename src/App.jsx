import { useState } from 'react'
import Login from './components/Login'
import Register from './components/Register'

function App() {
  const [mostrarLogin, setMostrarLogin] = useState(true)
  const [logado, setLogado] = useState(false)

  function handleLoginSuccess() {
    setLogado(true)
  }

  return (
    <div>
      {logado ? (
        <p>Bem-vinda! Login realizado com sucesso</p>
      ) : mostrarLogin ? (
        <Login onTrocarTela={() => setMostrarLogin(false)} onLoginSuccess={handleLoginSuccess} />
      ) : (
        <Register onTrocarTela={() => setMostrarLogin(true)} />
      )}
    </div>
  )
}

export default App