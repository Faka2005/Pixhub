import React, { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, status, error, user } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await login({ email, password });
  }

  useEffect(() => {
    if (status === "loggedIn" && user) {
      navigate("/dashboard");
    }
  }, [status, user, navigate]);

  return (
    <Container style={{ maxWidth: "400px", marginTop: "80px" }}>
      <h2 className="text-center mb-4">Connexion à PixHub</h2>

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-4">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {error && <Alert variant="danger">{error}</Alert>}

        <div className="d-grid mb-2">
          <Button type="submit" variant="primary" disabled={status === "checking"}>
            {status === "checking" ? (
              <>
                <Spinner animation="border" size="sm" /> Connexion...
              </>
            ) : (
              "Se connecter"
            )}
          </Button>
        </div>

        <div className="text-center">
          <Link to="/signup">Créer un compte</Link>
        </div>
      </Form>
    </Container>
  );
}
