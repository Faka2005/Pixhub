import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

function SignupPage() {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [erreur, setErreur] = useState('');
  const [succes, setSucces] = useState('');

  async function MailLogin(mail: string) {
    try {
      const response = await fetch('https://tonapi.com/api/login-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: mail }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la demande");
      }

      setErreur('');
    } catch (error) {
      setErreur("Erreur lors de l'envoi du mail. Veuillez réessayer.");
      setSucces('');
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !confirmPassword.trim() || !username.trim()) {
      setErreur("Tous les champs doivent être remplis");
      setSucces('');
      return;
    }

    if (password !== confirmPassword) {
      setErreur("Les mots de passe ne correspondent pas");
      setSucces('');
      return;
    }

    setErreur('');
    setSucces('');

    // Appeler ta fonction d'inscription API ici
    // Par exemple : await signupUser({ username, email, password });

    // Pour l'instant on simule un appel API
    await MailLogin(email);

    // Si succès, reset des champs
    setUserName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setSucces('Inscription réussie, veuillez vérifier votre mail pour confirmer.');
  }

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2>Créer un compte</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez votre nom"
            value={username}
            onChange={e => setUserName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword" className="mb-3">
          <Form.Label>Confirmer le mot de passe</Form.Label>
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
          S'inscrire
        </Button>
      </Form>

      <p className="mt-3">
        Déjà un compte ? <Link to="/login">Se connecter</Link>
      </p>
    </Container>
  );
}

export default SignupPage;
