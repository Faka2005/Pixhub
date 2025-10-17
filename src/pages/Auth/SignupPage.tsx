import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, status, error, user } = useAuth();

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (status === "loggedIn" && user) {
      navigate("/dashboard");
    }
  }, [status, user, navigate]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setLocalError("Tous les champs doivent être remplis");
      setSuccess('');
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Les mots de passe ne correspondent pas");
      setSuccess('');
      return;
    }

    setLocalError('');
    setSuccess('');

    const response = await signup({ name: username, email, password });

    if (response?.success) {
      setSuccess("Inscription réussie 🎉");
      // Redirection automatique via useEffect
    } else {
      setLocalError(response?.message || "Erreur lors de l'inscription ⚠️");
    }
  }

  return (
    <Container className="mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Créer un compte</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez votre nom"
            value={username}
            onChange={e => setUserName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword" className="mb-3">
          <Form.Label>Confirmer le mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmez votre mot de passe"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        {(localError || error) && <Alert variant="danger">{localError || error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <div className="d-grid mb-2">
          <Button type="submit" variant="primary" disabled={status === "checking"}>
            {status === "checking" ? (
              <>
                <Spinner animation="border" size="sm" /> Inscription...
              </>
            ) : (
              "S'inscrire"
            )}
          </Button>
        </div>

        <div className="text-center">
          <Link to="/login">Déjà un compte ? Se connecter</Link>
        </div>
      </Form>
    </Container>
  );
}
