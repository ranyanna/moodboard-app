import { useState } from "react";

function Login() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function handleLogin(e) {
        e.preventDefault()
        console.log('Email:', email)
        console.log('Senha', senha)
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
        </form>
    )
}

export default Login