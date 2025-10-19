import { Container, Card, Button } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return (
      <Container className="mt-5 text-center">
        <h2>Vous n'êtes pas connecté</h2>
        <Button variant="primary" onClick={() => navigate("/login")}>
          Se connecter
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5" style={{ maxWidth: "600px" }}>
      <Card>
        <Card.Header>Tableau de bord</Card.Header>
        <Card.Body>
          <h4>Bienvenue, {user.username} !</h4>
          <p>Email : {user.email}</p>

          <p>Abonnement : {user.subscription || "Free"}</p>
          {user.avatar && <img src={user.avatar} alt="Avatar" style={{ width: 80, borderRadius: "50%" }} />}
          <div className="mt-3">
            <Button variant="danger" onClick={handleLogout}>
              Déconnexion
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
