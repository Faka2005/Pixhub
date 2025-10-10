import React, {  useState } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erreur, setErreur] = useState('');
  const [succes,setSucces]=useState('');
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setErreur("Les champs doivent être remplis");
      return;
    }

    setEmail("");
    setPassword("");
    setErreur("");

    setSucces('Connexion réussie')
    // Add your API login logic here
  }

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2>Se connecter</h2>
      <Form onSubmit={handleSubmit}>
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
        {erreur &&
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
          Se connecter
        </Button>
      </Form>

      <div className="mt-3">
        <Link to="/forgot-password">Mot de passe oublié</Link>
      </div>

      <p className="mt-2">
        Pas de compte ? <Link to="/signup">Créer un compte</Link>
      </p>
    </Container>
  );
}

export default LoginPage;
