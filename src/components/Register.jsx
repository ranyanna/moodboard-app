import { useState } from "react"

function Register() {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')

    function handleRegister(e) {
        e.preventDefault()
        console.log('Nome:', nome)
        console.log('Email:', email)
        console.log('Senha:', senha)
        console.log('Confirmar senha:', confirmarSenha)
    }

    return (
      <form className="register" onSubmit={handleRegister}>
        <h2>Criar conta</h2>
        <input
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirme sua senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
        />
        <button type="submit">Criar conta</button>
      </form>
    )
}

export default Register