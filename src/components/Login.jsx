import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login({ onSwitchScreen }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    function handleLogin(e) {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Login successful:', userCredential.user)
            setError('')
        })
        .catch((err) => {
            console.error('Login error:', err.message)
            setError('Email ou senha incorretos.')
        })
    }
    
    return (
        <form className="login" onSubmit={handleLogin}>
            <h2>Entrar</h2>
            <input 
            type="email" 
            placeholder="Digite seu email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
             <input 
            type="password" 
            placeholder="Digite sua senha" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Entrar</button>
            <p onClick={onSwitchScreen}>Não tem conta? Cadastre-se</p>
            {error && <p className="error">{error}</p>}
        </form>
    )
}

export default Login