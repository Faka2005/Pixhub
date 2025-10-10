import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

function ForgotPasswordPage() {

  const [email, setEmail] = useState('');

  const [erreur, setErreur] = useState('');
  const [succes, setSucces] = useState('');


async function EnvoieMailReset(mail: string) {
  try {
    const response = await fetch('https://tonapi.com/api/reset-password-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: mail }),
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la demande");
    }

    setSucces("Un mail vous a été envoyé avec les instructions.");
    setErreur('');
  } catch (error) {
    setErreur("Erreur lors de l'envoi du mail. Veuillez réessayer.");
    setSucces('');
  }
}


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Simple validation example
    if ( !email.trim() ) {
      setErreur("Veuillez entrer un mail");
      setSucces('');
      return;
    }


    // Reset messages
    setErreur('');
    setSucces("Un mail vous a été envoyer");

    // Reset form (optional)
    await EnvoieMailReset(email);
    setEmail('');


    // Here you would add your password reset API call
  }

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h2>Réinitialiser le mot de passe</h2>
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
        {erreur &&
          <Alert variant="danger">{erreur}</Alert>
        }
        {succes &&
          <Alert variant="success">{succes}</Alert>
        }

        <Button variant="primary" type="submit" className="w-100">
          Réinitialiser
        </Button>
      </Form>
    </Container>
  );
}

export default ForgotPasswordPage;
