import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Login({ onTrocarTela, onLoginSuccess }) {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')

    function handleLogin(e) {
        e.preventDefault()

        signInWithEmailAndPassword(auth, email, senha)
        .then((userCredential) => {
            console.log('Login successful:', userCredential.user)
            setErro('')
            onLoginSuccess()
        })
        .catch((error) => {
            console.error('Login error:', error.message)
            setErro('Email ou senha incorretos.')
        })
    }
    
    return (
        <form className="login" onSubmit={handleLogin}>
            <h2>Entrar</h2>
            <input 
            type="email" 
            placeholder="Digite seu email" 
            value={email}
            onChange= {(e) => setEmail(e.target.value)}
            />
             <input 
            type="password" 
            placeholder="Digite sua senha" 
            value={senha}
            onChange= {(e) => setSenha(e.target.value)}
            />
            <button type="submit">Entrar</button>
            <p onClick={onTrocarTela}>Não tem conta? Cadastre-se</p>
            {erro && <p className="erro">{erro}</p>}
        </form>
    )
}

export default Login