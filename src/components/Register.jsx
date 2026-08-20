import { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth } from "../firebase"

function Register({ onTrocarTela }) {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [erro, setErro] = useState('')

    function handleRegister(e) {
      e.preventDefault()

      if (senha !== confirmarSenha) {
        setErro('As senhas não coincidem')
        return
      }

      createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        console.log('Account created successfully:', userCredential.user)
        setErro('')
      })
      .catch((error) => {
        console.error('Registration error:', error.message)
        setErro('Erro ao criar conta')
      })
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
        <p onClick={onTrocarTela}>Já tem conta? Entrar</p>
        {erro && <p className="erro">{erro}</p>}
      </form>
    )
}

export default Register