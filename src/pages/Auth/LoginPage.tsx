import React, { useState } from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState('');

  // Fonction de soumission du formulaire
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validation simple
    if (email.trim() === "" || password.trim() === "") {
      setErreur("Les champs doivent être remplis");
      return; // On arrête ici si la validation échoue
    }

    // Si tout est correct, on vide les champs et l'erreur
    setEmail("");
    setPassword("");
    setErreur("");

    // Ici tu pourras ajouter la logique d'API pour login
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Mot de passe"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>

      <Link to="/forgot-password">Mot de passe oublié</Link>

      {erreur && <p style={{ color: "red" }}>{erreur}</p>}
    </>
  );
}

export default LoginPage;
