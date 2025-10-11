import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function ResetPassword() {
  const { token } = useParams<{ token: string }>(); // récupère le token de l'URL
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [erreur, setErreur] = useState("");
  const [succes, setSucces] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validation simple
    if (!password || !confirmPassword) {
      setErreur("Veuillez remplir tous les champs");
      setSucces("");
      return;
    }

    if (password !== confirmPassword) {
      setErreur("Les mots de passe ne correspondent pas");
      setSucces("");
      return;
    }

    try {
      const response = await fetch("https://tonapi.com/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: password }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la réinitialisation du mot de passe");
      }

      setSucces("Mot de passe réinitialisé avec succès !");
      setErreur("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
      setErreur("Une erreur est survenue. Veuillez réessayer.");
      setSucces("");
    }
  }

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2>Réinitialiser le mot de passe</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Nouveau mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrez votre nouveau mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword" className="mb-3">
          <Form.Label>Confirmez le mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmez votre mot de passe"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        {erreur && <Alert variant="danger">{erreur}</Alert>}
        {succes && <Alert variant="success">{succes}</Alert>}

        <Button variant="primary" type="submit" className="w-100">
          Réinitialiser
        </Button>
      </Form>
    </Container>
  );
}

export default ResetPassword;
