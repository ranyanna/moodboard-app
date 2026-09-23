import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login({ onSwitchScreen }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    function handleLogin(e) {
        e.preventDefault()

        if (email === '' || password === '') {
            setError('Preencha os campos')
            return
        }

        setIsLoggingIn(true)

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Login successful:', userCredential.user)
            setError('')
        })
        .catch((err) => {
            console.error('Login error:', err.message)
            setError('Email ou senha incorretos.')
        })
        .finally(() => {
            setIsLoggingIn(false)
        })
    }
    
    return (
        <form className="login" onSubmit={handleLogin}>
            <h2>Entrar</h2>
            <input 
            type="email" 
            placeholder="Digite seu email" 
            value={email}
            disabled={isLoggingIn}
            onChange={(e) => setEmail(e.target.value)}
            />
             <input 
            type="password" 
            placeholder="Digite sua senha" 
            value={password}
            disabled={isLoggingIn}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" disabled={isLoggingIn}>
                {isLoggingIn ? 'Entrando...' : 'Entrar'}
            </button>
            <p onClick={onSwitchScreen}>Não tem conta? Cadastre-se</p>
            {error && <p className="error">{error}</p>}
        </form>
    )
}

export default Login