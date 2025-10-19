import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";

export default function MainNavbar() {
  const { user, logout, status } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const renderLinks = () => {
    if (status === "loggedIn" && user) {
        return (
            <>
            <Nav.Link as={Link} to="/">Accueil</Nav.Link>
            <Nav.Link as={Link} to="/gallery">Galerie</Nav.Link>
            <Nav.Link as={Link} to="/subscription">Abonnement</Nav.Link>
            <Nav.Link as={Link} to="/account">Compte</Nav.Link>
          </>
        );
      }
     else {
      return (
        <>
          <Nav.Link as={Link} to="/">Accueil</Nav.Link>
          <Nav.Link as={Link} to="/gallery">Galerie</Nav.Link>
        </>
      );
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">PixHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">{renderLinks()}</Nav>
          <Nav className="ms-auto align-items-center">
            {status === "loggedIn" && user ? (
              <NavDropdown title={user.username} id="user-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/profile">Profil</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/settings">Paramètres</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Déconnexion</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button variant="outline-light" onClick={() => navigate("/login")}>
                Connexion
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
