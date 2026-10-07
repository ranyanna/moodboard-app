import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import styles from './Auth.module.css';

function Login({ onSwitchScreen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  function handleLogin(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Preencha os campos");
      return;
    }

    setIsLoggingIn(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Login successful:", userCredential.user);
        setError("");
      })
      .catch((err) => {
        console.error("Login error:", err.message);
        setError("Email ou senha incorretos.");
      })
      .finally(() => {
        setIsLoggingIn(false);
      });
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <span className={styles.eyebrow}>Seu arquivo visual</span>
        <h1 className={styles.title}>
          Volte ao <span className={styles.titleAccent}>Moodboard</span>
        </h1>
        <p className={styles.subtitle}>
          Entre para continuar organizando as referências que inspiram você.
        </p>

        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              placeholder="voce@email.com"
              value={email}
              disabled={isLoggingIn}
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
              disabled={isLoggingIn}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Entrando..." : "Entrar no Moodboard"}
            <span>→</span>
          </button>

          <p className={styles.switchText}>
            Não tem uma conta?{" "}
            <span className={styles.switchLink} onClick={onSwitchScreen}>
              Quero criar conta
            </span>
          </p>

          {error && <p className={`error ${styles.errorCentered}`}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
