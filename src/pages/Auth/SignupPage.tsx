import React, { useState } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
function SignupPage(){
  const [username,setUserName]=useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [erreur, setErreur] = useState('');
  const [succes,setSucces]=useState('');
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      setErreur("Tous les champs doivent être remplis");
      return;
    }

    if (password !== confirmPassword) {
      setErreur("Les mots de passe ne correspondent pas");
      return;
    }

    setErreur("");
    setUserName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setSucces('Connexion réussie');
    // Ajouter la logique d'API d'inscription ici
  }

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2>Créer un compte</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez votre "
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
        {erreur&&
        <Alert key={'danger'} variant={'danger'}>
            {erreur}
        </Alert>
        }
        {succes &&
        <Alert key={'success'} variant={'success'}>
            {succes}
        </Alert>
        }

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
