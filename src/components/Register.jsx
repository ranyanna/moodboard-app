import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import styles from "./Auth.module.css";

function Register({ onSwitchScreen }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  function handleRegister(e) {
    e.preventDefault();

    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("Preencha todos os campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas não coincidem");
      return;
    }

    setIsRegistering(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Account created successfully:", userCredential.user);
        setError("");
      })
      .catch((err) => {
        console.error("Registration error:", err.message);
        setError("Erro ao criar conta");
      })
      .finally(() => {
        setIsRegistering(false);
      });
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <span className={styles.eyebrow}>Seu arquivo visual</span>
        <h1 className={styles.title}>
          Crie seu <span className={styles.titleAccent}>Moodboard</span>
        </h1>
        <p className={styles.subtitle}>
          Comece um espaço só seu para guardar imagens, ideias e referências
        </p>

        <form className={styles.form} onSubmit={handleRegister}>
          <div className={styles.field}>
            <label className={styles.label}>Nome</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Digite seu nome"
              value={name}
              disabled={isRegistering}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="voce@email.com"
              value={email}
              disabled={isRegistering}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Senha</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Digite sua senha"
              value={password}
              disabled={isRegistering}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Confirmar senha</label>
            <input
              className={styles.input}
              type="password"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isRegistering}
            />
          </div>

          <button
            className={styles.submitButton}
            type="submit"
            disabled={isRegistering}
          >
            {isRegistering ? "Criando conta..." : "Cadastrar"}
          </button>

          <p className={styles.switchText}>
            Já tem uma conta?{" "}
            <span className={styles.switchLink} onClick={onSwitchScreen}>
              Quero entrar
            </span>
          </p>

          {error && <p className={`error ${styles.errorCentered}`}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
