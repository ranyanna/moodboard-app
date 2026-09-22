import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

function Register({ onSwitchScreen }) {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)

    function handleRegister(e) {
      e.preventDefault()

      if (name === '' || email === '' || password === '' || confirmPassword === '') {
        setError('Preencha todos os campos')
        return
      }

      if (password !== confirmPassword) {
        setError('As senhas não coincidem')
        return
      }

      setIsRegistering(true)

      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Account created successfully:', userCredential.user)
        setError('')
      })
      .catch((err) => {
        console.error('Registration error:', err.message)
        setError('Erro ao criar conta')
      })
      .finally(() => {
        setIsRegistering(false)
      })
    }

    return (
      <form className="register" onSubmit={handleRegister}>
        <h2>Criar conta</h2>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={name}
          disabled={isRegistering}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          disabled={isRegistering}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          disabled={isRegistering}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          disabled={isRegistering}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" disabled={isRegistering}>
          {isRegistering ? 'Criando conta...' : 'Cadastrar'}
        </button>
        <p onClick={onSwitchScreen}>Já tem conta? Entrar</p>
        {error && <p className="error">{error}</p>}
      </form>
    )
}

export default Register